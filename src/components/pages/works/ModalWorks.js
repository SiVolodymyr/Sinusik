import { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../../spinner/Spinner';
import './modalWorks.scss';

function ModalWorks({ photos, currentIndex, setCurrentIndex, onClose, bgColor }) {
    const photo = photos[currentIndex];
    const imgRef = useRef(null);
    const [orientation, setOrientation] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);

    const next = useCallback(() => {
        if (currentIndex < photos.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsImageLoading(true);
        }
    }, [currentIndex, photos.length, setCurrentIndex]);

    const prev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setIsImageLoading(true);
        }
    }, [currentIndex, setCurrentIndex]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prev();
            else if (e.key === 'ArrowRight') next();
            else if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [next, prev, onClose]);

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="modalW_overlay"
                onClick={onClose}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                transition={{ duration: 0.3 }}
            >
                <div
                    // className="modalW_content"
                    className={`modalW_content ${orientation}`}
                    style={{ backgroundColor: bgColor }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close_btn" onClick={onClose}>×</button>
                    <div className="modalW_inside">
                        <div className="modalW_image">
                            {isImageLoading ? (
                                <Spinner />
                            ) : null}
                            <motion.img
                                key={photo.src}
                                src={photo.src}
                                alt={photo.title}
                                ref={imgRef}
                                onLoad={() => {
                                    const img = imgRef.current;
                                    if (img) {
                                        const isVertical = img.naturalHeight > img.naturalWidth;
                                        setOrientation(isVertical ? 'vertical' : 'horizontal');
                                    }
                                    setIsImageLoading(false); // ⬅️ Перенесли сюди
                                }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                className={`modalW_img ${orientation}`}
                                initial={{ x: 300, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0 }}
                                transition={{
                                    x: { type: 'spring', stiffness: 3500, damping: 100 },
                                    opacity: { duration: 0.1 }
                                }}
                                style={{ display: isImageLoading ? 'none' : 'block' }} // ⬅️ приховати поки не завантажиться
                            />
                        </div>
                    </div>
                    <div className='modalW_descr'>
                        <div className='modalW_descr_info'>
                            <button className="modalW_descr_l" onClick={prev} disabled={currentIndex === 0}>←</button>
                            <span className="modalW_descr_index">{currentIndex + 1} / {photos.length}</span>
                            <button className="modalW_descr_r" onClick={next} disabled={currentIndex === photos.length - 1}>→</button>
                        </div>
                        <p className="modalW_descr_title">{photo.title}</p>
                        <div className='modalW_descr_wrapper'>
                            <p className="modalW_descr_text">{photo.medium}</p>
                            <p className="modalW_descr_text">{photo.year}</p>
                            <p className="modalW_descr_text">{photo.place}</p>
                            <p className="modalW_descr_text">{photo.size}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ModalWorks;











// import { useEffect, useCallback, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './modalWorks.scss';

// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// function ModalWorks({ photos, currentIndex, setCurrentIndex, onClose, bgColor }) {
//     const photo = photos[currentIndex];
//     const imgRef = useRef(null);
//     const [orientation, setOrientation] = useState(''); // 'vertical' або 'horizontal'

//     const next = useCallback(() => {
//         if (currentIndex < photos.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     }, [currentIndex, photos.length, setCurrentIndex]);

//     const prev = useCallback(() => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     }, [currentIndex, setCurrentIndex]);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'ArrowLeft') prev();
//             else if (e.key === 'ArrowRight') next();
//             else if (e.key === 'Escape') onClose();
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         document.body.style.overflow = 'hidden';

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [next, prev, onClose]);

//     const handleImageLoad = () => {
//         const img = imgRef.current;
//         if (img) {
//             const isVertical = img.naturalHeight > img.naturalWidth;
//             setOrientation(isVertical ? 'vertical' : 'horizontal');
//         }
//     };

//     const handleDragEnd = (event, { offset, velocity }) => {
//         const swipe = swipePower(offset.x, velocity.x);

//         if (swipe < -swipeConfidenceThreshold) {
//             next();
//         } else if (swipe > swipeConfidenceThreshold) {
//             prev();
//         }
//     };

//     return (
//         <div className="modalW_overlay" onClick={onClose}>
//             <div
//                 className="modalW_content"
//                 style={{ backgroundColor: bgColor }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button className="close_btn" onClick={onClose}>×</button>
//                 <div className="modalW_inside">
//                     <div className="modalW_image">
//                         <AnimatePresence mode="wait">
//                             <motion.img
//                                 key={photo.src}
//                                 src={photo.src}
//                                 alt={photo.title}
//                                 ref={imgRef}
//                                 onLoad={handleImageLoad}
//                                 drag="x"
//                                 dragConstraints={{ left: 0, right: 0 }}
//                                 onDragEnd={handleDragEnd}
//                                 initial={{ x: 300, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1 }}
//                                 exit={{ x: -300, opacity: 0 }}
//                                 transition={{
//                                     x: { type: 'spring', stiffness: 3500, damping: 100 },
//                                     opacity: { duration: 0.1 }
//                                 }}
//                                 className={`modalW_img ${orientation}`}
//                             />
//                         </AnimatePresence>
//                     </div>
//                 </div>
//                 <div className='modalW_descr'>
//                     <div className='modalW_descr_info'>
//                         <button className="modalW_descr_l" onClick={prev} disabled={currentIndex === 0}>←</button>
//                         <span className="modalW_descr_index">{currentIndex + 1} / {photos.length}</span>
//                         <button className="modalW_descr_r" onClick={next} disabled={currentIndex === photos.length - 1}>→</button>
//                     </div>
//                     <p className="modalW_descr_title">{photo.title}</p>
//                     <div className='modalW_descr_wrapper'>
//                         <p className="modalW_descr_text">{photo.medium}</p>
//                         <p className="modalW_descr_text">{photo.year}</p>
//                         <p className="modalW_descr_text">{photo.place}</p>
//                         <p className="modalW_descr_text">{photo.size}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ModalWorks;












// import { useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './modalWorks.scss';

// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// function ModalWorks({ photos, currentIndex, setCurrentIndex, onClose, bgColor }) {
//     const photo = photos[currentIndex];

//     const next = useCallback(() => {
//         if (currentIndex < photos.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     }, [currentIndex, photos.length, setCurrentIndex]);

//     const prev = useCallback(() => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     }, [currentIndex, setCurrentIndex]);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'ArrowLeft') prev();
//             else if (e.key === 'ArrowRight') next();
//             else if (e.key === 'Escape') onClose();
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         document.body.style.overflow = 'hidden';

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [next, prev, onClose]);

