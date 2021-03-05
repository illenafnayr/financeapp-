import React from 'react'
import './Header.css'
import SearchBar from '../SearchBar/SearchBar.js'

export const Header = () => {
    return (
        <div id='header'>
            <SearchBar />
        </div>
    )
}

export default Header