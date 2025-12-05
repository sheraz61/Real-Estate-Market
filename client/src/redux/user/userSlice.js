import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    error:null,
    loading:false,
};
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null
        },
        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false
        },setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    updateAvatar(state, action) {
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          avatar: action.payload, // immutable update
        };
      }
    },

    }
});

export const {signInStart,signInFailure,signInSuccess, setCurrentUser,
  updateAvatar,} =userSlice.actions

export default  userSlice.reducer