import React from 'react'
import Link from 'next/link'
import './home.css'
import { FaNewspaper } from 'react-icons/fa';
import { FaCompass } from 'react-icons/fa';

const page = () => {
  return (
    <div className='mainButton font-bold'>
        <Link href='/news' className='newsButton'>
        <FaNewspaper className='icon-news' />
          News
        </Link>
        <Link href='/navigation' className='navButton'>
          <FaCompass className='icon-nav' />
          Navigation
        </Link>
    </div>
  )
}

export default page