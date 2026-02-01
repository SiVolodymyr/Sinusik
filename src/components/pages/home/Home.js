import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

import homeData from '../../../resources/data/Home_db.json';

import Spinner from '../../spinner/Spinner';
import GroupedCarousel from '../../GroupedCarousel/GroupedCarousel';

import 'bootstrap/dist/css/bootstrap.min.css';
import './home.scss';

const getImagePaths = () => {
    return Array.from({ length: 25 }, (_, i) => `/images/home/large/img_${i + 1}.jpg`);
};

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    const imageGroups = [
        [1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14],
        [15, 16, 17, 18],
        [19, 20, 21],
        [22, 23, 24, 25],
    ];

    const imageCapitel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const imagePleinair = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    useEffect(() => {
        const imagePaths = getImagePaths();

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
    }, []);

    if (isLoading) {
        return <Spinner />;
    }


    return (
        <>
            <Helmet>
                <title>Volodymyr Sinusik — Artis</title>
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

                <meta property="og:title" content="Volodymyr Sinusik — Artist" />
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
                                            src={`/images/home/large/img_${imgIndex}.jpg`}
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
                        <div className='home_lastWorks' >
                            <h2 className='title title_lastworks'>Last works</h2>
                            <GroupedCarousel images={imageCapitel} classNamePrefix="capitel" />
                            <div className='home_descr'>
                                <div className='home_title'>Corinthian order</div>
                                <div className='home_wrapper'>
                                    <div className='home_medium'>watercolor, graphite pencil</div>
                                    <div className='home_size'>70×50 cm</div>
                                    <div className='home_time'>Mars-May 2025</div>
                                </div>
                            </div>
                            <GroupedCarousel images={imagePleinair} classNamePrefix="pleinair" />
                            <div className='home_descr'>
                                <div className='home_title'>Pleinair</div>
                                <div className='home_wrapper'>
                                    <div className='home_medium'>watercolor</div>
                                    <div className='home_size'>A4 — A3</div>
                                    <div className='home_time'>May-August 2025</div>
                                </div>
                            </div>
                        </div>
                        <div className='home_aboutSite'>
                            <p>
                                In the fall of 2024, I started learning web development.
                            </p>
                            <p>
                                I created this website on my own as a final project that reflects the skills and knowledge I’ve acquired over this time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;




// import Spinner from '../../spinner/Spinner';
// import { useState, useEffect } from 'react';
// import { Carousel } from 'react-bootstrap';
// import { Helmet } from 'react-helmet-async';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import homeData from '../../../resources/data/Home_db.json';
// import './home.scss';

// const slidesDesktop = [
//     [1, 2, 3],
//     [4, 5, 6, 7],
//     [8, 9, 10, 11],
//     [12, 13, 14],
//     [15, 16, 17, 18],
//     [19, 20, 21],
//     [22, 23, 24, 25]
// ];

// const slidesMobile = [
//     [1],
//     [4, 7],
//     [8, 10],
//     [12],
//     [15, 16],
//     [19],
//     [23, 24]
// ];

// const Home = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [deviceType, setDeviceType] = useState('desktop'); // 'mobile' | 'tablet' | 'desktop'

//     useEffect(() => {
//         const updateDeviceType = () => {
//             const width = window.innerWidth;
//             if (width <= 768) setDeviceType('mobile');
//             else if (width <= 1024) setDeviceType('tablet');
//             else setDeviceType('desktop');
//         };
//         updateDeviceType();
//         window.addEventListener('resize', updateDeviceType);
//         return () => window.removeEventListener('resize', updateDeviceType);
//     }, []);

//     const imageSrc = (index) => `/images/home/large/img_${index}.jpg`;

//     const slides = deviceType === 'mobile'
//         ? slidesMobile
//         : slidesDesktop;

//     // Прелоадинг
//     useEffect(() => {
//         const allIndices = slides.flat();
//         const preload = allIndices.map((i) => {
//             return new Promise((resolve, reject) => {
//                 const img = new Image();
//                 img.src = imageSrc(i);
//                 img.onload = resolve;
//                 img.onerror = reject;
//             });
//         });
//         Promise.all(preload).then(() => setIsLoading(false)).catch(() => setIsLoading(false));
//     }, [deviceType]);

//     if (isLoading) return <Spinner />;

//     return (
//         <>
//             <Helmet>
//                 <title>Volodymyr Sinusik — Artist & Illustrator</title>
//                 <meta name="description" content="Welcome to the official website of Volodymyr Sinusik, showcasing his art, exhibitions, biography, and contact information." />
//                 <meta name="author" content="Volodymyr Sinusik" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />
//                 <meta name="keywords" content="Volodymyr Sinusik, artist, paintings, exhibitions, biography, contact" />
//                 <meta property="og:title" content="Volodymyr Sinusik — Artist & Illustrator" />
//                 <meta property="og:description" content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details." />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://sinusik.com/" />
//                 <meta property="og:image" content="https://sinusik.com/images/home-preview.jpg" />
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Volodymyr Sinusik — Artist & Illustrator" />
//                 <meta name="twitter:description" content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details." />
//                 <meta name="twitter:image" content="https://sinusik.com/images/home-preview.jpg" />
//             </Helmet>

//             <div className='home'>
//                 <div className='container'>
//                     <div id='home' className='carousel'>
//                         <h1 className='title'>The Life and Art of Volodymyr Sinusik</h1>
//                         <Carousel>
//                             {slides.map((group, i) => (
//                                 <Carousel.Item key={i} className="carousel_item">
//                                     {group.map((index) => (
//                                         <img
//                                             key={index}
//                                             className="carousel_img"
//                                             src={imageSrc(index)}
//                                             alt={`img_${index}`}
//                                         />
//                                     ))}
//                                 </Carousel.Item>
//                             ))}
//                         </Carousel>

//                         <div className='home_text'>
//                             <div className='home_text_1'>
//                                 {homeData.map((item, i) => (
//                                     <div key={i}>
//                                         <p>{item.text_1}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className='home_text_2'>
//                                 {homeData.map((item, i) => (
//                                     <div key={i}>
//                                         <p>{item.text_2}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;



// import Spinner from '../../spinner/Spinner';
// import { useState, useEffect } from 'react';
// import { Carousel } from 'react-bootstrap';
// import { Helmet } from 'react-helmet-async';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import homeData from '../../../resources/data/Home_db.json';
// import './home.scss';

// const getPhotosPerSlide = () => {
//     const width = window.innerWidth;
//     if (width < 768) return 1;
//     if (width < 1024) return 2;
//     return 3;
// };

// const chunkArray = (arr, chunkSize) => {
//     const chunks = [];
//     for (let i = 0; i < arr.length; i += chunkSize) {
//         chunks.push(arr.slice(i, i + chunkSize));
//     }
//     return chunks;
// };

// const Home = () => {
//     const [isLoading, setIsLoading] = useState(true);
//     const [photosPerSlide, setPhotosPerSlide] = useState(getPhotosPerSlide());
//     const totalImages = 25;
//     const imagePaths = Array.from({ length: totalImages }, (_, i) => `/images/home/large/img_${i + 1}.jpg`);

//     useEffect(() => {
//         const preloadImages = imagePaths.map((src) => {
//             return new Promise((resolve, reject) => {
//                 const img = new Image();
//                 img.src = src;
//                 img.onload = resolve;
//                 img.onerror = reject;
//             });
//         });

//         Promise.all(preloadImages)
//             .then(() => setIsLoading(false))
//             .catch(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             setPhotosPerSlide(getPhotosPerSlide());
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const groupedImages = chunkArray(imagePaths, photosPerSlide);

//     if (isLoading) {
//         return <Spinner />;
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>Volodymyr Sinusik — Artist & Illustrator</title>
//                 <meta name="description" content="Welcome to the official website of Volodymyr Sinusik, showcasing his art, exhibitions, biography, and contact information." />
//                 <meta name="author" content="Volodymyr Sinusik" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />
//                 <meta name="keywords" content="Volodymyr Sinusik, artist, paintings, exhibitions, biography, contact" />
//                 <meta property="og:title" content="Volodymyr Sinusik — Artist & Illustrator" />
//                 <meta property="og:description" content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details." />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://sinusik.com/" />
//                 <meta property="og:image" content="https://sinusik.com/images/home-preview.jpg" />
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Volodymyr Sinusik — Artist & Illustrator" />
//                 <meta name="twitter:description" content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details." />
//                 <meta name="twitter:image" content="https://sinusik.com/images/home-preview.jpg" />
//             </Helmet>

//             <div className='home'>
//                 <div className='container'>
//                     <div id='home' className='carousel'>
//                         <h1 className='title'>The Life and Art of Volodymyr Sinusik</h1>
//                         <Carousel>
//                             {groupedImages.map((group, index) => (
//                                 <Carousel.Item key={index} className='carousel_item'>
//                                     {group.map((src, idx) => (
//                                         <img
//                                             key={idx}
//                                             className={`carousel_img`}
//                                             src={src}
//                                             alt={`images ${index * photosPerSlide + idx + 1}`}
//                                             loading="lazy"
//                                         />
//                                     ))}
//                                 </Carousel.Item>
//                             ))}
//                         </Carousel>

//                         <div className='home_text'>
//                             <div className='home_text_1'>
//                                 {homeData.map((item, i) => (
//                                     <div key={i}>
//                                         <p>{item.text_1}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className='home_text_2'>
//                                 {homeData.map((item, i) => (
//                                     <div key={i}>
//                                         <p>{item.text_2}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;




//остання робоча версія


// import Spinner from '../../spinner/Spinner';
// import { useState, useEffect } from 'react';
// import { Carousel } from 'react-bootstrap';
// import { Helmet } from 'react-helmet-async';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import homeData from '../../../resources/data/Home_db.json';
// import './home.scss';

// const getImagePaths = (isMobile) => {
//     const prefix = isMobile ? 'large' : 'large';
//     return Array.from({ length: 25 }, (_, i) => `/images/home/${prefix}/img_${i + 1}.jpg`);
// };

// const Home = () => {

//     const [isLoading, setIsLoading] = useState(true);
//     const [isMobile, setIsMobile] = useState(undefined);

//     const imageGroups = [
//         [1, 2, 3],
//         [4, 5, 6, 7],
//         [8, 9, 10, 11],
//         [12, 13, 14],
//         [15, 16, 17, 18],
//         [19, 20, 21],
//         [22, 23, 24, 25],
//     ];

//     useEffect(() => {
//         const checkDeviceType = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         checkDeviceType(); // одразу визначити

//         window.addEventListener('resize', checkDeviceType);
//         return () => window.removeEventListener('resize', checkDeviceType);
//     }, []);

//     useEffect(() => {
//         if (isMobile === undefined) return;

//         const imagePaths = getImagePaths(isMobile);

//         const preloadImages = imagePaths.map((src) => {
//             return new Promise((resolve, reject) => {
//                 const img = new Image();
//                 img.src = src;
//                 img.onload = resolve;
//                 img.onerror = reject;
//             });
//         });

//         Promise.all(preloadImages)
//             .then(() => setIsLoading(false))
//             .catch(() => setIsLoading(false));
//     }, [isMobile]);

//     if (isLoading || isMobile === undefined) {
//         return <Spinner />;
//     }


//     return (
//         <>
//             <Helmet>
//                 <title>Volodymyr Sinusik — Artist & Illustrator</title>
//                 <meta
//                     name="description"
//                     content="Welcome to the official website of Volodymyr Sinusik, showcasing his art, exhibitions, biography, and contact information."
//                 />
//                 <meta name="author" content="Volodymyr Sinusik" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />

//                 <meta
//                     name="keywords"
//                     content="Volodymyr Sinusik, artist, paintings, exhibitions, biography, contact"
//                 />

//                 <meta property="og:title" content="Volodymyr Sinusik — Artist & Illustrator" />
//                 <meta
//                     property="og:description"
//                     content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://sinusik.com/" />
//                 <meta
//                     property="og:image"
//                     content="https://sinusik.com/images/home-preview.jpg"
//                 />

//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Volodymyr Sinusik — Artist & Illustrator" />
//                 <meta
//                     name="twitter:description"
//                     content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details."
//                 />
//                 <meta
//                     name="twitter:image"
//                     content="https://sinusik.com/images/home-preview.jpg"
//                 />
//             </Helmet>
//             <div className='home'>
//                 <div className='container'>
//                     <div id='home' className='carousel'>
//                         <h1 className='title'>The Life and Art of Volodymyr Sinusik</h1>
//                         <Carousel>
//                             {imageGroups.map((group, index) => (
//                                 <Carousel.Item key={index} className='carousel_item'>
//                                     {group.map((imgIndex) => (
//                                         <img
//                                             key={imgIndex}
//                                             className={`carousel_img carousel_img_${imgIndex}`}
//                                             src={`/images/home/${isMobile ? 'large' : 'large'}/img_${imgIndex}.jpg`}
//                                             alt={`images ${imgIndex}`}
//                                             loading="lazy"
//                                         />
//                                     ))}
//                                 </Carousel.Item>
//                             ))}
//                         </Carousel>
//                         <div className='home_text'>
//                             <div className='home_text_1'>
//                                 {homeData.map((item, i) => (
//                                     <div key={i}>
//                                         <p>{item.text_1}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className='home_text_2'>
//                                 {homeData.map((item, i) => (
//                                     <div key={i}>
//                                         <p>{item.text_2}</p>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;