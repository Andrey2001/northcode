import React from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';

function WelcomePage(props) {
  const formStyle = {
    marginTop: '20px',
    color: "#481A65"
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center" style={formStyle}>Welcome - Let's format text with AI !</h1>
        <br />
        <InputField
          text={props.text}
          handleChange={props.handleChange}
          handleClear={props.handleClear}
          handlePostText={props.handlePostText}
        />
        <br />
        <ResultCard responseText={props.responseText} />
      </div>
    </div>
  );
}

export default WelcomePage;
