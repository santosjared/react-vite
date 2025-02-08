import { createTheme } from "@mui/material"

const Palette = ()=>({
  palette:{
    primary: {
      light: '#7F889B',
      main: '#6D788D',
      dark: '#606A7C',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    button: {
      textTransform: "none",
    },
  },
 
})
const theme = createTheme(Palette())
export default theme;