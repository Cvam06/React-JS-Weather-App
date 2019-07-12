import React, { Component } from "react";
import "./css/App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Favorites from "./components/Favorites";
import FiveDaysWeather from './components/FiveDaysWeather';
import sunny from './';
//import API_KEY from "./config.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appStyleName: 'App',
      weatherData: {
        weather: "",
        city: "",
        country: "",
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0
      },
      fiveDaysData: {
        list: []
      },
      searchDone: false,
      savedCities: [],
      hasSavedCities: false,
      errorMessage: "",
      nextFiveDays: [],
      showWeatherCard :false
    };

    this.callWeatherData = this.callWeatherData.bind(this);
    this.updateSavedCities = this.updateSavedCities.bind(this);
  }

  callWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6f4bd3c9cfa4bdc419fc9904fb2e5165`;
    fetch(url)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => {
        if (data.weather[0].main == "Clouds") {
          this.setState({ appStyleName: "app_cloudy" })
        }
        else if (data.weather[0].main == "Sunny") {
          this.setState({ appStyleName: "app_sunny" })
        }
        else if (data.weather[0].main == "Dust") {
          this.setState({ appStyleName: "app_dust" })
        }
        else if (data.weather[0].main == "Rain" || data.weather[0].main == "Mist" || data.weather[0].main == "Drizzle") {
          this.setState({ appStyleName: "app_rain" })
        }
        else if (data.weather[0].main == "Haze") {
          this.setState({ appStyleName: "app_haze" })
        }
        else if (data.weather[0].main == "Smoke") {
          this.setState({ appStyleName: "app_smoke" })
        }
        else {
          this.setState({ appStyleName: "app_sunny" })
        }
        const weatherObj = {
          weather: data.weather,
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          humidity: data.main.humidity
        };
        this.setState({
          weatherData: weatherObj,
          searchDone: true,
          errorMessage: ""
        });
      })
      .catch(error => {
        // If an error is catch, it's sent to SearchBar as props
        this.setState({ errorMessage: error.message });
      });
    this.callFiveDaysWeatherData(city);
    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  callFiveDaysWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6f4bd3c9cfa4bdc419fc9904fb2e5165`;
    fetch(url)
      .then(handleErrors)
      .then(resp => resp.json())
      .then(data => {
        let nextFiveDays = [];
        data.list.map((oneData) => {
          let date = oneData.dt_txt.split(' ');
          if (date[1] === "12:00:00") {
            const tempFiveDaysObject = {
              temp: oneData.main.temp,
              weather: oneData.weather,
              date: date[0],
              max_temp : oneData.main.temp_max,
              min_temp : oneData.main.temp_min,
              humidity : oneData.main.humidity
            }
            nextFiveDays.push(tempFiveDaysObject);
          }
        }
        );
        this.setState({ nextFiveDays: nextFiveDays });
        console.log("NextFiveDaysArray :=========> ", nextFiveDays);
      })
      .catch(error => {
        // If an error is catch, it's sent to SearchBar as props
        this.setState({ errorMessage: error.message });
      });

    function handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  }

  updateSavedCities(cityArr) {
    // hasCities is set to true if length is more than 0, otherwise false
    const hasCities = cityArr.length > 0;
    this.setState({ savedCities: cityArr, hasSavedCities: hasCities });
  }

  componentWillMount() {
    // See if there's saved cities in localStorage before the App is mounted
    // Tests didn't like parsing when localStorage.getItem was undefined, so this was my solution for it
    let existingCities = JSON.parse(localStorage.getItem("cityList") || "[]");

    if (existingCities.length !== 0) {
      this.setState({
        hasSavedCities: true,
        savedCities: existingCities
      });
    }
  }


  render() {
    const {
      searchDone,
      weatherData,
      hasSavedCities,
      savedCities,
      errorMessage
    } = this.state;

    let fiveDaysCards = (
      this.state.nextFiveDays.map((oneDay) => {
        return <div class="col-md-2">
          <FiveDaysWeather
            oneDayData={oneDay}
          />
        </div>
      })
    )

    return (
      <div className={this.state.appStyleName}>
          <SearchBar
           
          />
          {searchDone && (
            <WeatherCard
              weatherData={weatherData}
              savedCities={savedCities}
              callBackFromParent={this.updateSavedCities}
              fiveDayData={this.state.nextFiveDays}
            />
          )}
          {/* {hasSavedCities && (
          <Favorites
            savedCities={savedCities}
            callBackFromParent={this.callWeatherData}
          />
        )} */}
          
          {/* <div className="container">
            <div className="row">
              
              {searchDone && (
                fiveDaysCards
              )}
              </div>
            
          </div> */}
      </div>

    );
  }
}

export default App;
