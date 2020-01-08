import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Footer.css';

class Footer extends Component {
    render(){

    return (
        <div className = 'footer'>
            <audio src={this.props.currentSrc} controls autoplay="true"></audio>
            {/* <div className="progress">
                <div className="text">
                    <div className="time current">00:57</div>
                    <div className="time duration">03:26</div>
                </div>
                <div className="value"></div>
            </div> */}
            {/* <div className="controls">
                <div className="controls_buttons">
                    <div className="btn prev" title="Предыдущая">
                        <i className="icon"></i>
                    </div>
                    <div className="btn play">
                        <i className="icon"></i>
                    </div>
                    <div className="btn next" title="Следующая">
                        <i className="icon"></i>
                    </div>
                    <div className="btn repeat" title="Зациклить воспроизведение">
                        <i className="icon"></i>
                    </div>
                </div>
                <div className="mp3">
                    <span className="title">
                        <span className="artist_name">Artist name</span>
                        <span className="song_name">Song name</span>
                    </span>
                </div>
                <div className="actions">
                    <div className="btn volume">
                        <i className="icon"></i>
                        <div className="controls_box">
                            <div className="b_range">
                                <div className="slider"></div>
                            </div>
                        </div>
                    </div>
                    <div className="btn like" title="Мне нравится">
                        <i className="icon"></i>
                    </div>
                    <div className="btn download" title="Скачать">
                        <a href="./">
                            <i className="icon"></i>
                        </a>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
}

const mapStateToProps = (state) => ({
    currentSrc: state.playSong.currentSong,
})

export default connect(mapStateToProps)(Footer);