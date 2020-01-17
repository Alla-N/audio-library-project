import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import TopArtistsPage from './TopArtistsPage/TopArtistsPage';
import User from './User/User';
import Registration from './User/Registration/Registration';
import Contacts from './About/Contacts/Contacts';
import Information from './About/Information/Information';
import ArtistPage from './ArtistPage/ArtistPage';
import SongsPage from './SongsPage/SongsPage';
import ScrollToTopOnMount from './ScrollToTopOnMount';



class App extends Component {
  render(){
  return (
    <div className = 'App'>
      <ScrollToTopOnMount />
      <Header/>
      <Route exact path="/" component={Main}/>
      <Route path = '/artists' component = {TopArtistsPage}/>
      <Route path = '/songs' component = {SongsPage}/>
      <Route path = '/user' component = {User}/>
      <Route path = '/registration' component = {Registration}/>
      <Route path = '/contacts' component = {Contacts}/>
      <Route path = '/information' component = {Information}/>
      <Route 
      path = '/artist/:artistName'
      render = {props=><ArtistPage {...props}/>}></Route>
      <Aside/>
      <Footer/>
    </div>
  )
  }
}

export default App;
