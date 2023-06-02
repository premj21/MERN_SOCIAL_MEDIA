import {createReducer} from '@reduxjs/toolkit'
const initial = {};
export const userReducer = createReducer(initial,{
LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
})





export const postOfFollowingReducer = createReducer(initial, {
  postOfFollowingRequest: (state) => {
    state.loading = true;
  },
  postOfFollowingSuccess: (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  },
  postOfFollowingFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});


export const getuserprofile = createReducer(initial, {
  Getuserprofile: (state) => {
    state.loading = true;
  },
  GetuserprofileSuccess: (state, action) => {
    state.loading = false;
    state.User = action.payload;
  },
  GetuserprofileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

});





