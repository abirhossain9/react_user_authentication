import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import AxiosAuthClient from './AxiosAuthClient';

function App() {
  const {getToken} = AxiosAuthClient();
  const location = useLocation();
  if(location.pathname == '/' && !getToken()){
    return <Login></Login>
  }
  if((location.pathname == '/login' || location.pathname == '/register') && getToken()){
    return <Home></Home>
  }
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
    </Routes>
    </>
  );
}

export default App;
