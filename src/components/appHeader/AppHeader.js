import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import img from './logo.png';

import './appHeader.scss';

const AppHeader = ({ bgColor, setBgColor }) => {

    const [isActive, setIsActive] = useState(false);

    const menuClick = () => {
        setIsActive(prev => !prev);
    };

    const closeMenu = () => {
        setIsActive(false);
    };

    const colors = ['#ffffff', '#dadada', '#bdbdbd', '#a3a3a3', '#cfccbb', '#b1ae9c'];

    return (
        <div className='header'>
            <div className='container'>
                <header className="app__header">
                    <h1 className="app__title">
                        <Link to="/home">
                            <div className="logo"><img src={img} alt="logo" /></div>
                        </Link>
                    </h1>
                    <nav className="app__menu">
                        <aside className='site_colour'>
                            {colors.map((color) => (
                                <div
                                    key={color}
                                    className={`site_colour_main ${bgColor === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setBgColor(color)}
                                />
                            ))}
                        </aside>
                        <ul className={`menu menu${isActive ? '_active' : ''}`}>
                            <li className='menu_item'>
                                <NavLink
                                    className={'menu_links'}
                                    style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })}
                                    to="/home"
                                    onClick={closeMenu}
                                >
                                    Home
                                </NavLink></li>
                            <li className='menu_item'><NavLink className={'menu_links'} style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })} to="/biography" onClick={closeMenu}>Biography</NavLink></li>
                            <li className='menu_item'><NavLink className={'menu_links'} style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })} to="/periods" onClick={closeMenu}>Periods</NavLink></li>
                            <li className='menu_item'><NavLink className={'menu_links'} style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })} to="/exhibitions" onClick={closeMenu}>Exhibitions</NavLink></li>
                            <li className='menu_item'><NavLink className={'menu_links'} style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })} to="/works" onClick={closeMenu}>Works</NavLink></li>
                            <li className='menu_item'><NavLink className={'menu_links'} style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })} to="/rooms_without_time" onClick={closeMenu}>RWT</NavLink></li>
                            <li className='menu_item'><NavLink className={'menu_links'} style={({ isActive }) => ({ fontWeight: isActive ? '700' : 'inherit' })} to="/contacts" onClick={closeMenu}>Contacts</NavLink></li>
                        </ul>
                        <div className={`hamburger hamburger${isActive ? '_active' : ''}`} onClick={menuClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default AppHeader;