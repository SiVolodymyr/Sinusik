import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import img_bio from '../../../resources/img/biography/img_bio.jpg';
import biographyData from '../../../resources/data/Biography_db.json';
import Spinner from '../../spinner/Spinner';

import './biography.scss';

const Biography = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const preload = new Image();
        preload.src = img_bio;
        preload.onload = () => setIsLoading(false);
        preload.onerror = () => {
            console.error('Image failed to load');
            setIsLoading(false);
        };
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <Helmet>
                <title>Biography | Volodymyr Sinusik</title>
                <meta
                    name="description"
                    content="Biography of Volodymyr Sinusik - a journey through his life and artistic creativity."
                />
                <meta name="author" content="Volodymyr Sinusik" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta
                    name="keywords"
                    content="Volodymyr Sinusik, biography, life story, artist, creativity, art journey"
                />

                {/* Open Graph */}
                <meta property="og:title" content="Biography | Volodymyr Sinusik" />
                <meta
                    property="og:description"
                    content="Explore the life and artistic journey of Volodymyr Sinusik."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sinusik.com/biography" />
                <meta
                    property="og:image"
                    content="https://sinusik.com/images/biography-preview.jpg"
                />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Biography | Volodymyr Sinusik" />
                <meta
                    name="twitter:description"
                    content="Biography of Volodymyr Sinusik – a journey through his life and artistic creativity."
                />
                <meta
                    name="twitter:image"
                    content="https://sinusik.com/images/biography-preview.jpg"
                />
            </Helmet>
            <div className='biography'>
                <div className='container'>
                    <div className="biography_photo">
                        <img src={img_bio} alt="img_bio" />
                    </div>
                    <div className='title'>Volodymyr Sinusik</div>
                    <div className='biography_text'>
                        {biographyData.map((item, i) => (
                            <div key={i}>
                                <p>{item.text}</p> <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Biography;