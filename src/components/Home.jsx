import React, { useState, useEffect } from 'react'
import AxiosAuthClient from "../AxiosAuthClient";
import * as Icon from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

const Home = () => {
  const [profile, setProfile] = useState({});
  const {httpRequest, logout} =  AxiosAuthClient()

  useEffect(() => {
    httpRequest.get('/api/v1/profile').then((res) => {
        setProfile(res.data.data)
    }).catch((error) =>{
      logout()
      toast.error('Profile data fetch unsuccessful');
    })
  }, []);
  
  const handleLogout = () => {
    httpRequest.post('/api/v1/logout').then((res) => {
      toast.success('Logout successfully');
      logout()
    }).catch((error) => {
      toast.error('Logout unsuccessful');
    })
  };

  return (
    <div className="container mt-4">
    <div className="row">
      <div className="col-md-6 mx-auto" >
        <div className="card" style={{background:'rgb(12 77 124)', color:'white'}}>
          <div className="card-body text-center">
            <Icon.Person size={100}></Icon.Person>
            <h5 className="card-title">{profile.name}</h5>
            <h2 className="card-text">{profile.email}</h2>
            <Icon.ArrowRightSquare onClick={() => handleLogout()}></Icon.ArrowRightSquare>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
