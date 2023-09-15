import React from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

function InputData() {
    const location = useLocation();

    const renderWelcomeMessage = () => {
        if (location.pathname === '/home') {
            return (
                <div className="container">
                    <h1 className="text-center">Welcome - Let's chat with AI Chat Bot!</h1>
                </div>
            );
        }
        return null; 
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/home">IT-Будды</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/about" className="nav-link active" aria-current="page">О нас</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            {renderWelcomeMessage()}

            <div className='chat'>
                <pre>
                    German: Hi Andrew!
                    <br/>
                    Andrew: Fisting is 300$
                </pre>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">Comments</label>
                </div>
            </div>
        </div>
    );
}

export default InputData;
