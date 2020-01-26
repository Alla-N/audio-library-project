import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
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

    saveSearchDataToState = () => {
        this.props.addSearchData (this.state.searchData.trim());
    }

    onClickSearch = () => {
        this.saveSearchDataToState();
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

const mapDispatchToProps = (dispatch)=>({
    addSearchData: (value)=> dispatch({
        type:"ADD_SEARCH_DATA",
        value: value,
    })
})

export default connect(null, mapDispatchToProps) (Search);
