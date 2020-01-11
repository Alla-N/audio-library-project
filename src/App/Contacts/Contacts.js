import React, {Component} from 'react';
import './Contacts.css';
import ScrollToTopOnMount from '../ScrollToTopOnMount';

class Contacts extends Component {
    render(){
        return (
            <div className="contacts">
                <ScrollToTopOnMount/>
                <div>
                    <h1>Вы можете найти нас по адресу:</h1>
                    <iframe
                    title="location" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20330.52085504843!2d30.48726797482672!3d50.4352310660297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cee9e88c9d2f%3A0x1b11dcb5203b8420!2sEpam!5e0!3m2!1sru!2sua!4v1578756706534!5m2!1sru!2sua" 
                    width="100%" 
                    height="450px" 
                    frameBorder="0" 
                    allowFullScreen>
                    </iframe>
                </div> 
            </div>
        )
    }
}

export default Contacts;