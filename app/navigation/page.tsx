import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import './navigation.css'
import BackButton from '@/components/BackButton'

const Map = dynamic(() => import('@/components/Maps'), { ssr: false })

const Page = () => {
  return (
    <div>
      <Map/>
      <BackButton to="/home" />
    </div>
  )
}

export default Page