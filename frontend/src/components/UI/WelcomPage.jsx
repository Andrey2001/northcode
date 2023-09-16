import React, { useState } from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';

function WelcomePage(props) {
  const formStyle = {
    marginTop: '20px',
    color: "#481A65"
  };

  const [sent, setSent] = useState(false);
  const handelSend = (new_sent) => {
    setSent(new_sent);
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center" style={formStyle}>Welcome - Let's format text with AI !</h1>
        <br />
        <InputField
          text={props.text}
          handelSend={handelSend}
          handleChange={props.handleChange}
          handleClear={props.handleClear}
          handlePostText={props.handlePostText}
        />
        <br />
        <ResultCard oldText={props.text} responseText={props.responseText} sent={sent}/>
      </div>
    </div>
  );
}

export default WelcomePage;
