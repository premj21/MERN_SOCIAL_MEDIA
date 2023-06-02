import {configureStore} from '@reduxjs/toolkit'
import { getuserprofile, postOfFollowingReducer, userReducer } from './Reducer/usereducer';
import { likeReducer } from './Reducer/Postreducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    like: likeReducer,
    Friend:getuserprofile
  },
});
export default store;