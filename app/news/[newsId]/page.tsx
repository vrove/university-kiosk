'use client'

import { useState, useEffect } from 'react'
import './newsDetail.css'
import BackButton from '@/components/BackButton'

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '')

type setNewsType = {
    id: number;
    title: string;
    description: string;
    date: string;
  }

export default function NewsDetail ({ params }: {
    params: {
        newsId: string
    }
}) {

    const [newsItem, setNewsItem] = useState<setNewsType>()

    useEffect(() => {
        const fetchNews = async () => {
            const { data, error } = await supabase
                .from('news')
                .select('*')
                .eq('id', params.newsId)
            if (error) console.error('Error:', error)
            else setNewsItem(data[0] as setNewsType)
        }
        fetchNews()
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