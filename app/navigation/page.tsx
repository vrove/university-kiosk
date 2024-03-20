import React from 'react'
import './navigation.css'
import Navbar from '@/components/Navbar'
import Map from '@/components/Maps'
import BackButton from '@/components/BackButton'

const page = () => {
  return (
    <div>
      <Map/>
      <BackButton to="/home" />
    </div>
  )
}

export default page