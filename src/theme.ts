/* eslint-disable import/no-anonymous-default-export */
export default {
  font: {
    family: `'Raleway', sans-serif`,
    weight: {
      light: '300',
      normal: '400',
      bold: '600',
    },
    size: {
      tiny: '11px',
      xxs: '13px',
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '20px',
      xl: '34px',
    },
  },

  colors: {
    none: 'transparent',
    black: '#000',
    white: '#FFF',
    body: '#F7F7F7',

    primary: {
      lighter: '#E4E3E3',
      light: '#84A9AC',
      main: '#3B6978',
      dark: '#204051',
      contrastText: '#FFF',
    },

    secondary: {
      light: '#FF4081',
      main: '#F50057',
      dark: '#C51162',
      contrastText: '#FFF',
    },

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    error: {
      lighter: '#FFA39E',
      light: '#FF7875',
      main: '#FF4D4F',
      dark: '#CF1322',
      contrastText: '#FFF',
    },

    info: '#4169E1',
    success: '#34A853',
    warning: '#FFB818',
    err: '#F44336',

    grey: {
      50: '#FaFaFa',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },

    border: {
      light: '#F5F5F5',
      main: '#E0E0E0',
      dark: '#BDBDBD',
    },

    skeleton: {
      background: '#F3F3F3',
      foreground: '#ECEBEB',
    },

    overlay: {
      translucent: 'rgba(0, 0, 0, 0.25)',
      hazy: 'rgba(0, 0, 0, 0.45)',
      opaque: 'rgba(0, 0, 0, 0.75)',
    },
  },

  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: 'rgba(0, 0, 0, 0.3) 0px 1px 8px 0px',
    lg: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    xl: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },

  screen: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  spacing: {
    none: 0,
    xxs: '5px',
    xs: '10px',
    sm: '20px',
    md: '30px',
    lg: '40px',
    xl: '50px',
  },

  radius: {
    none: 0,
    sm: '3px',
    md: '6px',
    lg: '12px',
  },

  zIndex: {
    xs: 10,
    sm: 20,
    md: 30,
    lg: 40,
    xl: 50,
  },

  opacity: {
    none: 0,
    translucent: 0.2,
    hazy: 0.5,
    opaque: 0.8,
  },
}
