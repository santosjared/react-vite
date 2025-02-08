import { ThemeProvider } from '@emotion/react'
import theme from './palette'
import { CssBaseline } from '@mui/material'


const ThemeComponent = ({children})=>{
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}
export default ThemeComponent;