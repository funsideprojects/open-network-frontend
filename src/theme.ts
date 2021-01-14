const opacityToHex = (opacity: number = 1, hexColor: string = '#FFFFFF') => {
  const decimalValue = Math.round(opacity * 255)
  let hexValue = hexColor + 'FF' // ? Equal to 1

  if (opacity < 0.07) {
    hexValue = '0' + decimalValue.toString(16).toUpperCase()
  } else {
    hexValue = decimalValue.toString(16).toUpperCase()
  }

  return hexColor + hexValue
}

export default {
  opacityToHex,
  centeredFlexLayout: `
    display: flex;
    justify-content: center;
    align-items: center
  `,
  font: {
    primary: `Raleway, sans-serif`,
    secondary: 'Dosis',
    weight: {
      light: '300',
      normal: '400',
      semi: '600',
      bold: '700',
      extra: '800',
    },
    size: {
      tiny: '11px',
      xxs: '12px',
      xs: '14px',
      sm: '16px',
      md: '18px',
      lg: '20px',
      xl: '29px',
      xxl: '38px',
    },
    spacing: {
      none: 0,
      letter: {
        sm: '0.5px',
        md: '1px',
        lg: '2px',
      },
      word: {
        sm: '2px',
        md: '3px',
        lg: '4px',
      },
    },
  },

  colors: {
    none: 'transparent',
    black: '#000000',
    white: '#FFFFFF',

    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },

    primary: {
      grey: '#E4E3E3',
      lighter: '#E1F1F2',
      light: '#84A9AC',
      main: '#3B6978',
      dark: '#204051',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FF4081',
      main: '#F50057',
      dark: '#C51162',
      contrastText: '#FFFFFF',
    },

    danger: {
      lighter: '#FFE5E3',
      light: '#FFA39E',
      main: '#FF7875',
      dark: '#FF4D4F',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFFBE6',
      light: '#FFF1B8',
      main: '#FFC53D',
      dark: '#FAAD14',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#D9FFE4',
      light: '#C0EBCD',
      main: '#7DD196',
      dark: '#75BD8A',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#E6F7FF',
      light: '#BAE7FF',
      main: '#40A9FF',
      dark: '#1890FF',
      contrastText: '#FFFFFF',
    },
    default: {
      lighter: '#FAFAFA',
      light: '#F5F5F5',
      main: '#BDBDBD',
      dark: '#FFFFFF',
      contrastText: '#000000',
    },

    grey: {
      50: '#FAFAFA',
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

    skeleton: {
      background: '#F3F3F3',
      foreground: '#ECEBEB',
    },

    overlay: {
      none: 'rgba(0,0,0,0)',
      translucent: 'rgba(0, 0, 0, 0.25)',
      hazy: 'rgba(0, 0, 0, 0.45)',
      opaque: 'rgba(0, 0, 0, 0.75)',
    },
  },

  shadows: {
    sm: '0 1px 8px 0 rgba(0, 0, 0, 0.3)',
    md: '0 1px 8px 0 rgba(0, 0, 0, 0.3)',
    lg: '0 3px 6px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.23)',
    xl: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },

  screen: {
    sml: '639.98px',
    sm: '640px',
    mdl: '767.98px',
    md: '768px',
    lgl: '1023.98px',
    lg: '1024px',
    xll: '1279.98px',
    xl: '1280px',
    xxll: '1499.98px',
    xxl: '1500px',
  },

  spacing: {
    none: 0,
    xxs: '5px',
    xs: '10px',
    sm: '20px',
    md: '30px',
    lg: '40px',
    xl: '50px',
    xxl: '75px',
  },

  radius: {
    none: 0,
    sm: '3px',
    md: '6px',
    lg: '12px',
    xl: '15px',
    xxl: '20px',
    round: '100%',
  },

  zIndex: {
    xs: 10,
    sm: 20,
    /** for Header Dropdowns */
    md: 30,
    /** for Modal */
    lg: 40,
    /** unset */
    xl: 50,
    /** for Loading Overlay */
    xxl: 100,
  },

  opacity: {
    none: 0,
    translucent: 0.2,
    hazy: 0.5,
    opaque: 0.8,
  },
}
