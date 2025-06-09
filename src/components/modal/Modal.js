import { useEffect, useRef, useState } from 'react';
import Spinner from '../spinner/Spinner';
import './modal.scss';

const Modal = ({ isOpen, photo, currentIndex, total, onClose, onPrev, onNext, bgColor }) => {
    const imgRef = useRef(null);
    const [orientation, setOrientation] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [touchStartX, setTouchStartX] = useState(null);

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

    const handleTouchStart = (e) => {
        setTouchStartX(e.changedTouches[0].clientX);
    };

    const handleTouchEnd = (e) => {

        if (touchStartX !== null) {
            const deltaX = touchStartX - e.changedTouches[0].clientX;

            if (Math.abs(deltaX) > 50) { // Чутливість свайпу
                if (deltaX > 0) {
                    onNext(); // свайп вліво
                } else {
                    onPrev(); // свайп вправо
                }
            }

            // Очистити після свайпу
            setTouchStartX(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal_overlay" onClick={onClose}>
            <div
                className={`modal_content ${orientation}`}
                style={{ backgroundColor: bgColor }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <button className="close_btn" onClick={onClose}>×</button>

                <div className="modal_inside">
                    <div className={`modal_image ${orientation}`}>
                        {isImageLoading && <Spinner />}
                        <img
                            src={photo.src}
                            alt={photo.title}
                            ref={imgRef}
                            onLoad={handleImageLoad}
                            className={`modal_img ${orientation}`}
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
            </div>
        </div>
    );
};

export default Modal;




// import { useEffect, useRef, useState } from 'react';
// import Spinner from '../spinner/Spinner';
// import './modal.scss';

// const Modal = ({ isOpen, photo, currentIndex, total, onClose, onPrev, onNext, bgColor }) => {
//     const imgRef = useRef(null);
//     const [orientation, setOrientation] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (!isOpen) return;
//             if (e.key === 'ArrowLeft') onPrev();
//             else if (e.key === 'ArrowRight') onNext();
//             else if (e.key === 'Escape') onClose();
//         };

//         if (isOpen) {
//             window.addEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = 'hidden';
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [isOpen, onPrev, onNext, onClose]);

//     useEffect(() => {
//         setIsImageLoading(true);
//     }, [photo]);

//     const handleImageLoad = () => {
//         const img = imgRef.current;
//         if (img) {
//             const isVertical = img.naturalHeight > img.naturalWidth;
//             setOrientation(isVertical ? 'vertical' : 'horizontal');
//         }
//         setIsImageLoading(false);
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="modal_overlay" onClick={onClose}>
//             <div
//                 className={`modal_content ${orientation}`}
//                 style={{ backgroundColor: bgColor }}
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button className="close_btn" onClick={onClose}>×</button>

//                 <div className="modal_inside">
//                     <div className={`modal_image ${orientation}`}>
//                         {isImageLoading && <Spinner />}
//                         <img
//                             src={photo.src}
//                             alt={photo.title}
//                             ref={imgRef}
//                             onLoad={handleImageLoad}
//                             className={`modal_img ${orientation}`}
//                             style={{ display: isImageLoading ? 'none' : 'block' }}
//                         />
//                     </div>
//                 </div>

//                 <div className="modal_descr">
//                     <div className="modal_descr_info">
//                         <button className="modal_descr modal_descr_l" style={{ backgroundColor: bgColor }} onClick={onPrev}>←</button>
//                         <span className="modal_descr_index">{currentIndex + 1} / {total}</span>
//                         <button className="modal_descr modal_descr_r" style={{ backgroundColor: bgColor }} onClick={onNext}>→</button>
//                     </div>
//                     <p className="modal_descr_title">{photo.title}</p>
//                     <div className="modal_descr_wrapper">
//                         <p className="photo_medium">{photo.medium}</p>
//                         <p className="photo_year">{photo.year}</p>
//                         <p className="photo_place">{photo.place}</p>
//                         <p className="photo_size">{photo.size}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;

//код зверху правильне розміщення, стрілки працюють немає свайпів і зумів




// import { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
// import Spinner from '../spinner/Spinner';
// import './modal.scss';

// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// const Modal = ({ isOpen, photo, currentIndex, total, onClose, onPrev, onNext, bgColor }) => {
//     const imgRef = useRef(null);
//     const [orientation, setOrientation] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);
//     const [dragEnabled, setDragEnabled] = useState(true);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (!isOpen) return;
//             if (e.key === 'ArrowLeft') onPrev();
//             else if (e.key === 'ArrowRight') onNext();
//             else if (e.key === 'Escape') onClose();
//         };

//         if (isOpen) {
//             window.addEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = 'hidden';
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [isOpen, onPrev, onNext, onClose]);

//     useEffect(() => {
//         setIsImageLoading(true);
//     }, [photo]);

//     const handleImageLoad = () => {
//         const img = imgRef.current;
//         if (img) {
//             const isVertical = img.naturalHeight > img.naturalWidth;
//             setOrientation(isVertical ? 'vertical' : 'horizontal');
//         }
//         setIsImageLoading(false);
//     };

//     const handleDragEnd = (e, { offset, velocity }) => {
//         const swipe = swipePower(offset.x, velocity.x);
//         if (swipe < -swipeConfidenceThreshold) onNext();
//         else if (swipe > swipeConfidenceThreshold) onPrev();
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="modal_overlay"
//                     onClick={onClose}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className={`modal_content ${orientation}`}
//                         style={{ backgroundColor: bgColor }}
//                         onClick={(e) => e.stopPropagation()}
//                         initial={{ y: 50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         exit={{ y: 50, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <button className="close_btn" onClick={onClose}>×</button>

//                         <div className="modal_inside">
//                             <div className={`modal_image ${orientation}`}>
//                                 {isImageLoading && <Spinner />}
//                                 <TransformWrapper
//                                     wheel={{ disabled: true }} // вимкнути зум за допомогою колеса миші
//                                     pinch={{ disabled: false }} // увімкнути зум за допомогою жестів
//                                     doubleClick={{ disabled: true }} // вимкнути зум за допомогою подвійного кліку
//                                     onZoomStart={() => setDragEnabled(false)}
//                                     onZoomStop={() => setDragEnabled(true)}
//                                     onPanningStart={() => setDragEnabled(false)}
//                                     onPanningStop={() => setDragEnabled(true)}
//                                     minScale={1}
//                                     maxScale={3}
//                                 >
//                                     <TransformComponent>
//                                         <motion.img
//                                             key={photo.src}
//                                             src={photo.src}
//                                             alt={photo.title}
//                                             ref={imgRef}
//                                             onLoad={handleImageLoad}
//                                             className={`modal_img ${orientation}`}
//                                             drag={dragEnabled ? 'x' : false}
//                                             dragConstraints={{ left: 0, right: 0 }}
//                                             onDragEnd={handleDragEnd}
//                                             style={{ display: isImageLoading ? 'none' : 'block' }}
//                                         />
//                                     </TransformComponent>
//                                 </TransformWrapper>
//                             </div>
//                         </div>

//                         <div className="modal_descr">
//                             <div className="modal_descr_info">
//                                 <button className="modal_descr modal_descr_l" style={{ backgroundColor: bgColor }} onClick={onPrev}>←</button>
//                                 <span className="modal_descr_index">{currentIndex + 1} / {total}</span>
//                                 <button className="modal_descr modal_descr_r" style={{ backgroundColor: bgColor }} onClick={onNext}>→</button>
//                             </div>
//                             <p className="modal_descr_title">{photo.title}</p>
//                             <div className="modal_descr_wrapper">
//                                 <p className="photo_medium">{photo.medium}</p>
//                                 <p className="photo_year">{photo.year}</p>
//                                 <p className="photo_place">{photo.place}</p>
//                                 <p className="photo_size">{photo.size}</p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default Modal;







// import { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
// import Spinner from '../spinner/Spinner';
// import './modal.scss';

// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// const Modal = ({ isOpen, photo, currentIndex, total, onClose, onPrev, onNext, bgColor }) => {
//     const imgRef = useRef(null);
//     const [orientation, setOrientation] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);
//     const [dragEnabled, setDragEnabled] = useState(true);
//     const transformRef = useRef(null);

//     const touchStart = useRef({ x: 0, y: 0 });
//     const touchMoved = useRef({ x: 0, y: 0 });

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (!isOpen) return;
//             if (e.key === 'ArrowLeft') onPrev();
//             else if (e.key === 'ArrowRight') onNext();
//             else if (e.key === 'Escape') onClose();
//         };

//         if (isOpen) {
//             window.addEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = 'hidden';
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [isOpen, onPrev, onNext, onClose]);

