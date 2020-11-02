export default {
  font: {
    family: `'Open Sans', sans-serif`,
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
    black: '#000',
    white: '#fff',
    body: '#f7f7f7',

    primary: {
      lighter: '#ac8fc7',
      light: '#765396',
      main: '#54297D',
      dark: '#303f9f',
      contrastText: '#fff',
    },

    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },

    info: '#4169E1',
    success: '#34a853',
    warning: '#FFB818',
    err: '#f44336',

    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },

    border: {
      light: '#f5f5f5',
      main: '#e0e0e0',
      dark: '#bdbdbd',
    },

    skeleton: {
      background: '#f3f3f3',
      foreground: '#ecebeb',
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
    xl: '60px',
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

  transition: {
    duration: '0.5s',
  },
}
