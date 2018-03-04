import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'


const flexStyle = {
 display: 'flex',
 flexDirection: 'row',
 justifyContent: 'flex-end',
 color: 'white'
}

const bannerStyle = {
  background: 'rebeccapurple',
  margin: '0',
  textAlign: "center",
  padding: '0.7rem 0rem'
}

const linkStyle = {
  fontSize: '0.7rem',
  color: 'white',
  textDecoration: 'none',
  padding: '0rem 0.4rem'
}

const todoStyle = {
  fontSize: '1.3rem',
  alignItem: 'center',
  color: 'white',
  textDecoration: 'none'
} 

const pageStyle = {
  float: 'right',
 }

const Header = () => (
  <div style={bannerStyle}>
    <span>
      <Link style={todoStyle} to="/" >Todo List</Link>    
    </span>
    <div style={pageStyle}>
      <Link to="/page-2/" style={linkStyle} >Page 2</Link>
      <Link to="/page-3/" style={linkStyle}>Page 3</Link>
    </div> 
  </div>
)

export default Header
