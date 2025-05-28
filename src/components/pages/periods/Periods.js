// таби показуються в url

import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import periodsData from '../../../resources/data/Periods_db.json';
import worksData from '../../../resources/data/Works_db.json';
import Modal from '../../modal/Modal';
import Spinner from '../../spinner/Spinner';
import './periods.scss';

const additionalImageMap = {
    0: [10101, 10102, 10103, 10104, 10105, 10106, 10107, 10108, 10109, 10110, 10111, 10112, 10113, 10114, 10115, 10116, 10117, 10118, 10119, 10120, 10121, 10122, 10123],
    1: [10201, 10202, 10203, 10204, 10205, 10206, 10207, 10208, 10209, 10210, 10211, 10212, 10213, 10214, 10215, 10216, 10217, 10218, 10219, 10220, 10221, 10222, 10223, 10224, 10225, 10226, 10227, 10228, 10229, 10230, 10231, 10232, 10233, 10234, 10235],
    2: [10301, 10302, 10303, 10304, 10305, 10306, 10307, 10308, 10309, 10310, 10311, 10312, 10313, 10314, 10315, 10316, 10317, 10318, 10319, 10320, 10321, 10322, 10323, 10324, 10325, 10326, 10327, 10328, 10329, 10330, 10331, 10332, 10333, 10334, 10335, 10336, 10337, 10338, 10339, 10340, 10341, 10342, 10343, 10344, 10345, 10346, 10347, 10348, 10349, 10350, 10351, 10352, 10353],
    3: [10404, 10405, 10406, 10407, 10408, 10409, 10410, 10413],
    4: [10401, 10402, 10403, 10423],
    5: [10502, 10504, 10505, 10506, 10507, 10508, 10509, 10510, 10511, 10512, 10513, 10514, 10515, 10516, 10517, 10518, 10519, 10520, 10521, 10522, 10523, 10524, 10525, 10526, 10527, 10528, 10529, 10530, 10531, 10532, 10533, 10534, 10535, 10536, 10537, 10361, 10602, 10603, 10604, 10605, 10606, 10607, 10608, 10609, 10610, 10611, 10612, 10613, 10614, 10615, 10616, 10617, 10618, 10619],
    6: [10620, 10621, 10622, 10623, 10624, 10625, 10626, 10627, 10628, 10629, 10630, 10631, 10632, 10633, 10634, 10635, 10636, 10637, 10638, 10639, 10640, 10641, 10642, 10643],
    7: [10701, 10702, 10703, 10704, 10705, 10706, 10707, 10708, 10709, 10710, 10711, 10712, 10713, 10714, 10715, 10801, 10802, 10803, 10804, 10805, 10806, 10807, 10808, 10809, 10810, 10811, 10812, 10813, 10814, 10815, 10816, 10817, 10818, 10819, 10820, 10821, 10822, 10823, 10824, 10825, 10826, 10827, 10828, 10829, 10830, 10831, 10832, 10833, 10834, 10835, 10836],
    8: [10901, 10902, 10903, 10904, 10905, 10906, 10907, 10908, 10909, 10910, 10911, 10912, 10913, 10914, 10915, 10916, 10917, 11008, 11010],
};

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const Periods = ({ bgColor }) => {

    const { periodSlug } = useParams();
    const navigate = useNavigate();

    const activeTab = useMemo(() => {
        const index = periodsData.findIndex(
            (tab) => slugify(tab.tab) === periodSlug
        );
        return index !== -1 ? index : 0;
    }, [periodSlug]);

    const currentTabData = periodsData[activeTab];

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
    }, [activeTab]);

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
        setCurrentImageIndex(
            (prev) => (prev - 1 + mergedImages.length) % mergedImages.length
        );
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % mergedImages.length);
    };

    const handleTabClick = (index) => {
        const slug = slugify(periodsData[index].tab);
        navigate(`/periods/${slug}`);
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

    return (
        <>
            <Helmet>
                <title>Periods of Life — Volodymyr Sinusik</title>
                <meta
                    name="description"
                    content="Explore the artistic periods of Volodymyr Sinusik, from early years to modern works. Each period includes descriptions and galleries of his paintings."
                />

                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta
                    name="keywords"
                    content="Volodymyr Sinusik, art, paintings, Ukrainian artist, periods, galleries, modern art"
                />

                <meta name="author" content="Volodymyr Sinusik" />

                <meta property="og:title" content="Periods of Life — Volodymyr Sinusik" />
                <meta
                    property="og:description"
                    content="Dive into the artistic evolution of Ukrainian artist Volodymyr Sinusik. View his works by period."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sinusik.com/periods" />
                <meta
                    property="og:image"
                    content="https://sinusik.com/images/periods-preview.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Periods of Life — Volodymyr Sinusik" />
                <meta
                    name="twitter:description"
                    content="Discover the different periods of Volodymyr Sinusik's art career."
                />
                <meta
                    name="twitter:image"
                    content="https://sinusik.com/images/periods-preview.jpg"
                />
            </Helmet>
            <div className='periods'>
                <div className='container'>
                    <div className='periods_wrapper'>
                        {isLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <ul className="periods_tabs">
                                    {periodsData.map((tab, index) => (
                                        <li className='periods_tab' key={index}>
                                            <Link
                                                to={`/periods/${slugify(tab.tab)}`}
                                                type="button"
                                                className={`periods_tab ${activeTab === index ? 'active' : ''}`}
                                                onClick={() => handleTabClick(index)}
                                            >
                                                {tab.tab}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="periods_contents">
                                    <p className='periods_title'>{currentTabData.tab}</p>
                                    <div className='periods_descr'>
                                        {currentTabData.paragraphs.map((text, index) => (
                                            <p key={index}>{text}</p>
                                        ))}
                                    </div>
                                    <div className='periods_images'>
                                        {mergedImages.map((img, index) => (
                                            <div className='periods_img' key={`${img.id}-${index}`}>
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
                                    photo={mergedImages[currentImageIndex]}
                                    currentIndex={currentImageIndex}
                                    total={mergedImages.length}
                                    onClose={() => setModalOpen(false)}
                                    onPrev={handlePrev}
                                    onNext={handleNext}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Periods;