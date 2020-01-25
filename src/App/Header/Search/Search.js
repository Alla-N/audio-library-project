import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Search.css'


class Search extends Component {
    constructor(){
        super();
        this.state = {
            searchData: '',
        }
    }

    handleInputChange = () => {
        let input = document.getElementById('search_input')
        let value = input.value.toLowerCase();

        this.setState({ 
            searchData: value,
        });
    }

    saveSearchDataToStorage = () => {
        localStorage.setItem('searchData', this.state.searchData.trim());
    }

    onClickSearch = () => {
        this.saveSearchDataToStorage();
    }

    render(){
    return(
        <div className="search">
        <form>
            <input 
            id="search_input" 
            type="text" 
            placeholder="Поиск трека"
            onChange = {this.handleInputChange} 
            value={this.state.searchData}    
            />
            <button type="button"><Link to="/results" onClick={this.onClickSearch}></Link></button>
        </form>
        </div>
    )
    }
}

export default Search;
