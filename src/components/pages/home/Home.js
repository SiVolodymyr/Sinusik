import Spinner from '../../spinner/Spinner';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import homeData from '../../../resources/data/Home_db.json';
import './home.scss';

const getImagePaths = (isMobile) => {
    const prefix = isMobile ? 'small' : 'large';
    return Array.from({ length: 25 }, (_, i) => `/images/home/${prefix}/img_${i + 1}.jpg`);
};

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(undefined);

    const imageGroups = [
        [1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14],
        [15, 16, 17, 18],
        [19, 20, 21],
        [22, 23, 24, 25],
    ];

    useEffect(() => {
        const checkDeviceType = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkDeviceType(); // одразу визначити

        window.addEventListener('resize', checkDeviceType);
        return () => window.removeEventListener('resize', checkDeviceType);
    }, []);

    useEffect(() => {
        if (isMobile === undefined) return;

        const imagePaths = getImagePaths(isMobile);

        const preloadImages = imagePaths.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        Promise.all(preloadImages)
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [isMobile]);

    if (isLoading || isMobile === undefined) {
        return <Spinner />;
    }


    return (
        <>
            <Helmet>
                <title>Volodymyr Sinusik — Artist & Illustrator</title>
                <meta
                    name="description"
                    content="Welcome to the official website of Volodymyr Sinusik, showcasing his art, exhibitions, biography, and contact information."
                />
                <meta name="author" content="Volodymyr Sinusik" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta
                    name="keywords"
                    content="Volodymyr Sinusik, artist, paintings, exhibitions, biography, contact"
                />

                <meta property="og:title" content="Volodymyr Sinusik — Artist & Illustrator" />
                <meta
                    property="og:description"
                    content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sinusik.com/" />
                <meta
                    property="og:image"
                    content="https://sinusik.com/images/home-preview.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Volodymyr Sinusik — Artist & Illustrator" />
                <meta
                    name="twitter:description"
                    content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details."
                />
                <meta
                    name="twitter:image"
                    content="https://sinusik.com/images/home-preview.jpg"
                />
            </Helmet>
            <div className='home'>
                <div className='container'>
                    <div id='home' className='carousel'>
                        <h1 className='title'>The Life and Art of Volodymyr Sinusik</h1>
                        <Carousel>
                            {imageGroups.map((group, index) => (
                                <Carousel.Item key={index} className='carousel_item'>
                                    {group.map((imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            className={`carousel_img carousel_img_${imgIndex}`}
                                            src={`/images/home/${isMobile ? 'small' : 'large'}/img_${imgIndex}.jpg`}
                                            alt={`images ${imgIndex}`}
                                            loading="lazy"
                                        />
                                    ))}
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        <div className='home_text'>
                            <div className='home_text_1'>
                                {homeData.map((item, i) => (
                                    <div key={i}>
                                        <p>{item.text_1}</p>
                                    </div>
                                ))}
                            </div>
                            <div className='home_text_2'>
                                {homeData.map((item, i) => (
                                    <div key={i}>
                                        <p>{item.text_2}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;