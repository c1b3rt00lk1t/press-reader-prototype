import React from 'react'

import {IoMdSettings, IoMdEye, IoMdShareAlt, IoMdSearch} from 'react-icons/io'

const Footer = () => {
  return (
    <footer>
        <IoMdSearch className='footer-icon'/>
        <IoMdEye className='footer-icon'/>
        <IoMdShareAlt className='footer-icon'/>
        <IoMdSettings className='footer-icon'/>
    </footer>
  )
}

export default Footer