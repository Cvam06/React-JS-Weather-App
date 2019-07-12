import React, { Component } from "react";
import "../css/WeatherCard.css";
import "../css/weather-icons.min.css";

class FiveDaysWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            celcius_temp : Math.round(this.props.oneDayData.temp - 273.15)
        }
    }

    render() {
        return (
            <div className="FiveDaysWeather-card">
                <h4> Date : {this.props.oneDayData.date}</h4> 
                <h3> Temprature : {this.state.celcius_temp}°</h3>
            </div>
        ); 
    }

}

export default FiveDaysWeather;