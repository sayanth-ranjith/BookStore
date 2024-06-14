import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
  background-color: #3498db; /* Blue */
  color: white;
  padding: 35px;
  text-align: center;
  font-size: 20px; 
  font-weight: bold;
  font-family: Arial, sans-serif;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  `;

const Button = styled.button`
    padding: 10px 20px;
    border: 2px solid #3498db;
    border-radius: 5px;
    background-color: transparent;
    color: #3498db;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #3498db;
      color: white;
    }
  `;



const Home = () => {

  return (
    <div>
      <HeaderContainer>Welcome to a Book-Store app using React.</HeaderContainer> 
      <div style={{fontFamily:'inherit',fontSize:'21px',padding:'10px'}}>
        This is your first React project trying to learn MERN stack.
        <p>What do you want to do?</p>
        <ButtonContainer>
          <Link to="/books/getBooks">
          <Button>View available books</Button>
          </Link>
          <Button>Create a book</Button>
          <Button>Delete a book</Button>
          <Button>Edit a book</Button>
          <Button>View a book by ID</Button>
        </ButtonContainer>

      </div>   
    </div>
  )
}

export { Home, HeaderContainer,Button,ButtonContainer };
