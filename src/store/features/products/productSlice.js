import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../../config/instance';

export const fetchDataProducts = createAsyncThunk('Products/fetchData', async()=>{
    try{
        const res = await instance.get('/products',{params:{}})
        return res.data
    }catch{
        return []
    }
})

export const addProduct = createAsyncThunk('Products/addProduct', async(data, {dispatch})=>{
    try{
        const res = await instance.post('/products', data, {
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataProducts())
        return res.data  
    }catch(error){
        return []
    }
})

export const updateProduct = createAsyncThunk('Products/updateProduct',async({id,data},{dispatch})=>{
    try{
        const res = await instance.put(`/products/${id}`, data,{
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataProducts())
        return res.data
    }catch(error){
        return []
    }
})

export const deleteProduct = createAsyncThunk('Products/deleteProduct', async(id,{dispatch})=>{
    console.log(id)
    try{
        dispatch(fetchDataProducts())
        const res = await instance.delete(`/products/${id}`)
        return res.data
    }catch(error){
        return []
    }
})
export const productSlice = createSlice({
    name:'Products',
    initialState:{
        data:[],
        total:0,
    },
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchDataProducts.fulfilled, (state,action)=>{
            state.data = action.payload.data;
            state.total = action.payload.total;
        })
    }
})

export default productSlice.reducer