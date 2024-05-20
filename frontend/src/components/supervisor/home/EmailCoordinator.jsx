import React, { useState } from 'react';
import '../superstylings/EmailCoordinator.css'; 

const EmailCoordinator = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("access_key", "4041a49c-2f32-4491-a85c-885f0d10c9c6");
    formDataToSend.append("subject", "New Submission from Web3Forms");
    formDataToSend.append("botcheck", "");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", formData.message);
    if (file) {
      formDataToSend.append("attachment", file);
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      if (response.ok) {
        const data = await response.json();
        setFormSubmitted(true);
        setResultMessage(data.message);
      } else {
        setResultMessage("Something went wrong!");
      }
    } catch (error) {
      console.error('Error:', error);
      setResultMessage("Something went wrong!");
    }
  };

  return (
    <div className='container_EC'>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit} id="form" encType="multipart/form-data" className='inner_EC'>
          <input type="hidden" name="botcheck" style={{display: "none"}} />
          <div>
            <label htmlFor="name">Full Name</label>
            <input type="text" name="name" id="name" placeholder="Ali Rehman" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" placeholder="name@gmail.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" name="phone" id="phone" placeholder="+92 123 4567890" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="message">Your Message</label>
            <textarea rows="5" name="message" id="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <div>
            <label htmlFor="attachment">Attach File (PDF)</label>
            <input type="file" name="attachment" id="attachment" accept=".pdf" onChange={handleFileChange} />
          </div>
          <div>
            <button type="submit">Send Message</button>
          </div>
        </form>
      ) : (
        <div>
          <h2>Thank You!</h2>
          <p>{resultMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EmailCoordinator;
