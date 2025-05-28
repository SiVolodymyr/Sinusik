import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import exhibitionsData from '../../../resources/data/Exhibitions_db.json';
import Modal from '../../modal/Modal';
import Spinner from '../../spinner/Spinner';
import './exhibitions.scss';

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const Exhibitions = ({ bgColor }) => {

    const { exhibitionSlug } = useParams();
    const navigate = useNavigate();

    const activeTab = useMemo(() => {
        const index = exhibitionsData.findIndex(
            (tab) => slugify(tab.tab) === exhibitionSlug
        );
        return index !== -1 ? index : 0;
    }, [exhibitionSlug]);

    const currentTabData = exhibitionsData[activeTab];

    const [isModalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const images = useMemo(() => {
        return currentTabData.images.map((img) => ({
            ...img,
            src: `/images/${img.src}`,
        }));
    }, [currentTabData]);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handleTabClick = (index) => {
        const slug = slugify(exhibitionsData[index].tab);
        navigate(`/exhibitions/${slug}`);
    };

    useEffect(() => {
        setIsLoading(true);

        const preloadImages = images.map((img) => {
            return new Promise((resolve, reject) => {
                const image = new Image();
                image.src = img.src;
                image.onload = resolve;
                image.onerror = reject;
            });
        });

        Promise.all(preloadImages)
            .then(() => setIsLoading(false))
            .catch((err) => {
                console.error('Failed to preload some images', err);
                setIsLoading(false);
            });
    }, [images]);

    return (
        <>
            <Helmet>
                <title>Exhibitions — Volodymyr Sinusik</title>
                <meta
                    name="description"
                    content="Explore the art exhibitions of Volodymyr Sinusik. See photos and details from past shows, gallery events, and international art presentations."
                />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta
                    name="keywords"
                    content="Volodymyr Sinusik, art exhibitions, Ukrainian artist, painting exhibitions, art gallery, modern art shows"
                />

                <meta name="author" content="Volodymyr Sinusik" />

                <meta property="og:title" content="Exhibitions — Volodymyr Sinusik" />
                <meta
                    property="og:description"
                    content="Browse exhibitions by Volodymyr Sinusik. Discover photos from galleries and shows across Ukraine and beyond."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sinusik.com/exhibitions" />
                <meta
                    property="og:image"
                    content="https://sinusik.com/images/exhibitions-preview.jpg"
                />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Exhibitions — Volodymyr Sinusik" />
                <meta
                    name="twitter:description"
                    content="View exhibitions and events of Volodymyr Sinusik with photo archives and show details."
                />
                <meta
                    name="twitter:image"
                    content="https://sinusik.com/images/exhibitions-preview.jpg"
                />
            </Helmet>
            <div className="exhibitions">
                <div className="container">
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className="exhibitions_wrapper">
                            <div className="exhibitions_tabs">
                                {exhibitionsData.map((tab, index) => (
                                    <div className="exhibitions_tab" key={index}>
                                        <div
                                            type="button"
                                            className={`exhibitions_tab ${activeTab === index ? 'active' : ''
                                                }`}
                                            onClick={() => handleTabClick(index)}
                                        >
                                            {tab.tab}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="exhibitions_contents">
                                <p className="exhibitions_title">{currentTabData.tab}</p>
                                <div className="exhibitions_descr">
                                    {currentTabData.paragraphs.map((text, index) => (
                                        <p key={index}>{text}</p>
                                    ))}
                                </div>
                                <div className="exhibitions_images">
                                    {images.map((img, index) => (
                                        <div className="exhibitions_img" key={img.id}>
                                            <img
                                                src={img.src}
                                                alt={`photos ${img.id}`}
                                                onClick={() => handleImageClick(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Modal
                                bgColor={bgColor}
                                isOpen={isModalOpen}
                                photo={images[currentImageIndex]}
                                currentIndex={currentImageIndex}
                                total={images.length}
                                onClose={() => setModalOpen(false)}
                                onPrev={handlePrev}
                                onNext={handleNext}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Exhibitions;