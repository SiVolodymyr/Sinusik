import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../spinner/Spinner';
import './modal.scss';

const swipeConfidenceThreshold = 100;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Modal = ({ isOpen, photo, currentIndex, total, onClose, onPrev, onNext, bgColor }) => {
    const imgRef = useRef(null);
    const [orientation, setOrientation] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;
            if (e.key === 'ArrowLeft') onPrev();
            else if (e.key === 'ArrowRight') onNext();
            else if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onPrev, onNext, onClose]);

    useEffect(() => {
        setIsImageLoading(true);
    }, [photo]);

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
        if (swipe < -swipeConfidenceThreshold) onNext();
        else if (swipe > swipeConfidenceThreshold) onPrev();
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                            <div className={`modal_image ${orientation}`}>
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
                                <button className="modal_descr modal_descr_l" style={{ backgroundColor: bgColor }} onClick={onPrev}>←</button>
                                <span className="modal_descr_index">{currentIndex + 1} / {total}</span>
                                <button className="modal_descr modal_descr_r" style={{ backgroundColor: bgColor }} onClick={onNext}>→</button>
                            </div>
                            <p className="modal_descr_title">{photo.title}</p>
                            <div className="modal_descr_wrapper">
                                <p className="photo_medium">{photo.medium}</p>
                                <p className="photo_year">{photo.year}</p>
                                <p className="photo_place">{photo.place}</p>
                                <p className="photo_size">{photo.size}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;