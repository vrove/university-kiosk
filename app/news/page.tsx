import React from 'react';
import './news.css';
import BackButton from '@/components/BackButton';
import news from '@/components/data-example/berita';
import Link from 'next/link';

const Page = () => {
  const reversedNews = news.slice().reverse(); 

  return (
    <div>
      <div className='news-container'>
        {reversedNews.map((item) => (
          <Link key={item.id} className='news-card' href={`/news/${item.id}`}>
            <h2 className='news-title'>{item.title}</h2>
            <p className='news-desc'>{item.description}</p>
            <p className='news-date'>{item.date}</p>
          </Link>
        ))}
      </div>
      <BackButton to="/home"/>
    </div>
  );
};

export default Page;