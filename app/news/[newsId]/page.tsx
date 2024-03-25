import news from '@/components/data-example/berita';
import './newsDetail.css'
import BackButton from '@/components/BackButton';

export default function newsDetail ({ params }: {
    params: {
        newsId: string;
    };
}) {
    const newsItem = news[parseInt(params.newsId) - 1];
    const descriptionWithBreaks = { __html: newsItem.description.replace(/\n/g, '<br />') };

    return (
        <div className='detail-container'>
            <h1 className='detail-title'>{newsItem.title}</h1>
            <p className='detail-desc' dangerouslySetInnerHTML={descriptionWithBreaks} />
            <p className='detail-date'>{newsItem.date}</p>
            <BackButton to="/news"/>
        </div>
    );
}