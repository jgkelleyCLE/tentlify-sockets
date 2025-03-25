/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'glow-green': '0 0 5px 2px rgba(0, 255, 0, 0.7), 0 0 12px 4px rgba(0, 255, 0, 0.5), 0 0 20px 6px rgba(0, 255, 0, 0.3)',
      },
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 2px 1px #dc2626c8, 0 0 10px 2px rgba(255, 0, 0, 0.3), 0 0 15px 3px rgba(255, 0, 0, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 8px 2px rgba(255, 0, 0, 0.7), 0 0 12px 4px rgba(255, 0, 0, 0.5), 0 0 20px 6px rgba(255, 0, 0, 0.3)',
          },
        },
        ping: {
          '0%': {
            transform: 'scale(0.9)',
            boxShadow: '0 0 0 0 rgba(231, 114, 9, 0.9)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 15px rgba(255, 82, 82, 0)',
          },
        },
        pingDark: {
          '0%': {
            transform: 'scale(0.9)',
            boxShadow: '0 0 0 0 rgba(111, 255, 0, 0.631)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 15px rgba(96, 12, 13, 0)',
          },
        },
      },
      animation: {
        glow: 'glow 10s infinite',
        'spin-slow': 'spin 3s linear infinite',
        ping: 'ping 5s ease-out infinite',
        darkPing: 'pingDark 4s ease-out infinite',
      },
      screens: {
        'xs': '380px'
      },
      colors: {
        'safariOrange': 'rgb(231, 114, 9)',
        'safariOrangeHover': '#bb5d0a',
        'safariRed': 'rgb(96, 12, 13)',
        'safariRedHover': '#450809'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}"
//   ],
//   theme: {
//     extend: {
//       boxShadow: {
//         'glow-green': '0 0 5px 1px rgba(0, 255, 0, 0.5), 0 0 10px 2px rgba(0, 255, 0, 0.3), 0 0 15px 3px rgba(0, 255, 0, 0.2)',
//       },
//       keyframes: {
//         glow: {
//           '0%, 100%': {
//             boxShadow: '0 0 10px 2px rgba(0, 255, 0, 0.7), 0 0 20px 4px rgba(0, 255, 0, 0.5), 0 0 30px 6px rgba(0, 255, 0, 0.3)',
//           },
//           '50%': {
//             boxShadow: '0 0 20px 4px rgba(0, 255, 0, 1), 0 0 40px 8px rgba(0, 255, 0, 0.7), 0 0 60px 12px rgba(0, 255, 0, 0.5)',
//           },
//         },
//       },
//       animation: {
//         glow: 'glow 2s infinite',
//       },
//       animation: {
//         'spin-slow': 'spin 3s linear infinite',
//       },
//       screens: {
//         'xs': '380px'
//       },
//       colors: {
//         'safariOrange': 'rgb(231, 114, 9)',
//         'safariOrangeHover': '#bb5d0a',
//         'safariRed': 'rgb(96, 12, 13)',
//         'safariRedHover': '#450809'
//       },
//       animation: {
//         //name of keyframes, duration, timing, number of loops

//         ping: 'ping 5s ease-out infinite',
//         darkPing: 'pingDark 4s ease-out infinite',
//       },
//       keyframes: {
//         ping: {
//           '0%': {
//             transform: 'scale(0.9)',
//             // boxShadow: '0 0 0 0 rgba(165, 61, 255, 0.9)',
//             boxShadow: '0 0 0 0 rgba(231, 114, 9, 0.9)',
//             // boxShadow: '0 0 0 0 rgba(96, 12, 13, 0.9)',
//           },

//           '70%': {
//             transform: 'scale(1)',
//             boxShadow: '0 0 0 15px rgba(255, 82, 82, 0)',
//           },

//           '100%': {
//             transform: 'scale(0.9)',
//             boxShadow: '0 0 0 15px rgba(255, 82, 82, 0)',
//           },
//         },
//         pingDark: {
//           '0%': {
//             transform: 'scale(0.95)',
//             boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.9)',
//           },

//           '70%': {
//             transform: 'scale(1)',
//             boxShadow: '0 0 0 12px rgba(255, 0, 0, 0)',
//           },

//           '100%': {
//             transform: 'scale(0.95)',
//             boxShadow: '0 0 0 12px rgba(255, 82, 82, 0)',
//           },
//         },
//       },
    
//     },
//   },
//   plugins: [],
// }


