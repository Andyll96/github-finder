import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = ({icon, title}) => {
        return (
            <nav className='navbar bg-primary'>
                <h1>
                    {/* props passed in through App.js, but in this case the props are coming from the default props */}
                    <i className={icon} /> {title}
                </h1>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </nav>
        )
}

// if no props are passed in, these defaults will take over
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

// Like a form of type/error checking
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar
