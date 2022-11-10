import React, { Component } from 'react'
import { connect } from 'react-redux'
import './DayDetail.css'
class DayDetail extends Component {
    render() {
        var TimeDay = (dt) => {
            var date = new Date(dt)
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? "PM" : "AM"
            hours = hours % 12;
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            return (`${hours}:${minutes} ${ampm}`)
        }
        function getFormattedDate(dt) {
            var today = new Date(dt)
            var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            var day = week[today.getDay()];
            return day;
        }
        return (

            <div className='dayMain'>
            {
                console.log(this.props.Search.dayItem.dtDay)
            }
                <h1 className='dayTitle'>{getFormattedDate(this.props.Search.dayItem.dtDay)}</h1>
                {this.props.Search.dayItem?.dtSunrise &&

                <div className='detailItem'>
                    <div className='detailItemsmall'>
                        <h3>Sun and Moon</h3>
                        <p>Sunrise :{TimeDay(this.props.Search.dayItem.dtSunrise)}</p>
                        <p>Sunset :{TimeDay(this.props.Search.dayItem.dtSunset)}</p>
                        <p>Moonrise :{TimeDay(this.props.Search.dayItem.dtMoonrise)}</p>
                        <p>Moonset :{TimeDay(this.props.Search.dayItem.dtMoonset)}</p>
                    </div>
                    <div className='detailItemsmall'>
                        <h3>Temperature</h3>
                        <p>Day: {this.props.Search.dayItem.tempDay} <sup>o</sup></p>
                        <p>Min:  {this.props.Search.dayItem.tempMin} <sup>o</sup></p>
                        <p>Max:  {this.props.Search.dayItem.tempMax} <sup>o</sup></p>
                        <p>Night:  {this.props.Search.dayItem.tempNight} <sup>o</sup></p>
                    </div>
                    <div className='detailItemsmall'>
                        <h3>Feels like</h3>
                        <p>Day:{this.props.Search.dayItem.feelslikeDay}<sup>o</sup></p>
                        <p>Night:{this.props.Search.dayItem.feelslikeNight}<sup>o</sup></p>
                        <p>Evening:{this.props.Search.dayItem.feelslikeEve}<sup>o</sup></p>
                        <p>Morning:{this.props.Search.dayItem.feelslikeMorn}<sup>o</sup></p>
                    </div>
                    <div className='detailItemsmall'>
                        <h3>Other</h3>
                        <p>Wind degree:{this.props.Search.dayItem.windDeg}<sup>0</sup></p>
                        <p>Wind speed:{this.props.Search.dayItem.windSpeed}m/s</p>
                        <p>Clound: {this.props.Search.dayItem.clouds}%</p>
                        <p>UV:{this.props.Search.dayItem.uvi}</p>
                    </div>
                </div>
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
        },
        WeatherDayDataDetailFunc: (a, b, c, d) => {
            dispatch({ type: "WeatherDayDetail", payload: { lat: a, lon: b, name: c, dtmain: d } })
        },
        DayItem: (day) => {
            dispatch({ type: "GetDay", payload: day })
        }


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DayDetail)