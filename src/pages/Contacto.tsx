import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface AlertProps {
  children: React.ReactNode;
  variant: 'success' | 'error';
}

const Alert: React.FC<AlertProps> = ({ children, variant }) => {
  return (
    <div className={`flex items-center gap-2 p-4 rounded-lg ${
      variant === 'success' 
        ? 'bg-green-50 dark:bg-green-900/30' 
        : 'bg-red-50 dark:bg-red-900/30'
    }`}>
      {children}
    </div>
  );
};

const Contacto = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange(e);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Usar Firebase Functions para enviar el correo
      const sendEmail = httpsCallable(functions, 'sendEmail');
      
      if (import.meta.env.DEV) console.log('Enviando datos:', formData);
      
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      if (import.meta.env.DEV) console.log('Correo enviado con éxito:', result.data);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Error en el envío:', error);
        console.error('Detalles del error:', {
          message: error.message,
          code: error.code,
          details: error.details,
          stack: error.stack,
          fullError: JSON.stringify(error, null, 2)
        });
      }
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <section className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl p-8 hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Contáctame
        </h2>

        {submitStatus && (
          <Alert variant={submitStatus} >
            {submitStatus === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <p className={`text-sm ${
              submitStatus === 'success' 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {submitStatus === 'success' 
                ? 'Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarme!' 
                : 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.'}
            </p>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 
                ${errors.name 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } 
                bg-gray-100 border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 
                ${errors.email 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } 
                bg-gray-100 border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleMessageInput}
              className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 
                ${errors.message 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                } 
                bg-gray-100 border-gray-200 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white
                resize-none overflow-hidden min-h-[100px]`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Enviando...
              </>
            ) : (
              'Enviar mensaje'
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Contacto;