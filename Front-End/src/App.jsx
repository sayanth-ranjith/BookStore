import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CreateBook from './Pages/CreateBook'
import DeletBooks from './Pages/DeletBooks'
import EditBooks from './Pages/EditBooks'
import ShowBooks from './Pages/ShowBooks'

const App = () => {
  return (
   <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/books/pushBook' element={<CreateBook/>}/>
      <Route path='/books/deleteBook/:id' element={<DeletBooks/>}/>
      <Route path='/books/updateBook/:id' element={<EditBooks/>}/>
      <Route path='/books/getById/:id' element={<ShowBooks/>}/>      
   </Routes>
  )
}

export default App
