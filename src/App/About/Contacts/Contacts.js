import React, {Component} from 'react';
import './Contacts.css';
import ScrollToTopOnMount from '../../ScrollToTopOnMount';

class Contacts extends Component {
    render(){
        return (
            <div className="contacts">
                <ScrollToTopOnMount/>
                <div>
                    <h1>Вы можете найти нас по адресу:</h1>
                    <iframe
                    title="location" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20354.401562024555!2d30.38846243432784!3d50.37960221193534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c98940ece1c9%3A0xb80a1c415f945385!2z0YPQuy4g0JbRg9C70Y_QvdGB0LrQsNGPLCAyLCDQmtGA0Y7QutC-0LLRidC40L3QsCwg0JrQuNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMDgxMzY!5e0!3m2!1sru!2sua!4v1579176940872!5m2!1sru!2sua" 
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


