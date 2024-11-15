import React from 'react';
import { useNavigate} from 'react-router-dom';
import './SideNavBar.css';

const SideNavBar = ({ activePage }) => {
    const navigate = useNavigate();
    const isActive = (page) => activePage === page ? 'active' : '';

    return (
        <div className="sidebar">
            <h3>Book Management<br />System</h3>
            <hr className="sidebar-line" />
            <button className={`btn ${isActive('home')}`} onClick={() => navigate('/')}>🕮 Home</button>
            <button className={`btn ${isActive('add book')}`} onClick={() => navigate('/AddBook')}>+ Add Book</button>
            <button className={`btn ${isActive('edit book')}`}>✎ Edit Book</button>
            <button className={`btn ${isActive('view book')}`}>⌕ View Book</button>
        </div>
    );
};

export default SideNavBar;
