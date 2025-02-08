import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../../config/instance';

export const fetchDataUser = createAsyncThunk('Users/fetchData', async()=>{
    try{
        const res = await instance.get('/users',{params:{}})
        return res.data
    }catch{
        return []
    }
})

export const addUser = createAsyncThunk('Users/addUser', async(data, {dispatch})=>{
    console.log(data)
    try{
        const res = await instance.post('/users', data, {
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataUser())
        return res.data  
    }catch(error){
        return []
    }
})

export const updateUser = createAsyncThunk('Users/updateUser',async({id,data},{dispatch})=>{
    try{
        const res = await instance.put(`/users/${id}`, data,{
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataUser())
        return res.data
    }catch(error){
        return []
    }
})

export const deleteUser = createAsyncThunk('Users/deleteUser', async(id,{dispatch})=>{
    console.log(id)
    try{
        dispatch(fetchDataUser())
        const res = await instance.delete(`/users/${id}`)
        return res.data
    }catch(error){
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

export default userSlice.reducer;