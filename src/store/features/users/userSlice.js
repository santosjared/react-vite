import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDataUser = createAsyncThunk('Users/fwtchData', async()=>{
    try{
        const res = await axios.get('/users')
        return res.data
    }catch{
        return []
    }
})

export const userSlice = createSlice({
    name:'Users',
    initialState:{
        data:[],
        total:0,
    },
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchDataUser.fulfilled, (state,action)=>{
            state.data = action.payload.data;
            state.total = action.payload.total;
        })
    }
})