import React from 'react';
import './news.css';

const Page = () => {
  const news = [
    {
      title: 'News 1',
      content: 'This is the content of news 1.',
    },
    {
      title: 'News 2',
      content: 'This is the content of news 2.',
    },
    {
      title: 'News 3',
      content: 'This is the content of news 3.',
    },
  ];

  return (
    <div>
      <h1>News Page</h1>
      {news.map((item, index) => (
        <div key={index} className='news'>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;