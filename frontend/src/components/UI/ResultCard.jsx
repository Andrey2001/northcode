import React from 'react';

function ResultCard({ responseText }) {
  const textStyle = {
    fontWeight: 'normal',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>Отформатированный текст:</h3>
        <h5 className="card-text" style={textStyle}>{responseText}</h5>
      </div>
    </div>
  );
}

export default ResultCard;
