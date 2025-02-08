import { Box, styled } from '@mui/material';


export const Table = styled(Box)(({ column = 1 }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${column}, 1fr);`,
    gap: '10px'
  }))
export const Tr = styled(Box)(() => (
    {
      display: 'contents'
    }
  ))
  
export const Td = styled(Box)(({ spacing=0 }) => ({
    padding: `${spacing}px`,
    textAlign: 'center',
  }))