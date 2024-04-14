'use client'

import React, { useEffect, useState } from 'react';
import './news.css';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

type setNewsType = {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Page = () => {
  const [newsItem, setNewsItem] = useState<setNewsType[]>([]);

  useEffect(() => {
    fetch('http://localhost:5500/api/news/')
      .then(response => response.json())
      .then(data => setNewsItem(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const reversedNews = newsItem.slice().reverse();

  return (
    <div>
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
      <BackButton to="/home"/>
    </div>
  );
};

export default Page;