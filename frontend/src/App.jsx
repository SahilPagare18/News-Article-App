import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewsArticle from "./pages/NewsArticle";


const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/sign-in' element={<SignInForm/>}/>
        <Route path='/sign-up' element={<SignUpForm/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/news' element={<NewsArticle/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
