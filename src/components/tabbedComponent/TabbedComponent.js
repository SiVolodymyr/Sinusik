import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ModalNew from '../../components/modal/ModalNew';
import Spinner from '../../components/spinner/Spinner';

const slugify = (text) =>
    text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

const TabbedComponent = ({
    data,
    worksData,
    additionalImageMap,
    routePrefix,
    bgColor,
    classNames = {},
    meta = {}
}) => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const index = data.findIndex((tab) => slugify(tab.tab) === slug);
        setActiveTab(index !== -1 ? index : 0);
    }, [slug, data]);

    const currentTabData = data[activeTab];

    const mainImages = useMemo(() => {
        return currentTabData.images.map((img) => ({
            ...img,
            src: `/images/${img.src}`,
        }));
    }, [currentTabData]);

    const additionalImages = useMemo(() => {
        return worksData
            .filter((img) => additionalImageMap[activeTab]?.includes(img.id))
            .map((img) => ({
                ...img,
                src: `/images/${img.src}`,
            }));
    }, [activeTab, worksData, additionalImageMap]);

    const mergedImages = useMemo(() => {
        return [...mainImages, ...additionalImages];
    }, [mainImages, additionalImages]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + mergedImages.length) % mergedImages.length);
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % mergedImages.length);
    };

    useEffect(() => {
        setIsLoading(true);

        const preload = mergedImages.map((img) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = img.src;
                image.onload = resolve;
                image.onerror = reject;
            });
        });

        Promise.all(preload)
            .then(() => setIsLoading(false))
            .catch((err) => {
                console.error('Image preload error', err);
                setIsLoading(false);
            });
    }, [mergedImages]);

    const {
        wrapper = '',
        tabs = '',
        tab = '',
        tabActive = 'active',
        content = '',
        title = '',
        descr = '',
        imagesWrap = '',
        imgItem = ''
    } = classNames;

    return (
        <>
            <Helmet>
                <title>{meta.title || 'Tabbed View'}</title>
                <meta name="description" content={meta.description} />
                <meta name="keywords" content={meta.keywords} />
                <meta name="author" content={meta.author} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                {/* Open Graph */}
                <meta property="og:title" content={meta.ogTitle} />
                <meta property="og:description" content={meta.ogDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={meta.ogUrl} />
                <meta property="og:image" content={meta.ogImage} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={meta.twitterTitle} />
                <meta name="twitter:description" content={meta.twitterDescription} />
                <meta name="twitter:image" content={meta.twitterImage} />
            </Helmet>

            <div className={routePrefix}>
                <div className="container">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className={wrapper}>
                            <ul className={tabs}>
                                {data.map((t, i) => (
                                    <li className='periods_tab' key={i}>
                                        <Link
                                            to={`/${routePrefix}/${slugify(t.tab)}`}
                                            className={`${tab} ${activeTab === i ? tabActive : ''}`}
                                        >
                                            {t.tab}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className={content}>
                                <p className={title}>{currentTabData.tab}</p>
                                <div className={descr}>
                                    {currentTabData.paragraphs.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>
                                <div className={imagesWrap}>
                                    {mergedImages.map((img, i) => (
                                        <div key={`${img.id}-${i}`} className={imgItem}>
                                            <img
                                                src={img.src}
                                                alt={`photos ${img.id}`}
                                                onClick={() => handleImageClick(i)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {mergedImages[currentImageIndex] && (
                                <ModalNew
                                    bgColor={bgColor}
                                    isOpen={isModalOpen}
                                    photo={mergedImages[currentImageIndex]}
                                    currentIndex={currentImageIndex}
                                    total={mergedImages.length}
                                    onClose={() => setModalOpen(false)}
                                    onPrev={handlePrev}
                                    onNext={handleNext}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TabbedComponent;








// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import ModalNew from '../../components/modal/ModalNew';
// import Spinner from '../../components/spinner/Spinner';

// const slugify = (text) =>
//     text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');

// const TabbedComponent = ({
//     data,
//     routePrefix,
//     bgColor,
//     getExtraImages = () => [],
//     classNames = {},
//     meta = {}
// }) => {
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const activeTab = useMemo(() => {
//         const index = data.findIndex((tab) => slugify(tab.tab) === slug);
//         return index !== -1 ? index : 0;
//     }, [slug, data]);

//     const currentTabData = data[activeTab];

//     const mainImages = useMemo(() => {
//         return currentTabData.images.map((img) => ({
//             ...img,
//             src: `/images/${img.src}`,
//         }));
//     }, [currentTabData]);

//     const extraImages = useMemo(() => {
//         const images = getExtraImages(activeTab);
//         return Array.isArray(images)
//             ? images.map((img) => ({ ...img, src: `/images/${img.src}` }))
//             : [];
//     }, [getExtraImages, activeTab]);

//     const allImages = useMemo(() => [...mainImages, ...extraImages], [mainImages, extraImages]);

//     const [isModalOpen, setModalOpen] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);

//     const handleImageClick = (index) => {
//         setCurrentImageIndex(index);
//         setModalOpen(true);
//     };

//     const handlePrev = () => {
//         setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
//     };

//     const handleNext = () => {
//         setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
//     };

//     const handleTabClick = (index) => {
//         const newSlug = slugify(data[index].tab);
//         navigate(`/${routePrefix}/${newSlug}`);
//     };

//     useEffect(() => {
//         setIsLoading(true);

//         const preload = allImages.map((img) => {
//             return new Promise((resolve, reject) => {
//                 const image = new Image();
//                 image.src = img.src;
//                 image.onload = resolve;
//                 image.onerror = reject;
//             });
//         });

//         Promise.all(preload)
//             .then(() => setIsLoading(false))
//             .catch((err) => {
//                 console.error('Image preload error', err);
//                 setIsLoading(false);
//             });
//     }, [allImages]);

//     const {
//         wrapper = '',
//         tabs = '',
//         tab = '',
//         tabActive = 'active',
//         content = '',
//         title = '',
//         descr = '',
//         imagesWrap = '',
//         imgItem = ''
//     } = classNames;

//     return (
//         <>
//             <Helmet>
//                 <title>{meta.title || 'Tabbed View'}</title>
//                 <meta name="description" content={meta.description} />
//                 <meta name="keywords" content={meta.keywords} />
//                 <meta name="author" content={meta.author} />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />

//                 {/* Open Graph */}
//                 <meta property="og:title" content={meta.ogTitle} />
//                 <meta property="og:description" content={meta.ogDescription} />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content={meta.ogUrl} />
//                 <meta property="og:image" content={meta.ogImage} />

//                 {/* Twitter */}
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content={meta.twitterTitle} />
//                 <meta name="twitter:description" content={meta.twitterDescription} />
//                 <meta name="twitter:image" content={meta.twitterImage} />
//             </Helmet>

//             <div className={routePrefix}>
//                 <div className="container">
//                     <div className={wrapper}>
//                         {isLoading ? (
//                             <Spinner />
//                         ) : (
//                             <>
//                                 <ul className={tabs}>
//                                     {data.map((t, i) => (
//                                         <li className='periods_tab' key={i}>
//                                             <Link
//                                                 to={`/${routePrefix}/${slugify(t.tab)}`}
//                                                 type="button"
//                                                 className={`${tab} ${activeTab === i ? tabActive : ''}`}
//                                                 onClick={() => handleTabClick(i)}
//                                             >
//                                                 {t.tab}
//                                             </Link>
//                                         </li>
//                                     ))}
//                                 </ul>

//                                 <div className={content}>
//                                     <p className={title}>{currentTabData.tab}</p>
//                                     <div className={descr}>
//                                         {currentTabData.paragraphs.map((p, i) => (
//                                             <p key={i}>{p}</p>
//                                         ))}
//                                     </div>
//                                     <div className={imagesWrap}>
//                                         {allImages.map((img, i) => (
//                                             <div key={`${img.id}-${i}`} className={imgItem}>
//                                                 <img
//                                                     src={img.src}
//                                                     alt={`photos ${img.id}`}
//                                                     onClick={() => handleImageClick(i)}
//                                                 />
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {allImages[currentImageIndex] && (
//                                     <ModalNew
//                                         bgColor={bgColor}
//                                         isOpen={isModalOpen}
//                                         photo={allImages[currentImageIndex]}
//                                         currentIndex={currentImageIndex}
//                                         total={allImages.length}
//                                         onClose={() => setModalOpen(false)}
//                                         onPrev={handlePrev}
//                                         onNext={handleNext}
//                                     />
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TabbedComponent;