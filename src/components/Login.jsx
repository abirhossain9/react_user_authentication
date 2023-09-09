import React, { useState } from "react";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import AxiosAuthClient from "../AxiosAuthClient";
import image from "../Saly-14.png"
import { toast } from 'react-toastify';

const Login = () => {

  const {httpRequest, saveToken, getToken} =  AxiosAuthClient()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email){
      toast.error('Please enter email');
      return
    }
    if(!password){
      toast.error('Please enter password');
      return
    }
    httpRequest.post('/api/v1/login', {email : email, password : password}).then((response) =>{
      toast.success('Login successful');
      saveToken(response.data.token, rememberMe )
    }).catch((error) => {
      toast.error('Login unsuccessful');
    });
  };

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-8 col-sm-12 side-text'>
              <div className="col-md-9">
                <h1>
                    Sign In To
                </h1><br/>
                <h3>
                    Dashboard Simply
                </h3> <br/>
                If you don’t have an account register <br/>
                You can  <Link to={'/register'} style={{textDecoration: "none", color: "#4D47C3", fontWeight:"bold"}}>register here</Link>
              </div>
              <div className="col-md-3 offset-md-3 d-md-block d-none">
                <img src={image} alt="Responsive Image" className="img-fluid" />
              </div>
            </div>
            
            <div className='col-md-4 col-sm-12 login-form'>
            <h2>Sign In</h2><br></br>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="input-group-text">
                        {showPassword ? (
                          <EyeSlash onClick={handlePasswordToggle} />
                        ) : (
                          <Eye onClick={handlePasswordToggle} />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#4D47C3", width:"100%"}}
                  >
                    Login
                  </button>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default Login
