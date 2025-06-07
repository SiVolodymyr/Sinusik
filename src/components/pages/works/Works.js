import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Modal from '../../modal/Modal'; // Імпортуємо нову модалку
import Spinner from '../../spinner/Spinner';
import './works.scss';

function Works({ bgColor }) {
    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [filters, setFilters] = useState({ years: [], genres: [], places: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        fetch('/resources/data/Works_db.json')
            .then((res) => res.json())
            .then((data) => {
                const imagePromises = data.map(item => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = item.src_s;
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                });

                Promise.all(imagePromises)
                    .then(() => {
                        setPhotos(data);
                        setFilteredPhotos(data);
                        setIsInitialLoad(false);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        console.error('Some images failed to load', err);
                        setIsLoading(false);
                    });
            })
            .catch((err) => {
                console.error('Error fetching JSON:', err);
                setIsLoading(false);
            });
    }, []);

    const handleFilterChange = (type, value) => {
        setFilters((prev) => {
            const updated = { ...prev };
            updated[type] = updated[type].includes(value)
                ? updated[type].filter(v => v !== value)
                : [...updated[type], value];
            return updated;
        });
    };

    useEffect(() => {
        if (isInitialLoad) return;
        setIsLoading(true);

        const filtered = photos.filter((photo) => {
            const matchYear = filters.years.length === 0 || filters.years.includes(photo.year);
            const matchGenre = filters.genres.length === 0 || filters.genres.includes(photo.genre);
            const matchPlace = filters.places.length === 0 || filters.places.includes(photo.place);
            return matchYear && matchGenre && matchPlace;
        });

        const imagePromises = filtered.map(item => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = item.src_s;
                img.onload = resolve;
                img.onerror = reject;
            });
        });

        Promise.all(imagePromises)
            .then(() => {
                setFilteredPhotos(filtered);
                setCurrentIndex(0);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Image loading error:', err);
                setFilteredPhotos(filtered);
                setCurrentIndex(0);
                setIsLoading(false);
            });
    }, [filters, photos, isInitialLoad]);

    const openModal = (index) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + filteredPhotos.length) % filteredPhotos.length
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % filteredPhotos.length
        );
    };

    return (
        <>
            <Helmet>
                <title>Works | Volodymyr Sinusik</title>
                <meta name="description" content="Explore the artworks of Volodymyr Sinusik." />
                <meta name="author" content="Volodymyr Sinusik" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
            <div className='works'>
                <div className='container'>
                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <div className='works_wrapper'>
                            <div className='works_checkbox'>
                                {/* ФІЛЬТРИ */}
                                <div className='works_box'>
                                    <div className='works_title'>Genre</div>
                                    <div className='works_box_wrapper'>
                                        {['landscape', 'still_life', 'interior', 'portrait', 'abstraction', 'drawing'].map((genre) => (
                                            <label className='works_box_check' key={genre}>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleFilterChange('genres', genre)}
                                                    checked={filters.genres.includes(genre)}
                                                />
                                                {genre}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className='works_box'>
                                    <div className='works_title'>Year</div>
                                    <div className='works_box_wrapper'>
                                        {[2008, 2009, 2010, 2011, 2012, 2013, 2014, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
                                            <label className='works_box_check works_box_year' key={year}>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleFilterChange('years', year)}
                                                    checked={filters.years.includes(year)}
                                                />
                                                {year}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className='works_box'>
                                    <div className='works_title'>Place</div>
                                    <div className='works_box_wrapper'>
                                        {['Cherkasy', 'countryside', 'Kamianka', 'Athens', 'Gdansk', 'Denmark'].map((place) => (
                                            <label className='works_box_check' key={place}>
                                                <input
                                                    type="checkbox"
                                                    onChange={() => handleFilterChange('places', place)}
                                                    checked={filters.places.includes(place)}
                                                />
                                                {place}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="works_gallery" key={JSON.stringify(filters)}>
                                {filteredPhotos.map((photo, index) => (
                                    <div className='works_photo' key={photo.id}>
                                        <img
                                            src={photo.src_s}
                                            alt={photo.title}
                                            onClick={() => openModal(index)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Модалка */}
                            {isModalOpen && (
                                <Modal
                                    isOpen={isModalOpen}
                                    photo={{
                                        ...filteredPhotos[currentIndex],
                                        src: filteredPhotos[currentIndex].src
                                    }}
                                    currentIndex={currentIndex}
                                    total={filteredPhotos.length}
                                    onClose={() => setIsModalOpen(false)}
                                    onPrev={handlePrev}
                                    onNext={handleNext}
                                    bgColor={bgColor}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Works;









// import { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import ModalWorks from './ModalWorks';
// import Spinner from '../../spinner/Spinner';
// import './works.scss';

// function Works({ bgColor }) {
//     const [photos, setPhotos] = useState([]);
//     const [filteredPhotos, setFilteredPhotos] = useState([]);
//     const [filters, setFilters] = useState({ years: [], genres: [], places: [] });
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isInitialLoad, setIsInitialLoad] = useState(true);
//     const [isModalImageLoading, setIsModalImageLoading] = useState(false);

//     useEffect(() => {
//         fetch('/resources/data/Works_db.json')
//             .then((res) => res.json())
//             .then((data) => {
//                 const imagePromises = data.map(item => {
//                     return new Promise((resolve, reject) => {
//                         const img = new Image();
//                         img.src = item.src_s;
//                         img.onload = resolve;
//                         img.onerror = reject;
//                     });
//                 });

//                 Promise.all(imagePromises)
//                     .then(() => {
//                         setPhotos(data);
//                         setFilteredPhotos(data);
//                         setIsInitialLoad(false);
//                         setIsLoading(false);
//                     })
//                     .catch((err) => {
//                         console.error('Some images failed to load', err);
//                         setIsLoading(false);
//                     });
//             })
//             .catch((err) => {
//                 console.error('Error fetching JSON:', err);
//                 setIsLoading(false);
//             });
//     }, []);

//     const handleFilterChange = (type, value) => {
//         setFilters((prev) => {
//             const updated = { ...prev };
//             updated[type] = updated[type].includes(value)
//                 ? updated[type].filter(v => v !== value)
//                 : [...updated[type], value];
//             return updated;
//         });
//     };

//     useEffect(() => {
//         if (isInitialLoad) return;
//         setIsLoading(true);

//         const filtered = photos.filter((photo) => {
//             const matchYear = filters.years.length === 0 || filters.years.includes(photo.year);
//             const matchGenre = filters.genres.length === 0 || filters.genres.includes(photo.genre);
//             const matchPlace = filters.places.length === 0 || filters.places.includes(photo.place);
//             return matchYear && matchGenre && matchPlace;
//         });

//         const imagePromises = filtered.map(item => {
//             return new Promise((resolve, reject) => {
//                 const img = new Image();
//                 img.src = item.src_s;
//                 img.onload = resolve;
//                 img.onerror = reject;
//             });
//         });

//         Promise.all(imagePromises)
//             .then(() => {
//                 setFilteredPhotos(filtered);
//                 setCurrentIndex(0);
//                 setIsLoading(false);
//             })
//             .catch((err) => {
//                 console.error('Image loading error:', err);
//                 setFilteredPhotos(filtered);
//                 setCurrentIndex(0);
//                 setIsLoading(false);
//             });
//     }, [filters, photos, isInitialLoad]);

//     const openModal = (index) => {
//         setCurrentIndex(index);
//         setIsModalOpen(true);
//         setIsModalImageLoading(true);

//         const selectedPhoto = filteredPhotos[index];
//         setIsModalImageLoading(true);
//         const img = new Image();
//         img.src = selectedPhoto.src_l;
//         img.onload = () => {
//             setIsModalImageLoading(false);
//         };
//         img.onerror = () => {
//             console.error('Помилка завантаження зображення');
//             setIsModalImageLoading(false);
//         };
//     };

//     return (
//         <>
//             <Helmet>
//                 <title>Works | Volodymyr Sinusik</title>
//                 <meta
//                     name="description"
//                     content="Discover the artworks created by Volodymyr Sinusik throughout his life. A collection of paintings, drawings."
//                 />
//                 <meta name="author" content="Volodymyr Sinusik" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1" />

//                 <meta
//                     name="keywords"
//                     content="Volodymyr Sinusik, artworks, paintings, drawings, Ukrainian artist"
//                 />

//                 <meta property="og:title" content="Works | Volodymyr Sinusik" />
//                 <meta
//                     property="og:description"
//                     content="Explore the full collection of artworks by Volodymyr Sinusik, created throughout his life."
//                 />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content="https://sinusik.com/works" />
//                 <meta
//                     property="og:image"
//                     content="https://sinusik.com/images/works-preview.jpg"
//                 />

//                 {/* Twitter */}
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content="Works | Volodymyr Sinusik" />
//                 <meta
//                     name="twitter:description"
//                     content="Discover the artworks created by Volodymyr Sinusik throughout his life."
//                 />
//                 <meta
//                     name="twitter:image"
//                     content="https://sinusik.com/images/works-preview.jpg"
//                 />
//             </Helmet>
//             <div className='works'>
//                 <div className='container'>
//                     {isLoading ? (
//                         <Spinner />
//                     ) : (
//                         <div className='works_wrapper'>
//                             <div className='works_checkbox'>
//                                 {/* FILTERS */}
//                                 <div className='works_box'>
//                                     <div className='works_title'>Genre</div>
//                                     <div className='works_box_wrapper'>
//                                         {['landscape', 'still_life', 'interior', 'portrait', 'abstraction', 'drawing'].map((genre) => (
//                                             <label className='works_box_check' key={genre}>
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={() => handleFilterChange('genres', genre)}
//                                                     checked={filters.genres.includes(genre)}
//                                                 />
//                                                 {genre}
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className='works_box'>
//                                     <div className='works_title'>Year</div>
//                                     <div className='works_box_wrapper'>
//                                         {[2008, 2009, 2010, 2011, 2012, 2013, 2014, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year) => (
//                                             <label className='works_box_check' key={year}>
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={() => handleFilterChange('years', year)}
//                                                     checked={filters.years.includes(year)}
//                                                 />
//                                                 {year}
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div className='works_box'>
//                                     <div className='works_title'>Place</div>
//                                     <div className='works_box_wrapper'>
//                                         {['Cherkasy', 'countryside', 'Kamianka', 'Athens', 'Gdansk', 'Denmark'].map((place) => (
//                                             <label className='works_box_check' key={place}>
//                                                 <input
//                                                     type="checkbox"
//                                                     onChange={() => handleFilterChange('places', place)}
//                                                     checked={filters.places.includes(place)}
//                                                 />
//                                                 {place}
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="works_gallery" key={JSON.stringify(filters)}>
//                                 {filteredPhotos.map((photo, index) => (
//                                     <div className='works_photo' key={photo.id}>
//                                         <img
//                                             src={photo.src_s}
//                                             alt={photo.title}
//                                             onClick={() => openModal(index)}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>

//                             {isModalOpen && (
//                                 <ModalWorks
//                                     bgColor={bgColor}
//                                     photos={filteredPhotos}
//                                     currentIndex={currentIndex}
//                                     setCurrentIndex={setCurrentIndex}
//                                     onClose={() => setIsModalOpen(false)}
//                                     isLoading={isModalImageLoading}
//                                 />
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Works;