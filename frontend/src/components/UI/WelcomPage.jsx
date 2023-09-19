import React, { useState } from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';

function WelcomePage(props) {
  const formStyle = {
    marginTop: '20px',
    color: "#02598A",
    fontFamily: 'Century, sans-serif',
  };

  const [sent, setSent] = useState(false);
  const handelSend = (new_sent) => {
    setSent(new_sent);
  }

  return (
    <div>
      <div className="container">
        <br />
        <h2 style={formStyle}>Введите текст</h2>
        <InputField
          text={props.text}
          handelSend={handelSend}
          handleFileChange={props.handleFileChange}
          handleChange={props.handleChange}
          handleClear={props.handleClear}
          handlePostText={props.handlePostText}
        />
        <ResultCard oldText={props.text} responseText={props.responseText} sent={sent}/>
      </div>
    </div>
  );
}

export default WelcomePage;
