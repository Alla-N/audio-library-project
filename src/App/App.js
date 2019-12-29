import React from 'react';
import './App.css';
import Header from './Header/Header';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import Footer from './Footer/Footer';


const App = () => {
  return (
    <div className = 'App'>
      <Header/>
      <Main/>
      <Aside/>
      <Footer/>
    </div>
  );
}

export default App;
