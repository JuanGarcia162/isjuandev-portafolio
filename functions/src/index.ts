/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { config } from "firebase-functions";
import * as logger from "firebase-functions/logger";
import { Resend } from "resend";

// Inicializar Resend: usar Runtime Config (no requiere facturación)
// Fallback a process.env para emulador/local si se desea
const resend = new Resend(config().resend?.key || process.env.RESEND_API_KEY);

/**
 * Función para enviar correos electrónicos desde el formulario de contacto
 * Recibe: name, email, message
 * Envía un correo usando Resend
 */
export const sendEmail = onCall({
  region: "us-central1",
}, async (request) => {
  try {
    // Obtener los datos del formulario
    const { name, email, message } = request.data;
    
    // Validar que todos los campos requeridos estén presentes
    if (!name || !email || !message) {
      throw new HttpsError("invalid-argument", "Todos los campos son requeridos");
    }

    // Validación adicional
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const text = String(message);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (trimmedName.length < 2) {
      throw new HttpsError("invalid-argument", "El nombre debe tener al menos 2 caracteres");
    }
    if (!isValidEmail) {
      throw new HttpsError("invalid-argument", "Email inválido");
    }
    if (text.length < 10 || text.length > 5000) {
      throw new HttpsError("invalid-argument", "El mensaje debe tener entre 10 y 5000 caracteres");
    }
    
    logger.info("Enviando correo de contacto", { name: trimmedName, email: trimmedEmail });
    
    // Enviar el correo electrónico usando Resend
    const { data, error } = await resend.emails.send({
      from: "Formulario de Contacto <onboarding@resend.dev>",
      to: ["juandiegogarcia162@gmail.com"],
      subject: `Nuevo mensaje de contacto de ${trimmedName}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${trimmedName}</p>
        <p><strong>Email:</strong> ${trimmedEmail}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${text.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: trimmedEmail,
    });

    if (error) {
      logger.error("Error al enviar correo con Resend", error);
      throw new HttpsError("internal", "No se pudo enviar el correo en este momento");
    }
    
    logger.info("Correo enviado exitosamente", data);
    return { success: true, messageId: data?.id };
    
  } catch (error: any) {
    logger.error("Error en la función sendEmail", error);
    if (error instanceof HttpsError) {
      throw error;
    }
    throw new HttpsError("internal", "Ocurrió un error inesperado");
  }
});
