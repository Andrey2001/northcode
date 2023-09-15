import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import WelcomePage from './UI/WelcomPage';


function InputData() {
    const location = useLocation();
    const [text, setText] = useState('');
    const [responseText, setResponseText] = useState('');

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleClear = () => {
        setText('');
    }

    useEffect(() => {
        if (location.pathname === '/about') {
          setResponseText('');
        }
    }, [location.pathname]);

    const handlePostText = async() => {
        try {
            const formData = new FormData();
      
            formData.append('message', text);
            console.log(text);

            const response = await axios.post('http://localhost:8000/', formData);

            if (response.data.success) {
                setResponseText(response.data.response_message);
            }

          } catch (error) {
            console.error('Error fetching coordinates:', error);
          }
    }

    const renderContent = () => {
        if (location.pathname === '/home') {
          return (
            <WelcomePage
              text={text}
              handleChange={handleChange}
              handleClear={handleClear}
              handlePostText={handlePostText}
              responseText={responseText}
            />
          );
        }

        return null;
    }
    
    return (
        <div>
            {renderContent()}
        </div>
    );
}

export default InputData;
