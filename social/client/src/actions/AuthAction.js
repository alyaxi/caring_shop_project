import * as AuthApi from '../api/AuthRequest'

export const logIn = (formData) => async(dispatch) =>{
  dispatch({type: "AUTH_START"})
    try{
        const {data} =  await AuthApi.logIn(formData)
        dispatch({type: "AUTH_SUCCESS", data: data})
}catch(error){
 console.log(error)
 alert(error.response.data)
 dispatch({type: "AUTH_FAIL"})
}

}

export const signUp = (formData) => async(dispatch) =>{
  dispatch({type: "AUTH_START"})
  try{
    const {data} =  await AuthApi.signUp(formData)
    dispatch({type: "AUTH_SUCCESS", data: data})
  } catch(error){
    alert(error.response.data.message)
   console.log(error)
   dispatch({type: "AUTH_FAIL"})
  }
  
}

export const logOut = ()=> async(dispatch)=> {
  dispatch({type: "LOG_OUT"})
}