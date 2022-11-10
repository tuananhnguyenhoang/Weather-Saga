import React, { Component } from 'react'
import { connect } from 'react-redux'
import './CityDetail.css'
class CityDetail extends Component {
    constructor() {
        super();
        this.state = {
            TimeDt: "",
            TimeMain: ""
        }
    }
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
            var monthNames = new Array("January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            )
            var day = week[today.getDay()];
            var dd = today.getDate();
            var mm = monthNames[today.getMonth() + 1] ; //January is 0!
            var yyyy = today.getFullYear();
            var hour = today.getHours();
            var minu = today.getMinutes();

            if (dd < 10) { dd = '0' + dd }
            if (mm < 10) { mm = '0' + mm }
            if (minu < 10) { minu = '0' + minu }

            return day + ', ' + dd + ' ' + mm + ' , ' + yyyy;
            
        }
        function getFormattedDay(dt) {
            var today = new Date(dt)
            var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            var day = week[today.getDay()];
            return day ;
        }
        return (

            <div className='Day'>
                <div>
                {console.log(this.props)}
                    {[...this.props.Search.lsWeatherDay].length > 0 &&
                        <div className='timeDayMain'>
                            <h1 className='mainTime'>{TimeDay(([...this.props.Search.lsWeatherDay][0].dtMain))}</h1>
                            <h3 className='mainDay'>{getFormattedDate(([...this.props.Search.lsWeatherDay][0].dtMain))}</h3> <br/>
                            <h1 className='title'>Welcome to {[...this.props.Search.lsWeatherDay][0].nameMain} city</h1>
                        </div>
                    }
                </div>
                <div className='DayDetail'>
                    {
                        [...this.props.Search.lsWeatherDay].length > 0 &&
                        this.props.Search.lsWeatherDay.map((e, i) =>
                            <div key={i} className='dayItem' onClick={() => this.props.DayItem(e)}>
                                {/* {console.log(TimeDay(e.dtDay))} */}
                                <img src={`https://openweathermap.org/img/wn/${e.imgIcon}@2x.png`} alt="" />
                                <div className="DayWeather day">{ getFormattedDay(e.dtDay)}</div>
                                <div className="temperWeather">{e.TempDay}<sup>o</sup></div>
                            </div>
                        )

                    }
                </div>




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
        WeatherDayDataDetailFunc: (a, b, c) => {
            dispatch({ type: "WeatherDayDetail", payload: { lat: a, lon: b, name: c } })
        },
        DayItem: (day) => {
            dispatch({ type: "GetDay", payload: day })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CityDetail)