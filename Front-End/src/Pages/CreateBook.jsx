import React from 'react';
import { Button } from "./Home";
import { HeaderContainer } from './Home';
import {useState} from 'react';
import axios from 'axios';

const CreateBook = () => {

  const [bookData,setBookData] = useState({
    "title":"",
    "author":"",
    "publishYear":""
  })

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  };

  const headerStyle = {
    backgroundColor: '#f2f2f2',
  };

  const inputStyle = {
    ...thTdStyle, // Inherit basic styles from thTdStyle
    border: '1px solid #000', // Add dark outline using solid black (#000)
    outline: 'none', // Remove default blue outline on focus
  };

  const handleChange = (event)=>{
    setBookData({ ...bookData, [event.target.name]: event.target.value });
  }

  const clickFunction = async () => {
    try {
      const response = await axios.post('http://localhost:5500/books/pushBook', bookData); 
      alert("Your book has been created successfully.")
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting book data:', error);
      alert("Book not created,please try again later.")
    }
  };
  return (
    <div>
      <HeaderContainer>You can add books to your database from here.</HeaderContainer>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...headerStyle }}>Author</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Title</th>
            <th style={{ ...thTdStyle, ...headerStyle }}>Publish Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={thTdStyle}>
              <input type="text" name="author" style={inputStyle} value={bookData.author}  onChange={handleChange}/>
            </td>
            <td style={thTdStyle}>
              <input type="text" name="title" style={inputStyle} value={bookData.title}  onChange={handleChange}/>
            </td>
            <td style={thTdStyle}>
              <input type="text" name="publishYear" style={inputStyle}  value={bookData.publishYear}  onChange={handleChange}/>
            </td>
          </tr>
        </tbody>
      </table>
      <Button onClick={clickFunction}>Submit Book Details</Button>
    </div>
  );
};

export default CreateBook;