//     useEffect(() => {
//         setIsImageLoading(true);

//         if (transformRef.current) {
//             transformRef.current.resetTransform();
//         }
//     }, [photo]);

//     const handleImageLoad = () => {
//         const img = imgRef.current;
//         if (img) {
//             const isVertical = img.naturalHeight > img.naturalWidth;
//             setOrientation(isVertical ? 'vertical' : 'horizontal');
//         }
//         setIsImageLoading(false);
//     };

//     const handleDragEnd = (e, { offset, velocity }) => {
//         const swipe = swipePower(offset.x, velocity.x);
//         if (swipe < -swipeConfidenceThreshold) onNext();
//         else if (swipe > swipeConfidenceThreshold) onPrev();
//     };

//     const handleTouchStart = (e) => {
//         const touch = e.touches[0];
//         touchStart.current = { x: touch.clientX, y: touch.clientY };
//         touchMoved.current = { x: 0, y: 0 };
//         setDragEnabled(true); // спочатку drag дозволений
//     };

//     const handleTouchMove = (e) => {
//         const touch = e.touches[0];
//         touchMoved.current = {
//             x: touch.clientX - touchStart.current.x,
//             y: touch.clientY - touchStart.current.y,
//         };

//         // Якщо вертикальний рух більший за горизонтальний — вимикаємо drag
//         if (Math.abs(touchMoved.current.y) > Math.abs(touchMoved.current.x)) {
//             setDragEnabled(false);
//         } else {
//             setDragEnabled(true);
//         }
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="modal_overlay"
//                     onClick={onClose}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className={`modal_content ${orientation}`}
//                         style={{ backgroundColor: bgColor }}
//                         onClick={(e) => e.stopPropagation()}
//                         initial={{ y: 50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         exit={{ y: 50, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <button className="close_btn" onClick={onClose}>×</button>

