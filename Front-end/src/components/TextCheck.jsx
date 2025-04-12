import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

function InputPage() {
  const [inputText, setInputText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend to store the input
      await axios.post("http://localhost:5000/api/predict", { text: inputText });

      // Fetch updated results
      const response = await axios.get("http://localhost:5000/api/display");

      // Redirect to Results page with fetched data
      navigate("/Result", { state: { inputText, results: response.data } });
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="textcheck-container">
        <div className="logo">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/83b8abab8dd36a4429a61793747b95bb5ede706c31751a9d392447a5527ddd25?placeholderIfAbsent=true&apiKey=d94fca7f07964371945234ca4f7476b3"
            alt="TextCheck"
          />
        </div>

        <h1 className="header-title">ตรวจสอบข่าว</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <label htmlFor="newsContent" className="sr-only">
            พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ
          </label>
          <textarea
            id="newsContent"
            className="textarea"
            placeholder="พิมพ์เนื้อหาหรือข้อความที่ต้องการตรวจสอบ..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)} // Update state
          />
          <button type="submit" className="submit-button">
            ตรวจสอบข่าว
          </button>
        </form>
      </div>
    </>
  );
}

export default InputPage;
