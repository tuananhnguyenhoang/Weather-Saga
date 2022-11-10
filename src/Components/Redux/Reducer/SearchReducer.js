//State Global
const LoginState = {
    lsWeatherSearch: [],
    lsWeatherDay: [],
    keyDetail: "",
    lsWeatherDayDetail: [],
    dayItem: []
}
//Mặc định trả về phương thức quản lý State
const SR = (state = LoginState, { type, payload }) => {
    //Switch theo Action truyền vào
    switch (type) {
        //Action Login
        case "GetWeatherSearch":
            return { ...state, lsWeatherSearch: payload }
        //Action Logout
        case "GetWeatherDay":
            return { ...state, lsWeatherDay: payload }
        case "GetWeatherDayDetail":
            return { ...state, lsWeatherDayDetail: payload }
        case "GetDay":
            return { ...state, dayItem: payload }
        default:
            return state
    }
}
export default SR