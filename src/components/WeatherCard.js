import React, { Component } from "react";
import "../css/WeatherCard.css";
import "../css/weather-icons.min.css";

class WeatherCard extends Component {
  constructor(props) {
    super(props);

    this.saveDataToLocalStorage = this.saveDataToLocalStorage.bind(this);
    this.deleteDataFromLocalStorage = this.deleteDataFromLocalStorage.bind(this);
  }

  deleteDataFromLocalStorage() {
    const existingCities = JSON.parse(localStorage.getItem("cityList"));
    const indexOfCity = existingCities.indexOf(this.props.weatherData.city);

    existingCities.splice(indexOfCity, 1);
    localStorage.setItem("cityList", JSON.stringify(existingCities));
    this.props.callBackFromParent(existingCities);
  }

  saveDataToLocalStorage() {
    // Get data from LocalStorage if there is any and push back with new city
    const existingCities = JSON.parse(localStorage.getItem("cityList")) || [];

    existingCities.push(this.props.weatherData.city);
    localStorage.setItem("cityList", JSON.stringify(existingCities));
    this.props.callBackFromParent(existingCities);
  }

  render() {
    const { city, weather, country, temp, temp_max, temp_min, humidity } = this.props.weatherData;
    const celcius = Math.round(temp - 273.15);
    const celcius_temp_max = Math.round(temp_max - 273.15);
    const celcius_temp_min = Math.round(temp_min - 273.15);

    let fiveDaysTable = (
      this.props.fiveDayData.map((oneDay,index) => {
        console.log("In fiver=Days table",index);
        let date = oneDay.date.split('-');
        let months = ['January','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec']
        let newDate = date[2]+" "+months[date[1]-1]
        return <tr> 
          <td> {newDate} </td>
          <td className="justify-content-center font-weight-bold"> <i className={`wi wi-owm-${oneDay.weather[0].id} WeatherCard-icon`}/> </td>
          <td> {Math.round(oneDay.temp-273.15)}° ({Math.round(oneDay.max_temp-273.15)}°- {Math.round(oneDay.min_temp-273.15)}°)</td>
          <td> {oneDay.humidity}% </td>
        </tr>
      })
    )

    return (
      <div className="WeatherCard">
        <div className="row">
          <div className="col-md-4 text-center border-right border-secondary">
            <h2 className="WeatherCard-degrees">{celcius}°C</h2>
            <div className="WeatherCard-icon-container">
              <i className={`wi wi-owm-${weather[0].id} WeatherCard-icon`} />
              <p className="mb-2 font-weight-bold">{weather[0].main}</p>
            </div>
            <h5 className="m-2"> Maximum Temperature : {celcius_temp_max} °C</h5>
            <h5 className="m-2"> Minimum Temperature : {celcius_temp_min} °C</h5>
            <h5 className="m-2"> Humidity : {humidity}%</h5>
            <h2 className="m-2">
              {city}, {country}
            </h2>
          </div>
          <div className="col-md-8">
          <div class="table-responsive">
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Weather</th>
          <th scope="col">Temperature(°C)</th>
          <th scope="col">Humidity</th>
        </tr>
      </thead>
      <tbody className="table-borderless">
        {fiveDaysTable}
      </tbody>
      {}
    </table>
  </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherCard;
