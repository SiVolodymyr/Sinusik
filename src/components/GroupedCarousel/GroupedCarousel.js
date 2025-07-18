import React, { useState, useEffect } from 'react';

import { Carousel } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './GroupedCarousel.scss';

const GroupedCarousel = ({ images, classNamePrefix }) => {
    const [groupedImages, setGroupedImages] = useState([]);

    useEffect(() => {
        const groupImages = (images, itemsPerSlide) => {
            const grouped = [];
            for (let i = 0; i < images.length; i += itemsPerSlide) {
                grouped.push(images.slice(i, i + itemsPerSlide));
            }
            return grouped;
        };

        const updateGrouping = () => {
            const isMobile = window.innerWidth <= 576;
            const itemsPerSlide = isMobile ? 1 : 3;
            setGroupedImages(groupImages(images, itemsPerSlide));
        };

        updateGrouping();
        window.addEventListener('resize', updateGrouping);
        return () => window.removeEventListener('resize', updateGrouping);
    }, [images]);

    return (
        <Carousel interval={null} controls={true} indicators={true} className='carousel_lastworks'>
            {groupedImages.map((group, idx) => (
                <Carousel.Item key={idx} className={`${classNamePrefix}_box`}>
                    <div className="d-flex justify-content-center">
                        {group.map((imgIndex) => (
                            <img
                                key={imgIndex}
                                className={`${classNamePrefix}_imgs ${classNamePrefix}_imgs_${imgIndex}`}
                                src={`/images/home/${classNamePrefix}/img_${imgIndex}.jpg`}
                                alt={`images ${imgIndex}`}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    maxWidth: group.length > 1 ? '33.33%' : '90%',
                                    objectFit: 'contain',
                                }}
                            />
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default GroupedCarousel;