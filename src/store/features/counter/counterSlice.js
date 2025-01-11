import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // aca se define todas las variables globales
    // del componente Counter.jsx
    value: 10,
    isLogged: 'true',
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
        modifyIsLogged: (state, action) => {
            state.isLogged = action.payload
        }
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
