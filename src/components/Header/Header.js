import React, { useState, useEffect } from 'react'
import './Header.css'
import SearchBar from '../SearchBar/SearchBar.js'

export const Header = (props) => {

    const [searchQuery, setsearchQuery] = useState('')

    const onSearch = (value) => {
        props.search(value)
        // setsearchQuery(value)
    } 
    

    return (
        <div id='header'>
            <svg width="71" height="81" viewBox="0 0 71 81" fill="none" xmlns="http://www.w3.org/2000/svg" id="logo">
                <path d="M18.0057 51.0503L33.8783 60.2135V41.8771L17.9989 32.7207V51.0537L18.0057 51.0503ZM11.1713 54.9923L33.8851 68.0941V80.9866L0 61.4454V22.329L11.1713 28.7753V54.9957V54.9923ZM35.5017 20.7394L19.6324 29.9127L35.5017 39.0792L51.3777 29.9093L35.5017 20.7428V20.7394ZM35.5017 12.8689L54.6009 23.9187L65.7721 17.4724L35.5017 0L1.66725 19.5413L12.8216 25.9707L35.5017 12.8689ZM59.8254 54.989V41.6678L52.9977 45.6065V51.0537L37.1251 60.2169V60.2337V41.8872L71 22.3425V61.4487L37.1217 81.0001V68.1177L59.8254 54.9991V54.989Z" fill="white"/>
            </svg>
            <SearchBar onSearch={onSearch}/>
        </div>
    )
}

export default Header