import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInForm from "./auth/forms/SignInForm";
import SignUpForm from "./auth/forms/SignUpForm";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NewsArticle from "./pages/NewsArticle";
import Header from "./components/shared/Header";
import { Toaster } from "./components/ui/toaster";
import Footer from "./components/shared/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<NewsArticle />} />
        </Routes>

        <Footer/>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
