import React from 'react';
import {Routes, Route} from 'react-router-dom'

import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login,  } from "./pages";
import {useSelector, useDispatch} from 'react-redux'

import { useAuthMeMutation } from './api/authApi';
import { setStatusAuth, setAuth } from './redux/slices/auth';
import { TagsPost } from './pages/TagsPost';


const App: React.FC = () => {


  const dispatch = useDispatch()
  const [authMe] = useAuthMeMutation()

  
  React.useEffect(() => {
    const fetchData = async () => {
      const {data}: any = await authMe()
      console.log(data)
      if (Object.keys(data || '').length > 0) {
        dispatch((setStatusAuth(true), setAuth(data)))
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route 
            path='/'
            element={<Home />}
          />

          <Route 
            path='/posts/:id'
            element={<FullPost />}
          />

          <Route 
            path='/posts/:id/edit'
            element={<AddPost />}
          />

          <Route 
            path='/add-post'
            element={<AddPost />}
          />

          <Route 
            path='/login'
            element={<Login />}
          />

          <Route 
            path='/register'
            element={<Registration />}
          />

          <Route 
            path='/tags/:id'
            element={<TagsPost />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
