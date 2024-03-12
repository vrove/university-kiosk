import React from 'react'
import Link from 'next/link'
import './home.css'

const page = () => {
  return (
    <div className='mainButton font-bold font'>
        <Link href='/news' className='newsButton'>Test</Link>
        <Link href='/navigation' className='navButton'>Test</Link>
    </div>
  )
}

export default page