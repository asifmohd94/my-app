import React from 'react';
import './App.css';
import LoginForm from './components/login';
import Header from './components/Header/header';
import Home from './components/Home/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';


function App() {
  const  isUserLoggedIn  = useSelector((store: any) => store.user.isUserLoggedIn);
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
      {isUserLoggedIn} ?
      <Route path='/' element={<Home />}/>
      :
      <Route path="/login" element={<LoginForm/>}/>
      </Routes>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
