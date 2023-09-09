import Axios from "axios";
import Cookies from 'js-cookie';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const AxiosAuthClient = () => {
  const getToken = () =>{
    return Cookies.get('token') ?? null
  }
   
  const [token, setToken] = useState(getToken());
  const navigate = useNavigate()

  const saveToken = (token, remember) =>{
    let expirationDays;
    if (remember) {
      expirationDays = 2;
    } else {
      expirationDays = 1 / 48; 
    }
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    Cookies.set('token', token, { expires: expirationDate, secure: true });
    setToken(token)
    navigate('/')
  }

  const logout = () =>{
    Cookies.remove('token');
    navigate('/login')
  }
  

  const httpRequest = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
  });

  return { httpRequest, saveToken, getToken, logout };
};

export default AxiosAuthClient;
