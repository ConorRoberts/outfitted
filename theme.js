import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  styles: {
    global: {
      "html, body": {
        fontFamily: "Roboto",
      },
    },
  },
  fonts: {
    body: "Roboto",
    heading: "Roboto",
    mono: "Roboto",
  },
}

const theme = extendTheme({ config });

export default theme