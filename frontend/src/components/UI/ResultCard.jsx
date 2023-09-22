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

  const highlightRedDiff = (oldStr, newStr) => {
    const newWords = newStr.split(/\s/);
    const oldWords = oldStr.split(/\s/);
    const newWords2 = newStr.replace(/[^А-ЯЁа-яё0-9\s]/g, ' ').split(/\s+/);
    const oldWords2 = oldStr.replace(/[^А-ЯЁа-яё0-9\s]/g, ' ').split(/\s+/);

    const commonWords = new Set(oldWords2.filter(word => word && newWords2.includes(word)));
    
    // Create an array to store JSX elements
    const highlightedWords = [];
    // console.log(commonWords)
    oldWords.forEach((word, index) => {
        const tmp = word.replace(/W/, '');
        if (/^[а-яёА-ЯЁ]+$/.test(tmp)) {
          if(!commonWords.has(tmp))
          {
            highlightedWords.push(
                <span key={index} style={{ color: 'red' }}>
                    {word}
                </span>
            );
          }
          else
          {
            highlightedWords.push(
              <span key={index}>
                  {word}
              </span>
            );
          }
        }
        else
        {
          highlightedWords.push(
            <span key={index}>
                {word}
            </span>
        );
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

  const highlightGreenDiff = (oldStr, newStr) => {
    const newString = newStr.split(/\n/);
    const highlightedWords = [];
    newString.forEach((line, i) => {
      const newWords = line.split(/\s+/); //.replace(/[^a-zA-ZА-ЯЁа-яё0-9\s]/g, ' ')
      
      const newWords2 = line.replace(/[^А-ЯЁа-яё0-9\s]/g, ' ').split(/\s+/);
      const oldWords2 = oldStr.replace(/[^А-ЯЁа-яё0-9\s]/g, ' ').split(/\s+/);

      const commonWords = new Set(oldWords2.filter(word => word && newWords2.includes(word)));
      // Create an array to store JSX elements

      newWords.forEach((word, index) => {
          const tmp = word.replace(/W/, '');
          console.log(word)
          if (/^[а-яёА-ЯЁ]+$/.test(tmp)) {
            if(!commonWords.has(tmp))
            {
              highlightedWords.push(
                  <span key={index} style={{ color: 'green' }}>
                      {word}
                  </span>
              );
            }
            else
            {
              highlightedWords.push(
                <span key={index}>
                    {word}
                </span>
              );
            }
          }
          else
          {
            highlightedWords.push(
              <span key={index}>
                  {word}
              </span>
          );
          }
      });
      highlightedWords.push(
        <span key={33242424234242}>
            {"\n"}
        </span>)
    })

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
        {props.sent && (props.color === 'red') && (
          <h5 className="card-text" style={textStyle}>
            {highlightRedDiff(props.oldText, props.responseText)}
          </h5>
        )}
        {props.sent && (props.color === 'green') && (
          <h5 className="card-text" style={textStyle}>
            {highlightGreenDiff(props.oldText, props.responseText)}
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
