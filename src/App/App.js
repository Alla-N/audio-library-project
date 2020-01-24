import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Aside from './Aside/Aside';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import AllArtistsPage from './AllArtistsPage/AllArtistsPage';
import User from './User/User';
import Registration from './User/Registration/Registration';
import Contacts from './About/Contacts/Contacts';
import Information from './About/Information/Information';
import ArtistPage from './ArtistPage/ArtistPage';
import SongsPage from './SongsPage/SongsPage';
import Playlist from './Playlist/Playlist';
import Favorites from './Favorites/Favorites';
import Results from './Results/Results';
import ScrollToTopOnMount from './ScrollToTopOnMount';



class App extends Component {
  render(){
  return (
    <div className = 'App'>
      <ScrollToTopOnMount />
      <Header/>
      <Route exact path="/" component={Main}/>
      <Route path = '/artists' component = {AllArtistsPage}/>
      <Route path = '/songs' component = {SongsPage}/>
      <Route path = '/user' component = {User}/>
      <Route path = '/registration' component = {Registration}/>
      <Route path = '/contacts' component = {Contacts}/>
      <Route path = '/information' component = {Information}/>
      <Route 
      path = '/artist/:artistName'
      render = {props=><ArtistPage {...props}/>}></Route>
      <Route path = '/playlist' component = {Playlist}/>
      <Route path = '/favorites' component = {Favorites}/>
      <Route path = '/results' component = {Results}/>
      <Aside/>
      <Footer/>
    </div>
  )
  }
}

export default App;
