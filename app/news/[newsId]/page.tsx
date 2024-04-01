'use client'

import { useState, useEffect } from 'react'
import './newsDetail.css'
import BackButton from '@/components/BackButton'

export default function NewsDetail ({ params }: {
    params: {
        newsId: string
    }
}) {
    const [newsItem, setNewsItem] = useState([])

    useEffect(() => {
        fetch('http://localhost:5500/api/news/' + params.newsId)
            .then(response => response.json())
            .then(data => setNewsItem(data))
            .catch(error => console.error('Error:', error))
    }, [params.newsId])

    if (!newsItem) {
        return <div className='load-news'><a>Loading...</a></div>
    }

    const descriptionWithBreaks = newsItem.description 
    ? { __html: newsItem.description.replace(/\n/g, '<br />') } 
    : { __html: '' }

    return (
        <div className='detail-container'>
            <h1 className='detail-title'>{newsItem.title}</h1>
            <p className='detail-desc' dangerouslySetInnerHTML={descriptionWithBreaks} />
            <p className='detail-date'>{newsItem.date}</p>
            <BackButton to="/news"/>
        </div>
    )
}