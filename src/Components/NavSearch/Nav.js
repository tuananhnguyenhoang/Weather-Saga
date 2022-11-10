import React, { Component } from 'react'
import NavSearch from './Search/NavSearch'
import './Nav.css'
export default class Nav extends Component {
  render() {
    return (
      <div className='Nav'>
      <NavSearch/>
      </div>
    )
  }
}
