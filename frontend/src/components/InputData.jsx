import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import WelcomePage from './UI/WelcomPage';


function InputData() {
    const location = useLocation();
    const [text, setText] = useState('');
    const [file, setFile] = useState('');
    const [fileType, setFileType] = useState(null);
    const [responseText, setResponseText] = useState('');

    const handleChange = (newText) => {
        setText(newText);
    };

    const handleClear = () => {
        setText('');
    }

    const handleFileChange = (event) => {
      setFileType('file');
      setFile(event);
    };

    const handlePostText = async() => {
        try {
            const formData = new FormData();
            if (fileType === 'file') {
              formData.append('file', file);
              setFile('');
              setFileType('');
            } else {
              formData.append('message', text);
            }
            
            console.log(file);

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
              handleFileChange={handleFileChange}
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
