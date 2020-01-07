import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import TopArtistsPage from './TopArtistsPage/TopArtistsPage';



const App = () => {
  return (
    <div className = 'App'>
      <Header/>
      <Route exact path="/" component={Main}/>
      <Route path = '/artists' component = {TopArtistsPage}/>
      <Aside/>
      <Footer/>
    </div>
  );
}

export default App;
