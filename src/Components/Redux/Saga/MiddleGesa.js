import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects'

async function WeatherMainAPI(key) {
    var resultDtMain = [];
    var apiKey = "439d4b804bc8187953eb36d2a8c26a02";
    var res = await fetch(`https://openweathermap.org/data/2.5/find?q=${key}&appid=${apiKey}&units=metric`)
    var dtWeatherMain = await res.json()
    for (let index = 0; index < dtWeatherMain.list.length; index++) {
        var ndt = dtWeatherMain.list[index]
        // await WeatherDayAPI(ndt.coord.lat, ndt.coord.lon)
        resultDtMain.push({
            dt: ndt.dt,
            imgCity: ndt.sys.country.toLowerCase(),
            nameCity: ndt.name,
            tempMain: (ndt.main.temp - 273.15).toFixed(2),
            tempMax: (ndt.main["temp_min"] - 273.15).toFixed(2),
            tempMin: (ndt.main["temp_max"] - 273.15).toFixed(2),
            wind: ndt.wind.speed,
            clouds: ndt.clouds.all,
            lat: ndt.coord.lat,
            lon: ndt.coord.lon
        })
    }
    return resultDtMain
}
function* getWeatherMain({ payload }) {
    yield delay(1500)
    var lsdtWeatherMain = yield call(WeatherMainAPI, payload)
    yield put({ type: "GetWeatherSearch", payload: lsdtWeatherMain })
}


async function WeatherDayAPI(lat, lon, name, dtmain) {
    var resultWeatherDay = []
    var apiKey = "439d4b804bc8187953eb36d2a8c26a02";
    var res = await fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    var dtWeatherDay = await res.json()
    for (let index = 0; index < dtWeatherDay.daily.length; index++) {
        var vaDetailData = dtWeatherDay.daily[index]
        resultWeatherDay.push({
            lat: lat,
            lon: lon,
            nameMain: name,
            dtMain: dtmain*1000,
            dtDay: vaDetailData.dt * 1000,
            imgIcon: vaDetailData.weather[0].icon,
            TempDay: vaDetailData.temp.day,
            dtSunrise: vaDetailData.sunrise * 1000,
            dtSunset: vaDetailData.sunset * 1000,
            dtMoonrise: vaDetailData.moonrise * 1000,
            dtMoonset: vaDetailData.moonset * 1000,
            tempDay: vaDetailData.temp.day,
            tempMin: vaDetailData.temp.min,
            tempMax: vaDetailData.temp.max,
            tempNight: vaDetailData.temp.night,
            feelslikeDay: vaDetailData.feels_like.day,
            feelslikeNight: vaDetailData.feels_like.night,
            feelslikeEve: vaDetailData.feels_like.eve,
            feelslikeMorn: vaDetailData.feels_like.morn,
            windSpeed: vaDetailData.wind_speed,
            windDeg: vaDetailData.wind_deg,
            clouds: vaDetailData.clouds,
            uvi: vaDetailData.uvi,
        })
    }
    return resultWeatherDay
}

async function WeatherDayDetailAPI(lat, lon, name, dtmain) {
    var apiKey = "439d4b804bc8187953eb36d2a8c26a02";
    var res = await fetch(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    var dtWeatherDay = await res.json()

    // for (let index = 0; index < dtWeatherDay.daily.length; index++) {
    //     var vaDetailData = dtWeatherDay.daily[index] 
    //     resultWeatherDay.push({
    //        
    //     })
    // }
    return dtWeatherDay
}


function* getWeatherDay({ type, payload }) {
    var lsdtWeatherDay = yield call(WeatherDayAPI, payload.lat, payload.lon, payload.name, payload.dtmain)
    yield put({ type: "GetWeatherDay", payload: lsdtWeatherDay })
}
function* getWeatherDayDetail({ type, payload }) {
    var lsdtWeatherDayDetail = yield call(WeatherDayDetailAPI, payload.lat, payload.lon, payload.name, payload.dtmain)
    yield put({ type: "GetWeatherDayDetail", payload: lsdtWeatherDayDetail })
}

function* mySaga() {
    yield takeLatest("WeatherMain", getWeatherMain)
    yield takeEvery("WeatherDay", getWeatherDay)
    yield takeEvery("WeatherDayDetail", getWeatherDayDetail)
}
export default mySaga

