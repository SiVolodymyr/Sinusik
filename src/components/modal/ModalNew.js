import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../spinner/Spinner';
import './modalNew.scss';

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const ModalNew = ({ isOpen, photos = [], currentIndex, setCurrentIndex, onClose, bgColor }) => {
    const imgRef = useRef(null);
    const [orientation, setOrientation] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);

    const photo = photos[currentIndex];

    const handleNext = useCallback(() => {
        if (currentIndex < photos.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsImageLoading(true);
        }
    }, [currentIndex, photos.length, setCurrentIndex]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsImageLoading(true);
        }
    }, [currentIndex, setCurrentIndex]);

    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'ArrowLeft') handlePrev();
        else if (e.key === 'ArrowRight') handleNext();
        else if (e.key === 'Escape') onClose();
    }, [isOpen, handlePrev, handleNext, onClose]);

    const handleImageLoad = () => {
        const img = imgRef.current;
        if (img) {
            const isVertical = img.naturalHeight > img.naturalWidth;
            setOrientation(isVertical ? 'vertical' : 'horizontal');
        }
        setIsImageLoading(false);
    };

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) handleNext();
        else if (swipe > swipeConfidenceThreshold) handlePrev();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleKeyDown]);

    useEffect(() => {
        setIsImageLoading(true);
    }, [photo]);

    return (
        <AnimatePresence>
            {isOpen && photo && (
                <motion.div
                    className="modal_overlay"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`modal_content ${orientation}`}
                        style={{ backgroundColor: bgColor }}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="close_btn" onClick={onClose}>×</button>

                        <div className="modal_inside">
                            <div className="modal_image">
                                {isImageLoading && <Spinner />}
                                <motion.img
                                    key={photo.src}
                                    src={photo.src}
                                    alt={photo.title}
                                    ref={imgRef}
                                    onLoad={handleImageLoad}
                                    className={`modal_img ${orientation}`}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={handleDragEnd}
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -300, opacity: 0 }}
                                    transition={{
                                        x: { type: 'spring', stiffness: 3500, damping: 100 },
                                        opacity: { duration: 0.1 }
                                    }}
                                    style={{ display: isImageLoading ? 'none' : 'block' }}
                                />
                            </div>
                        </div>

                        <div className="modal_descr">
                            <div className="modal_descr_info">
                                <button className="modal_btn modal_btn_left" onClick={handlePrev} disabled={currentIndex === 0}>←</button>
                                <span className="modal_descr_index">{currentIndex + 1} / {photos.length}</span>
                                <button className="modal_btn modal_btn_right" onClick={handleNext} disabled={currentIndex === photos.length - 1}>→</button>
                            </div>
                            <p className="modal_descr_title">{photo.title}</p>
                            <div className="modal_descr_wrapper">
                                <p className="modal_descr_text">{photo.medium}</p>
                                <p className="modal_descr_text">{photo.year}</p>
                                <p className="modal_descr_text">{photo.place}</p>
                                <p className="modal_descr_text">{photo.size}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalNew;