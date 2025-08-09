/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores principales
        primary: {
          DEFAULT: '#C2D2F2',
          dark: '#171717',
        },
        secondary: {
          DEFAULT: '#f3f4f6',
          dark: '#212121',
        },
        
        // Colores de texto
        text: {
          DEFAULT: '#111827',
          dark: '#e5e7eb',
          muted: {
            DEFAULT: '#9CA3AF',
            dark: '#6B7280',
          },
          hover: {
            DEFAULT: '#2563EB',
            dark: '#60A5FA',
          },
        },
        
        // Colores de fondo
        background: {
          DEFAULT: '#f9fafb',
          dark: '#18181b',
        },
        
        // Colores de UI
        btn: {
          primary: {
            DEFAULT: '#2563EB',
            dark: '#3B82F6',
          },
          hover: {
            DEFAULT: '#1D4ED8',
            dark: '#2563EB',
          },
        },
        
        // Colores de estado
        state: {
          danger: {
            DEFAULT: '#DC2626',
            dark: '#B91C1C',
          },
          success: {
            DEFAULT: '#16A34A',
            dark: '#22C55E',
          },
          warning: {
            DEFAULT: '#F59E0B',
            dark: '#FBBF24',
          },
        },
        
        // Colores de interacción
        accent: {
          DEFAULT: '#4F46E5',
          dark: '#6366F1',
        },
        border: {
          DEFAULT: '#d1d5db',
          dark: '#8C0410',
        },
        overlay: {
          DEFAULT: 'rgba(0, 0, 0, 0.4)',
          dark: 'rgba(255, 255, 255, 0.2)',
        },
        input: {
          DEFAULT: '#ffffff',
          dark: '#1f2937',
        },
        focus: {
          DEFAULT: '#2563eb',
          dark: '#3b82f6',
        },
      },
      
      // Añadir aquí más extensiones si es necesario
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // Tamaños de fuente personalizados
      fontSize: {
        '4xl-custom': ['2.25rem', { lineHeight: '3rem' }],
        'super': ['3.5rem', { lineHeight: '4rem' }],
      },
      
      // Breakpoints personalizados
      screens: {
        xs: '475px',
        // Los breakpoints por defecto de Tailwind ya están incluidos
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  
  // Optimización para producción
  future: {
    hoverOnlyWhenSupported: true,
  },
};
