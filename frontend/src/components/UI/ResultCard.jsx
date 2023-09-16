import React, { useState } from 'react';

function ResultCard(props) {
  const textStyle = {
    fontWeight: 'normal',
    fontFamily: 'Arial, sans-serif',
  };

  const highlightText = (originalText, newText, color) => {
    if (typeof originalText !== 'string' || typeof newText !== 'string') {
      return null;
    }

    const originalWords = originalText.split(/(<[^>]+>|[^<>\s]+)/g);
    const newWords = newText.split(/(<[^>]+>|[^<>\s]+)/g);
    
    const highlightedWords = newWords.map((word, index) => {
      let res;
      if (color === 'red') {
        res = originalWords[index];
      }
      else {
        res = word;
      }

      if (word !== originalWords[index]) {
        // If the word doesn't match, apply the specified color
        return (
          <span key={index} style={{ color }}>
            {res}
          </span>
        );
      } else {
        return <span key={index}>{res}</span>;
      }
  });

    return (
      <span style={{ whiteSpace: 'pre-wrap' }}>
        {highlightedWords.map((word, index) => (
          <React.Fragment key={index}>{word} </React.Fragment>
        ))}
      </span>
    );
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3>Старый текст:</h3>
        {props.sent && (
          <h5 className="card-text" style={textStyle}>
            {highlightText(props.oldText, props.responseText, 'red')}
          </h5>
        )}
        
        <h3>Новый текст:</h3>
        {props.sent && (
          <h5 className="card-text" style={textStyle}>
            {highlightText(props.oldText, props.responseText, 'green')}
          </h5>
        )}
      </div>
    </div>
  );
}

export default ResultCard;