//                         <div className="modal_inside">
//                             <div className={`modal_image ${orientation}`}
//                                 onTouchStart={handleTouchStart}
//                                 onTouchMove={handleTouchMove}
//                             >
//                                 {isImageLoading && <Spinner />}

//                                 <TransformWrapper
//                                     ref={transformRef}
//                                     wheel={{ disabled: true }} // опціонально, якщо не хочеш zoom через колесо миші
//                                     pinch={{ disabled: false }}
//                                     doubleClick={{ disabled: true }}
//                                     onZoomStart={() => setDragEnabled(false)}
//                                     onZoomStop={() => setDragEnabled(true)}
//                                     onPanningStart={() => setDragEnabled(false)}
//                                     onPanningStop={() => setDragEnabled(true)}
//                                     minScale={1}
//                                     maxScale={3}
//                                 >
//                                     <TransformComponent>
//                                         <motion.img
//                                             key={photo.src}
//                                             src={photo.src}
//                                             alt={photo.title}
//                                             ref={imgRef}
//                                             onLoad={handleImageLoad}
//                                             drag={dragEnabled ? 'x' : false}
//                                             dragConstraints={{ left: 0, right: 0 }}
//                                             dragElastic={0.2}
//                                             onDragEnd={handleDragEnd}
//                                             className={`modal_img ${orientation}`}
//                                             initial={{ x: 300, opacity: 0 }}
//                                             animate={{ x: 0, opacity: 1 }}
//                                             exit={{ x: -300, opacity: 0 }}
//                                             transition={{
//                                                 x: { type: 'spring', stiffness: 3500, damping: 100 },
//                                                 opacity: { duration: 0.1 }
//                                             }}
//                                             style={{ display: isImageLoading ? 'none' : 'block' }}
//                                         />
//                                     </TransformComponent>
//                                 </TransformWrapper>
//                             </div>
//                         </div>

