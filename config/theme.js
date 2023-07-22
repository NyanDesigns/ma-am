import { extendTheme } from "@chakra-ui/react";
import '@fontsource/roboto-condensed';
import '@fontsource-variable/roboto-flex';


const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ 
  config,
  colors:{
    light:"#F1FAEE",
    dark:"1A1C23",
    primary:"#072534",
    secondary:"#457B9D",
    accent: "#F7B359",
    success: "#48BB78",
    error: "#F56565"
  },
  fonts: {
    heading: 'Roboto Condensed',
    body: 'Roboto Flex Variable',
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "24px",
    xl: "30px",
    xxl: "36px",
  },
  styles: {
    global: {
      "t1": {
        fontFamily: "Roboto Condensed",
        fontWeight: "700",
        fontSize: "xxl",
        color: "accent",
        letterSpacing: "0.2em",
      },
      "t2": {
        fontFamily: "Roboto Condensed",
        fontWeight: "500",
        fontSize: "xl",
        color: "light",
        letterSpacing: "0.05em",
        lineHeight: "1.2",
        color: "accent",
        opacity: ".75",
      },
      "s1": {
        fontFamily: "Roboto Flex Variable",
        fontSize: "xs",
        color: "light",
        letterSpacing: "0.1em",
        lineHeight: "1.25",
        opacity: ".5",
      },
      "s2": {
        fontFamily: "Roboto Condensed",
        fontWeight: "500",
        fontSize: "xl",
        color: "light",
        lineHeight: "1.25",
        opacity: ".75",
      },
    },
  },
});

export default theme;