//     const handleDragEnd = (event, { offset, velocity }) => {
//         const swipe = swipePower(offset.x, velocity.x);

//         if (swipe < -swipeConfidenceThreshold) {
//             next(); // свайп вліво
//         } else if (swipe > swipeConfidenceThreshold) {
//             prev(); // свайп вправо
//         }
//     };

//     return (
//         <div className="modalW_overlay" onClick={onClose}>
//             <div
//                 className="modalW_content"
//                 style={{ backgroundColor: bgColor }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button className="close_btn" onClick={onClose}>×</button>
//                 <div className="modalW_inside">
//                     <div className="modalW_image">
//                         <AnimatePresence mode="wait">
//                             <motion.img
//                                 key={photo.src}
//                                 src={photo.src}
//                                 alt={photo.title}
//                                 drag="x"
//                                 dragConstraints={{ left: 0, right: 0 }}
//                                 onDragEnd={handleDragEnd}
//                                 initial={{ x: 300, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1 }}
//                                 exit={{ x: -300, opacity: 0 }}
//                                 transition={{
//                                     x: { type: 'spring', stiffness: 3500, damping: 100 },
//                                     opacity: { duration: 0.1 }
//                                 }}
//                                 className="modalW_img"
//                             />
//                         </AnimatePresence>
//                     </div>
//                 </div>
//                 <div className='modalW_descr'>
//                     <div className='modalW_descr_info'>
//                         <button className="modalW_descr_l" onClick={prev} disabled={currentIndex === 0}>←</button>
//                         <span className="modalW_descr_index">{currentIndex + 1} / {photos.length}</span>
//                         <button className="modalW_descr_r" onClick={next} disabled={currentIndex === photos.length - 1}>→</button>
//                     </div>
//                     <p className="modalW_descr_title">{photo.title}</p>
//                     <div className='modalW_descr_wrapper'>
//                         <p className="modalW_descr_text">{photo.medium}</p>
//                         <p className="modalW_descr_text">{photo.year}</p>
//                         <p className="modalW_descr_text">{photo.place}</p>
//                         <p className="modalW_descr_text">{photo.size}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ModalWorks;
















// import { useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './modalWorks.scss';

// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// function ModalWorks({ photos, currentIndex, setCurrentIndex, onClose, bgColor }) {
//     const photo = photos[currentIndex];

//     const next = useCallback(() => {
//         if (currentIndex < photos.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     }, [currentIndex, photos.length, setCurrentIndex]);

//     const prev = useCallback(() => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     }, [currentIndex, setCurrentIndex]);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'ArrowLeft') prev();
//             else if (e.key === 'ArrowRight') next();
//             else if (e.key === 'Escape') onClose();
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         document.body.style.overflow = 'hidden';

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [next, prev, onClose]);

//     const handleDragEnd = (event, { offset, velocity }) => {
//         const swipe = swipePower(offset.x, velocity.x);

//         if (swipe < -swipeConfidenceThreshold) {
//             next(); // свайп вліво
//         } else if (swipe > swipeConfidenceThreshold) {
//             prev(); // свайп вправо
//         }
//     };

//     return (
//         <div className="modalW_overlay" onClick={onClose}>
//             <div
//                 className="modalW_content"
//                 style={{ backgroundColor: bgColor }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button className="close_btn" onClick={onClose}>×</button>
//                 <div className="modalW_inside">
//                     <div className="modalW_image">
//                         <AnimatePresence mode="wait">
//                             <motion.img
//                                 key={photo.src}
//                                 src={photo.src}
//                                 alt={photo.title}
//                                 drag="x"
//                                 dragConstraints={{ left: 0, right: 0 }}
//                                 onDragEnd={handleDragEnd}
//                                 initial={{ x: 300, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1 }}
//                                 exit={{ x: -300, opacity: 0 }}
//                                 transition={{
//                                     x: { type: 'spring', stiffness: 3500, damping: 100 },
//                                     opacity: { duration: 0.1 }
//                                 }}
//                                 className="modalW_img"
//                             />
//                         </AnimatePresence>
//                     </div>
//                 </div>
//                 <div className='modalW_descr'>
//                     <div className='modalW_descr_info'>
//                         <button className="modalW_descr_l" onClick={prev} disabled={currentIndex === 0}>←</button>
//                         <span className="modalW_descr_index">{currentIndex + 1} / {photos.length}</span>
//                         <button className="modalW_descr_r" onClick={next} disabled={currentIndex === photos.length - 1}>→</button>
//                     </div>
//                     <p className="modalW_descr_title">{photo.title}</p>
//                     <div className='modalW_descr_wrapper'>
//                         <p className="modalW_descr_text">{photo.medium}</p>
//                         <p className="modalW_descr_text">{photo.year}</p>
//                         <p className="modalW_descr_text">{photo.place}</p>
//                         <p className="modalW_descr_text">{photo.size}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ModalWorks;





// import { useEffect, useCallback } from 'react';
// import './modalWorks.scss'; // стилі за бажанням

// function ModalWorks({ photos, currentIndex, setCurrentIndex, onClose, bgColor }) {
//     const photo = photos[currentIndex];

//     const next = useCallback(() => {
//         if (currentIndex < photos.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     }, [currentIndex, photos.length, setCurrentIndex]);

//     const prev = useCallback(() => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     }, [currentIndex, setCurrentIndex]);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.key === 'ArrowLeft') {
//                 prev();
//             } else if (e.key === 'ArrowRight') {
//                 next();
//             } else if (e.key === 'Escape') {
//                 onClose();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [next, prev, onClose]);

//     return (
//         <div className="modalW_overlay" onClick={onClose}>
//             <div
//                 className="modalW_content"
//                 style={{ backgroundColor: bgColor }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button className="close_btn" onClick={onClose}>×</button>
//                 <div className="modalW_inside">
//                     <div className="modalW_image">
//                         <img src={photo.src} alt={photo.title} />
//                     </div>
//                     <div className="modalW_info">
//                         <button className="modalW_l" onClick={prev} disabled={currentIndex === 0}>←</button>
//                         <span className="modalW_caption">{currentIndex + 1} / {photos.length}</span>
//                         <button className="modalW_r" onClick={next} disabled={currentIndex === photos.length - 1}>→</button>
//                     </div>
//                 </div>
//                 <p className="photo_title">{photo.title}</p>
//                 <p className="photo_medium">{photo.medium}</p>
//                 <p className="photo_year">{photo.year}</p>
//                 <p className="photo_place">{photo.place}</p>
//                 <p className="photo_size">{photo.size}</p>
//             </div>
//         </div>
//     );
// }

// export default ModalWorks;
