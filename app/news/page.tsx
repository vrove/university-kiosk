'use client'

import React, { useEffect, useState } from 'react';
import './news.css';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

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

type setAnnounceType = {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Page = () => {
  const [newsItem, setNewsItem] = useState<setNewsType[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
      if (error) console.error('Error:', error)
      else setNewsItem(data as setNewsType[])
    }
    fetchNews()
  }, [])

  const [announceItem, setAnnounceItem] = useState<setAnnounceType[]>([]);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const { data, error } = await supabase
        .from('announcement')
        .select('*')
      if (error) console.error('Error:', error)
      else setAnnounceItem(data as setAnnounceType[])
    }
    fetchAnnouncement()
  }, [])


  const reversedNews = newsItem.slice().reverse();

  return (
    <div className='main-container'>
      <div className='news-container'>
        {reversedNews.map((item) => (
          <Link key={item.id} href={`/news/${item.id}`}>
            <div className='news-card'>
              <h2 className='news-title'>{item.title}</h2>
              <p className='news-desc'>{item.description}</p>
              <p className='news-date'>{item.date}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className='announce-container'>
      {announceItem.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item) => (
        <div key={item.id} className='announce-card'>
          <h2 className='announce-title'>{item.title}</h2>
          <p className='announce-desc'>{item.description}</p>
          <p className='announce-date'>{item.date}</p>
      </div>
      ))}
    </div>
      <BackButton to="/home"/>
    </div>
  );
};

export default Page;