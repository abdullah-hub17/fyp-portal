import React, { useState } from 'react';
import '../studentstylings/Feedback.css';
import { TiTick } from "react-icons/ti";

const Feedback = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "bc553b60-66bc-4e96-bfdf-e27151b59180");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className='container-FB'>
      <div className="title-FB">
        <h1>Get In Touch</h1>
      </div>

      {!formSubmitted ? (
        <form onSubmit={onSubmit} className="form-FB">
          <label htmlFor="Your Name">Your Name</label>
          <input type="text" placeholder='Enter Your Name' name='name' />
          <label htmlFor="Your Email">Your Email</label>
          <input type="email" placeholder='Enter Your Email' name='email' id="" />
          <label htmlFor="Write Your Message">Your Message</label>
          <textarea name="message" rows="8" placeholder='Enter Your Message'></textarea>
          <button type='submit' className="btn">Submit Now</button>
        </form>
      ) : (
        <div className="message-FB">
          <h2>Thank You!</h2>
          <p>Your response has been submitted!!!</p>
          <span className="tick-icon-FB"><TiTick /></span>
        </div>
      )}
    </div>
  );
};

export default Feedback;
