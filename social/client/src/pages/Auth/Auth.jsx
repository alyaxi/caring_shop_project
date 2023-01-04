import React from 'react'
import { useState } from 'react';
import './Auth.css'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction';
import ReactPasswordChecklist from 'react-password-checklist'
const Auth = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state)=>state.authReducer.loading)
    const [isSignUp, setIsSignUp] =  useState(true);
    const [data, setData] = useState({firstname: "", lastname: "",username: "", password: "", confirmpass: "" })
    console.log(loading)
    const handleChange = (e)=> {
   setData({...data, [e.target.name]: e.target.value})
    }

    const [confirmPass, setConfirmPass] =  useState(true)


    const handleSubmit = (e) =>{
            e.preventDefault();
if (isSignUp){
    data.password === data.confirmpass ?  dispatch(signUp(data)) : setConfirmPass(false);
}
else{
    dispatch(logIn(data))
}
    };

const resetForm = ()=> {
    setConfirmPass(true);
    setData({
        firstname: "", lastname: "",username: "", password: "", confirmpass: "",
    });
};
  return (
    <div className="Auth">
         {/* Left Side */}
        <div className="a-left">
        {/**<img src={Logo} alt="" />**/}
        <div className="Webname">
            <h1>TCS Media</h1>
            <h6>     Share your thoughts</h6>
        </div>
        </div>

        {/* Right Side */}
        <div className="a-right">
            <form className='infoForm authForm' onSubmit={handleSubmit}>
                <h3>{isSignUp ? "Sign up":"Log In"}</h3>
                
                    {isSignUp && (
                        <div>
                    <input type="text" 
                    placeholder='First Name' 
                    className='infoInput' 
                    name='firstname'
                    onChange={handleChange}
                    value= {data.firstname}
                    />
                    <input type="text" 
                    placeholder='Last Name' 
                    className='infoInput' 
                    name='lastname'
                    onChange={handleChange}
                    value={data.lastname}
                    />
                </div>
                    )}
                <div>
                <input type="text" 
                     
                    className='infoInput' 
                    name='username'
                    placeholder='Username'
                    onChange={handleChange}
                    value={data.username}
                    />
                </div>
                <div>
                <input type="password" 
                    className='infoInput' 
                    placeholder='Password' 
                    name='password'
                    onChange={handleChange}
                    //value={data.password}
                    /> 
                    {isSignUp &&
                    <input type="password" 
                    className='infoInput' 
                    placeholder=' Confirm Password' 
                    name='confirmpass'
                    onChange={handleChange}
                    value={data.confirmpass}
                    />}
                    </div>
                    <span style={{display: confirmPass? "none": "block", color: 'red', fontSize: '12px', alignSelf: "flex-end", marginRight: "5px",}}>
                        * Confirm Password is not same
                    </span>
                    <ReactPasswordChecklist
                    rules={["length","specialChar","number","capital"]}
                    minLength={8}
                    value={data.password}
          
                    />
                <div>
                    <span style={{fontSize: '12px', cursor: "pointer"}} onClick = {()=> {setIsSignUp((prev)=>!prev); resetForm()} }>
                        {isSignUp? "Already have an account. Login!": "Don't have an account? Sign Up" }
                    </span>
                </div>
                <button className='button infoButton' type="submit" disabled= {loading}>
                    {loading? "Loading..." : isSignUp ? "Signup": "Log In"}</button>
            </form>
        </div>

    </div>
  );
};

export default Auth;