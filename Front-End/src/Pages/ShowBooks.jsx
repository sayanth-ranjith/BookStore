import React,{useEffect,useState} from 'react'
import { HeaderContainer } from './Home'
import axios from 'axios'

const ShowBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios.get('http://localhost:5500/books/getBooks')
      .then(response => {
        setBooks(response.data); // Update state with fetched data
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5500/books/deleteBook/${id}`)
      .then(() => {
        // Remove the deleted book from the state
        setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        alert("Could not delete book,Please try later!");
      });
  };

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


  return (
    <div>
    <HeaderContainer>
      This is where you will be able to see all your available books.
    </HeaderContainer>
    <table style={tableStyle}>
        <thead>
          <tr style={headerStyle}>
            <th style={thTdStyle}>Sl no.</th>
            <th style={thTdStyle}>Author</th>
            <th style={thTdStyle}>Book Name</th>
            <th style={thTdStyle}>Publish Year</th>
            <th style={thTdStyle}>ID</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td style={thTdStyle}>{index + 1}</td>
              <td style={thTdStyle}>{book.author}</td>
              <td style={thTdStyle}>{book.title}</td>
              <td style={thTdStyle}>{book.publishYear}</td>
              <td style={thTdStyle}>{book._id}</td>
              <td style={thTdStyle}>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>

  )
}

export default ShowBooks
