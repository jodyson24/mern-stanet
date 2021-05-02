/* eslint-disable no-undef */
import React from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import Search from './Search'

export default function Header() {


  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <div className="container-fluid">
          <Link to="/" className="logo" >
            <h1 className="navbar-brand text-uppercase p-1 m-0"
            onClick={() => window.scrollTo({top: 0})}
            >Stanet</h1>
          </Link>

          <Search />

          <Menu />

        </div>
      </nav>
    </div>
  )
}
