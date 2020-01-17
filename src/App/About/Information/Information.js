import React, {Component} from 'react';
import './Information.css';

class Information extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    NextSlide = () => {
        let slides = document.getElementsByClassName('slider_item');

        if(slides){
        let currentSlide = [].findIndex.call(slides, function (e){return e.classList.contains("slider_item_show")})
        slides[currentSlide].classList.remove("slider_item_show");
        currentSlide = (currentSlide+1)%slides.length;
        slides[currentSlide].classList.add("slider_item_show");
        }
    }

    PrevSlide = () => {
        let slides = document.getElementsByClassName('slider_item');
        if(slides){
        let currentSlide = [].findIndex.call(slides, function (e){return e.classList.contains("slider_item_show")})
        slides[currentSlide].classList.remove("slider_item_show");

        if(currentSlide === 0){
            currentSlide = slides.length -1;
        }else{
            currentSlide = (currentSlide-1)%slides.length;
        }
        
        slides[currentSlide].classList.add("slider_item_show");
        }
    }

    componentDidMount(){
        let interval = setInterval(this.NextSlide,3000);
        this.setState({ interval: interval })
    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }


    render(){
    return(
        <div className="information">
            <h2>О нас</h2>
            <div className="slider_wrapper">
                <div className="slider_item slider_item_show">
                    Слушайте музыку
                </div>
                <div className="slider_item">
                    Добавляйте в избранное
                </div>
                <div className="slider_item">
                    Составляйте плейлист
                </div>
                <div className="slider_item">
                    Сортируйте по жанрам
                </div>
                <button className="slider__control slider__control_left" onClick = {this.PrevSlide}></button>
                <button className="slider__control slider__control_right" onClick = {this.NextSlide}></button>
            </div>
        </div>    
    )
    }
}

export default Information;