//                         <div className="modal_descr">
//                             <div className="modal_descr_info">
//                                 <button className="modal_descr modal_descr_l" style={{ backgroundColor: bgColor }} onClick={onPrev}>←</button>
//                                 <span className="modal_descr_index">{currentIndex + 1} / {total}</span>
//                                 <button className="modal_descr modal_descr_r" style={{ backgroundColor: bgColor }} onClick={onNext}>→</button>
//                             </div>
//                             <p className="modal_descr_title">{photo.title}</p>
//                             <div className="modal_descr_wrapper">
//                                 <p className="photo_medium">{photo.medium}</p>
//                                 <p className="photo_year">{photo.year}</p>
//                                 <p className="photo_place">{photo.place}</p>
//                                 <p className="photo_size">{photo.size}</p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default Modal;






// import { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Spinner from '../spinner/Spinner';
// import './modal.scss';

// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

// const Modal = ({ isOpen, photo, currentIndex, total, onClose, onPrev, onNext, bgColor }) => {
//     const imgRef = useRef(null);
//     const [orientation, setOrientation] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (!isOpen) return;
//             if (e.key === 'ArrowLeft') onPrev();
//             else if (e.key === 'ArrowRight') onNext();
//             else if (e.key === 'Escape') onClose();
//         };

//         if (isOpen) {
//             window.addEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = 'hidden';
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             document.body.style.overflow = '';
//         };
//     }, [isOpen, onPrev, onNext, onClose]);

//     useEffect(() => {
//         setIsImageLoading(true);
//     }, [photo]);

//     const handleImageLoad = () => {
//         const img = imgRef.current;
//         if (img) {
//             const isVertical = img.naturalHeight > img.naturalWidth;
//             setOrientation(isVertical ? 'vertical' : 'horizontal');
//         }
//         setIsImageLoading(false);
//     };

//     const handleDragEnd = (e, { offset, velocity }) => {
//         const swipe = swipePower(offset.x, velocity.x);
//         if (swipe < -swipeConfidenceThreshold) onNext();
//         else if (swipe > swipeConfidenceThreshold) onPrev();
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     className="modal_overlay"
//                     onClick={onClose}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className={`modal_content ${orientation}`}
//                         style={{ backgroundColor: bgColor }}
//                         onClick={(e) => e.stopPropagation()}
//                         initial={{ y: 50, opacity: 0 }}
//                         animate={{ y: 0, opacity: 1 }}
//                         exit={{ y: 50, opacity: 0 }}
//                         transition={{ duration: 0.3 }}
//                     >
//                         <button className="close_btn" onClick={onClose}>×</button>

//                         <div className="modal_inside">
//                             <div className={`modal_image ${orientation}`}>
//                                 {isImageLoading && <Spinner />}
//                                 <motion.img
//                                     key={photo.src}
//                                     src={photo.src}
//                                     alt={photo.title}
//                                     ref={imgRef}
//                                     onLoad={handleImageLoad}
//                                     className={`modal_img ${orientation}`}
//                                     drag="x"
//                                     dragConstraints={{ left: 0, right: 0 }}
//                                     onDragEnd={handleDragEnd}
//                                     initial={{ x: 300, opacity: 0 }}
//                                     animate={{ x: 0, opacity: 1 }}
//                                     exit={{ x: -300, opacity: 0 }}
//                                     transition={{
//                                         x: { type: 'spring', stiffness: 3500, damping: 100 },
//                                         opacity: { duration: 0.1 }
//                                     }}
//                                     style={{ display: isImageLoading ? 'none' : 'block' }}
//                                 />
//                             </div>
//                         </div>

//                         <div className="modal_descr">
//                             <div className="modal_descr_info">
//                                 <button className="modal_descr modal_descr_l" style={{ backgroundColor: bgColor }} onClick={onPrev}>←</button>
//                                 <span className="modal_descr_index">{currentIndex + 1} / {total}</span>
//                                 <button className="modal_descr modal_descr_r" style={{ backgroundColor: bgColor }} onClick={onNext}>→</button>
//                             </div>
//                             <p className="modal_descr_title">{photo.title}</p>
//                             <div className="modal_descr_wrapper">
//                                 <p className="photo_medium">{photo.medium}</p>
//                                 <p className="photo_year">{photo.year}</p>
//                                 <p className="photo_place">{photo.place}</p>
//                                 <p className="photo_size">{photo.size}</p>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default Modal;