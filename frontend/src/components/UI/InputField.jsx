import React from 'react';
import 'react-quill/dist/quill.snow.css'; // Quill editor styles
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles

function InputField(props) {
  const buttonStyles = {
    backgroundColor: "#02598A",
    color: "white",
    fontSize: "16px",
    fontFamily: 'Century, sans-serif',
  };

  // Handle input value changes
  const handleInputChange = (event) => {
    const newText = event.target.value;
    props.handleChange(newText); // Pass the new text to the parent component
  };

  const handleFileInputChange = (event) => {
    const newfile = event.target.files[0];
    props.handleFileChange(newfile); // Pass the new text to the parent component
  };

  return (
    <div className="form-floating" style={{ marginTop: "2%"}}>
      <input
        className="form-control"
        type="text"
        style={{ borderRadius: "10px", backgroundColor: "white" }}
        value={props.text}
        onChange={handleInputChange}
        placeholder="Введите текст..."
      />

      <div className="my-4 d-flex justify-content-center align-items-center">
        <label htmlFor="fileInput" className="btn" style={buttonStyles}>
          Загрузка
          <input
            id="fileInput"
            type="file"
            onChange={handleFileInputChange}
            // ref={ref}
            accept=".csv"
            style={{ display: "none" }}
          />
        </label>

        <button
          onClick={() => {
            props.handlePostText();
            props.handelSend(true); // Set sent to true after clicking the button
          }}
          style={buttonStyles}
          type="button"
          className="btn ms-4"
        >
          Отправить
        </button>

        <button
          onClick={() => {
            props.handleClear();
            props.handelSend(false); // Set sent to false after clicking the button
          }}
          style={{ ...buttonStyles, backgroundColor: "#E73D24" }}
          type="button"
          className="btn ms-4"
        >
          Очистить
        </button>
      </div>
    </div>
  );
}

export default InputField;
