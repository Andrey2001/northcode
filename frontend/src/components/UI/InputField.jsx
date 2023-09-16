import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // стили для редактора
import 'react-quill/dist/quill.bubble.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // стили Bootstrap

function InputField(props) {
  return (
    <div className="form-floating" style={{marginTop: "7%"}}>
      <ReactQuill
        style={{border: "2px solid black", borderRadius: "5px" }}
        value={props.text}
        onChange={props.handleChange}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']         
          ],
        }}
        placeholder={"Введите текст..."}
      />
      <div className="my-3">
        <button
          onClick={() => {
            props.handlePostText();
            props.handelSend(true); // Set sent to true after clicking the button
          }}
          style={{ backgroundColor: "#481A65", color: "white" }}
          type="button"
          className="btn"
        >
          Отправить
        </button>

        <button onClick={() => {
            props.handleClear();
            props.handelSend(false); // Set sent to true after clicking the button
          }}
        style={{ backgroundColor: "#C39BD3", color: "white" }} 
        type="button" 
        className="btn mx-3"
        >
          Очистить
        </button>
      </div>
    </div>
  );
}

export default InputField;
