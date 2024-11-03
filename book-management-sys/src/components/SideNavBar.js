import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideNavBar = ({ openAddModal }) => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <h3>Book Management<br />System</h3>
            <hr className="sidebar-line" />
            <button className="btn" onClick={() => navigate('/')}>Home</button>
            <button className="btn" onClick={() => navigate('/AddBook')}>+ Add Book</button>
        </div>
    );
};

export default SideNavBar;