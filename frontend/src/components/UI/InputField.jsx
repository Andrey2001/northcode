import React from 'react';

function InputField(props) {
  const formStyle = {
    marginTop: '8%',
  };

  return (
    <div className="form-floating" style={formStyle}>
      <textarea
        type="text"
        onChange={props.handleChange}
        value={props.text}
        className="form-control"
        placeholder="Leave a comment here"
        id="floatingTextarea"
        style={{whiteSpace: 'pre'}}
      />
      <label htmlFor="floatingTextarea">Введите текст</label>
      <div className="my-3">
        <button onClick={props.handlePostText} style={{backgroundColor: "#481A65", color: "white"}} type="button" className="btn">Отправить</button>
        <button onClick={props.handleClear} style={{backgroundColor: "#C39BD3", color: "white"}} type="button" className="btn mx-3">Очистить</button>
      </div>
    </div>
  );
}

export default InputField;
