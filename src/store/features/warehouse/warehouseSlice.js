import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../../config/instance';

export const fetchDataWareHouse = createAsyncThunk('Users/fetchData', async()=>{
    try{
        const res = await instance.get('/warehouses',{params:{}})
        return res.data
    }catch{
        return []
    }
})

export const addWareHouse = createAsyncThunk('WareHouses/addWareHouse', async(data, {dispatch})=>{
    try{
        const res = await instance.post('/warehouses', data, {
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataWareHouse())
        return res.data  
    }catch(error){
        return []
    }
})

export const updateWareHouse = createAsyncThunk('WareHouses/updateWareHouse',async({id,data},{dispatch})=>{
    try{
        const res = await instance.put(`/warehouses/${id}`, data,{
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataWareHouse())
        return res.data
    }catch(error){
        return []
    }
})

export const deleteWareHouse = createAsyncThunk('WareHouses/deleteWareHouse', async(id,{dispatch})=>{
    try{
        dispatch(fetchDataWareHouse())
        const res = await instance.delete(`/warehouses/${id}`)
        return res.data
    }catch(error){
        return []
    }
})
export const warehouseSlice = createSlice({
    name:'WareHouses',
    initialState:{
        data:[],
        total:0,
    },
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchDataWareHouse.fulfilled, (state,action)=>{
            state.data = action.payload.data;
            state.total = action.payload.total;
        })
    }
})

export default warehouseSlice.reducer