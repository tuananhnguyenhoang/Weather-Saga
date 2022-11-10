import React, { Component } from 'react'
import Nav from './Components/NavSearch/Nav'
import './App.css'
import CityDetail from './Components/CityDetail/CityDetail'
import DayDetail from './Components/DayDetail/DayDetail'
export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <Nav/>
        <div className='Detail'>
        <CityDetail/>
        <DayDetail/>
        </div>
      </div>
    )
  }
}
