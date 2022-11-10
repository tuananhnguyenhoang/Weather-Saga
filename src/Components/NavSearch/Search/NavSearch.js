import React, { Component } from 'react'
import { connect } from 'react-redux/es/exports'
import './NavSearch.css'
class NavSearch extends Component {
    constructor() {
        super();
        this.state = {
            key: "",
            nameCi: ""
        }
    }
    render() {
        const HandleInput = (event) => {
            this.setState({
                key: event.target.value
            }, () => { this.props.WeatherSearchDataFunc(this.state.key) })



        }
        const GetDayItem = (lat, lon, name, dt) => {
            this.props.WeatherDayDataFunc(lat, lon, name, dt)
            // console.log(this.props.Search.lsWeatherDay)
        }
        return (
            <div className='SearchResult'>
                <input value={this.state.key} onChange={(event) => HandleInput(event)} />
                {
                    [...this.props.Search.lsWeatherSearch].length > 0 &&
                    this.props.Search.lsWeatherSearch.map((e, i) =>
                        <div onClick={() => GetDayItem(e.lat, e.lon, e.nameCity, e.dt)} key={i} className="cardCountry">
                            <p>
                                <img src={`https://openweathermap.org/images/flags/${e.imgCity}.png`} alt={e.nameCity} />{e.nameCity}</p>
                            <p><span>{e.tempMain}°С</span> temperature from {e.tempMax} to {e.tempMin} °С</p>
                            <p>wind {e.wind} m/s. clouds {e.clouds}%</p>
                            <p>Geo coords[ {e.lat}, {e.lon}] </p>
                        </div>
                    )

                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Search: state.Search
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        WeatherSearchFunc: (val) => {
            dispatch({ type: "GetWeatherSearch", payload: val })
        },
        WeatherSearchDataFunc: (key) => {
            dispatch({ type: "WeatherMain", payload: key })
        },
        WeatherDayDataFunc: (a, b, c, d) => {
            dispatch({ type: "WeatherDay", payload: { lat: a, lon: b, name: c, dtmain: d } })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavSearch)
