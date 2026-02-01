import { Helmet } from 'react-helmet-async';
import './roomsWithoutTime.scss';

const RoomsWithoutTime = () => {
    return (
        <>
            <Helmet>
                <title>Rooms Without Time | Volodymyr Sinusik</title>
                <meta
                    name="description"
                    content="Rooms Without Time. A series of paintings exploring interior spaces as psychological environments"
                />
                <meta name="author" content="Volodymyr Sinusik" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta
                    name="keywords"
                    content="Volodymyr Sinusik, artist, paintings, exhibitions, biography, contact"
                />

                <meta property="og:title" content="Rooms Without Time | Volodymyr Sinusik" />
                <meta
                    property="og:description"
                    content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://sinusik.com/" />
                <meta
                    property="og:image"
                    content="https://sinusik.com/images/rwt-preview.jpg"
                />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Rooms Without Time | Volodymyr Sinusik" />
                <meta
                    name="twitter:description"
                    content="Official website of Volodymyr Sinusik, featuring his artworks, exhibitions, biography, and contact details."
                />
                <meta
                    name="twitter:image"
                    content="https://sinusik.com/images/rwt-preview.jpg"
                />
            </Helmet>
            <div className="rooms">
                <div className="container">
                    <h1 className="rooms_title">Rooms Without Time</h1>
                    <h2 className="rooms_subtitle">A series of paintings exploring interior spaces as psychological environments</h2>
                    <div className="rooms_main">
                        <div className="rooms_photo__main">
                            <img src="../resources/img/works/10804.jpg" alt="Colorful room" />
                        </div>
                        <div className="rooms_text">
                            <div className="rooms_name">Colorful room</div>
                            <div className="rooms_descr">
                                <div className="rooms_year">2023</div>
                                <div className="rooms_medium">oil on canvas</div>
                                <div className="rooms_size">100×75 cm</div>
                            </div>
                        </div>
                    </div>
                    <div className="rooms_wrapper">
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__1">
                                <img src="../resources/img/works/10801.jpg" alt="Room of a poetess" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Room of a poetess</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2022</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">75×105 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__2">
                                <img src="../resources/img/works/10904.jpg" alt="Square evening light" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Square evening light</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2024</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">75×95 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__3">
                                <img src="../resources/img/works/10901.jpg" alt="Evening by the sea" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Evening by the sea</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2024</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">80×100 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__4">
                                <img src="../resources/img/works/10902.jpg" alt="Everything is gray" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Everything is gray</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2024</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">75×100 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__5">
                                <img src="../resources/img/works/10903.jpg" alt="Creative search" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Creative search</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2024</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">95×75 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__6">
                                <img src="../resources/img/works/10905.jpg" alt="Cozy evening light" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Cozy evening light</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2024</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">70×90 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__8">
                                <img src="../resources/img/works/10805.jpg" alt="Reading girl" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Reading girl</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2023</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">75×95 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__9">
                                <img src="../resources/img/works/10806.jpg" alt="Beginning of the summer" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Beginning of the summer</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2023</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">75×95 cm</div>
                                </div>
                            </div>
                        </div>
                        <div className="rooms_block">
                            <div className="rooms_photo rooms_photo__9">
                                <img src="../resources/img/works/10811.jpg" alt="Room of shadows" />
                            </div>
                            <div className="rooms_text">
                                <div className="rooms_name">Room of shadows</div>
                                <div className="rooms_descr">
                                    <div className="rooms_year">2022</div>
                                    <div className="rooms_medium">oil on canvas</div>
                                    <div className="rooms_size">60×80 cm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rooms_statement">
                        <h2 className="rooms_statement__title">Artist Statement</h2>
                        <p>Rooms Without Time is a series of paintings that focuses on interior spaces as psychological environments.
                            Rooms, windows, and fragments of the city create quiet, suspended scenes where time appears slowed or absent.
                            The human figure, when present, functions as a sign of presence rather than a narrative subject.

                            Working with geometry, color, and spatial rhythm, I construct a balance between structure and intuition.
                            Painting allows me to transform everyday interiors into places of stillness, reflection, and internal tension.</p>
                    </div>
                    <div className="rooms_sv">
                        <div className="rooms_sv__info">
                            Born 1991, Cherkasy <br />
                            Lives and works in Cherkasy <br /> <br />
                        </div>

                        <div className="rooms_sv__info">
                            Education <br />
                            2012 — BFA, Painting <br />
                            Bohdan Khmelnytsky National University of Cherkasy, Ukraine <br /> <br />
                        </div>
                        <div className="rooms_sv__info">
                            Selected Exhibitions <br />
                            2018 — The Brick Lane Gallery, London, UK <br />
                            2019 — Filosoffen, Odense, Denmark <br />
                            2022 — Gallery of Folk Art, Cherkasy, Ukraine <br /> <br />
                        </div>
                        <div className="rooms_sv__info">
                            Teaching Experience <br />
                            Since 2023 — Lecturer in Drawing, Painting, and Art History <br />
                            Cherkasy Art and Technical Professional College, Ukraine <br /> <br />
                        </div>
                        <div className="rooms_sv__info">
                            Additional Information <br />
                            Works are held in private collections in over 14 countries. <br />
                            The artist has worked and painted in Poland, Denmark, and Greece. <br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomsWithoutTime;