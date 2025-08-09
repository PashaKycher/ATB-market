import React from 'react'
import noDataImage from '../assets/nothing here yet.webp' 

const NoData = () => {
  return (
    <div>
        <img src={noDataImage} alt="no data" className='w-36' />
    </div>
  )
}

export default NoData