import React from 'react'
import discogsImage from '../images/discogs-logo.png'

export default function Header() {
  return (
    <div className='container'>
      <div className='row'>
        <div className='header'>
          Tim's
          <div className='header-image'>
            <img alt='header-discogs' src={discogsImage}/>
          </div>
        </div>
      </div>
    </div>
  )
}