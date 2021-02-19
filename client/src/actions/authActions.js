import axios from 'axios'
import {returnErrors}from "./errorActions"
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
} from './types'
// check token and load user
export const loadUser = ()=>(dispatch, getState)=>{
  // User loading
  // calls user loading method from the auth reducer
  dispatch({type:USER_LOADING});


  axios.get('/api/auth/user',tokenConfig(getState))
    .then(res =>dispatch({
      type:USER_LOADED,
      payload:res.data
    }))
    .catch(e =>{
      // returns any potential errors
      dispatch(returnErrors(e.response.data,e.response.status))
      // returns any auth related errors
      dispatch({
        type:AUTH_ERROR
      })
    })
}
// token helper function
export const tokenConfig = getState =>{
    //Get token
    const token = getState().auth.token;

    //Headers
    const config = {
      headers:{
        'Content-type':'application/json'
      }
    }
      // if token add it to headers
      if (token){
        config.headers['x-auth-token'] = token;
      }
      // this returns the token if its there otherwise just regular headers
      return config
}