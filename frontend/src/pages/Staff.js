import React, { useState } from 'react';
import '../styles/Staff.css';
import axios from 'axios';

const Staff = () => {
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    frontImage: null,
    leftImage: null,
    rightImage: null,
  });

  const handleChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', staff.name);
    formData.append('email', staff.email);
    formData.append('password', staff.password);
    formData.append('role', staff.role);
    formData.append('frontImage', staff.frontImage);
    formData.append('leftImage', staff.leftImage);
    formData.append('rightImage', staff.rightImage);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(res.data.msg);
      setStaff({
        name: '',
        email: '',
        password: '',
        role: '',
        frontImage: null,
        leftImage: null,
        rightImage: null,
      });
    } catch (error) {
      alert('Registration Failed');
      console.log(error);
    }
  };

  return (
    <div className='registration-container'>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>Name:</label>
        <input type='text' name='name' onChange={handleChange} value={staff.name} required />

        <label>Email:</label>
        <input type='email' name='email' onChange={handleChange} value={staff.email} required />

        <label>Password:</label>
        <input type='password' name='password' onChange={handleChange} value={staff.password} required />

        <label>Role:</label>
        <input type='text' name='role' onChange={handleChange} value={staff.role} required />

        <label>Front Image:</label>
        <input type='file' name='frontImage' onChange={handleFileChange} required />

        <label>Left Image:</label>
        <input type='file' name='leftImage' onChange={handleFileChange} required />

        <label>Right Image:</label>
        <input type='file' name='rightImage' onChange={handleFileChange} required />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Staff;
