import React from 'react';

function TextCard(props) {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px', // Увеличиваем радиус закругления
    padding: '10px', // Увеличиваем внутренний отступ
    boxShadow: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)', // Добавляем тень
  };

  const textStyle = {
    fontWeight: 'normal',
    fontFamily: 'Century, sans-serif',
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
      } else {
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
    <div className="card" style={cardStyle}> {/* Обновляем стили контейнера */}
      <div className="card-body">
        <h2 style={{ color: "#02598A" }}>{props.title}</h2>
        {props.sent && (
          <h5 className="card-text" style={textStyle}>
            {highlightText(props.oldText, props.responseText, props.color)}
          </h5>
        )}
      </div>
    </div>
  );
}

function ResultCard(props) {
  
  const formStyle = {
    color: "#02598A",
    fontFamily: 'Century, sans-serif',
  };

  return (
    <div>
      <h2 style={formStyle}>Исходный текст</h2>
      <TextCard
        sent={props.sent}
        oldText={props.oldText}
        responseText={props.responseText}
        color="red"
      />
      <br />
      <br />
      <h2 style={formStyle}>Обновленный текст</h2>
      <TextCard
        sent={props.sent}
        oldText={props.oldText}
        responseText={props.responseText}
        color="green"
      />
    </div>
  );
}

export default ResultCard;
