import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../../../config/instance';

export const fetchDataUser = createAsyncThunk('Users/fetchData', async (filters) => {
    try {
      const res = await instance.get('/api/users/', { params: {} });
      let data = res.data;
      if(filters){
      data = data.filter((item) => {
        let matches = true;
        if (filters.name) {
          matches = matches && item.first_name.toLowerCase().includes(filters.name.toLowerCase());
        }
        if (filters.lastname) {
          matches = matches && item.last_name.toLowerCase().includes(filters.lastname.toLowerCase());
        }
  
        if (filters.email) {
          matches = matches && item.email.toLowerCase().includes(filters.email.toLowerCase());
        }
  
        if (filters.superusuario) {
            if(filters.superusuario === 'si'){
                matches = matches && item.is_superuser === true;
            }else{
                matches = matches && item.is_superuser === false
            }
        }
  
        if (filters.status) {
            if(filters.status === 'active'){
                matches = matches && item.is_active === true;
            }else{
                matches = matches && item.is_active === false
            }
        }
  
        return matches;
      });
    }
      return data;
    } catch(error) {
        console.log(error)
      return []; 
    }
  });
  
export const addUser = createAsyncThunk('Users/addUser', async(data, {dispatch})=>{
    try{
        const res = await instance.post('/api/users/', data, {
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataUser())
        return res.data  
    }catch(error){
        console.log(error)
        return []
    }
})

export const updateUser = createAsyncThunk('Users/updateUser',async({id,data},{dispatch})=>{
    try{
        const res = await instance.put(`/api/users/${id}/`, data,{
            headers:{'Content-Type': 'application/json'}
        })
        dispatch(fetchDataUser())
        return res.data
    }catch(error){
        console.log(error)
        return []
    }
})

export const deleteUser = createAsyncThunk('Users/deleteUser', async(id,{dispatch})=>{
    try{
        const res = await instance.delete(`/api/users/${id}/`)
        dispatch(fetchDataUser())
        return res.data
    }catch(error){
        return []
    }
})
export const getUser = createAsyncThunk('Users/getUser',async(id)=>{
    try{
        const res = await instance.get(`/api/users/${id}/`)
        return res.data
    }catch(error){
        console.log(error)
        return null
    }
})

export const userSlice = createSlice({
    name:'Users',
    initialState:{
        data:[],
        user:null,
        openEdit:false,
        total:0,
    },
    reducers:{
        toggleEdit:(state)=>{
            state.openEdit = !state.openEdit
        }
    },
    extraReducers:builder=>{
        builder.addCase(fetchDataUser.fulfilled, (state,action)=>{
            state.data = action.payload;
            state.total = action.payload.length;
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.user = action.payload
        })
    }
})

export const { toggleEdit } = userSlice.actions
export default userSlice.reducer;