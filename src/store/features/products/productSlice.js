import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../../config/instance';

export const fetchDataProducts = createAsyncThunk('Products/fetchData', async(filters)=>{
    try{
        const res = await instance.get('/api/products/',{params:{}})
        let data = res.data
        if(filters){
            data = data.filter((item)=>{
                let matches = true
                if(filters.name){
                    matches = matches && item.name.toLowerCase().includes(filters.name.toLowerCase())
                }
                if(filters.purchasePrice){
                    matches = matches && item.purchase_price.includes(filters.purchasePrice) 
                }
                if(filters.salePrice){
                    matches = matches && item.sale_price.includes(filters.salePrice)
                }
                if(filters.quantity){
                    matches = matches && item.quantity === parseInt(filters.quantity)
                }
                if(filters.category){
                    matches = matches && item.category === parseInt(filters.category)
                }
                if(filters.warehouse){
                    matches = matches && item.warehouse === parseInt(filters.warehouse)
                }
                return matches
            });
        }
        return data
    }catch{
        return []
    }
})

export const addProduct = createAsyncThunk('Products/addProduct', async(data, {dispatch})=>{
    try{
        const res = await instance.post('/api/products/', data, {
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataProducts())
        return res.data  
    }catch(error){
        console.log(error)
        return []
    }
})

export const updateProduct = createAsyncThunk('Products/updateProduct',async({id,data},{dispatch})=>{
    try{
        const res = await instance.put(`/api/products/${id}/`, data,{
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataProducts())
        return res.data
    }catch(error){
        return []
    }
})

export const deleteProduct = createAsyncThunk('Products/deleteProduct', async(id,{dispatch})=>{
    try{
        const res = await instance.delete(`/api/products/${id}/`)
        dispatch(fetchDataProducts())
        return res.data
    }catch(error){
        return []
    }
})
export const getProduct = createAsyncThunk('Products/getProudct',async(id)=>{
    try{
        const res = await instance.get(`/api/products/${id}/`)
        return res.data
    }catch(error){
        console.log(error)
        return null
    }
})
export const productSlice = createSlice({
    name:'Products',
    initialState:{
        data:[],
        product:null,
        openEdit:false,
        total:0,
    },
    reducers:{
        toggleEdit:(state)=>{
            state.openEdit = !state.openEdit;
        }
    },
    extraReducers:builder=>{
        builder.addCase(fetchDataProducts.fulfilled, (state,action)=>{
            state.data = action.payload;
            state.total = action.payload.length;
        })
        .addCase(getProduct.fulfilled, (state, action)=>{
            state.product = action.payload
        })
    }
})
export const { toggleEdit } = productSlice.actions;
export default productSlice.reducer;