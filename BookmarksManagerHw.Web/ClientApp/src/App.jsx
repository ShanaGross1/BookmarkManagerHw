import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import AddBookmark from './Pages/AddBookmark'
import Signup from './Pages/Signup';
import MyBookmarks from './Pages/MyBookmarks';
import Login from './Pages/Login';
import { AuthContextComponent } from './AuthContext';
import Logout from './Pages/Logout';
import AuthenticatedRoute from './components/AuthenticatedRoute';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/mybookmarks' element={
                        <AuthenticatedRoute>
                            <MyBookmarks />
                        </AuthenticatedRoute>} />
                    <Route path='/addbookmark' element={<AddBookmark />} />
                    <Route path='/logout' element={<Logout />} />

                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;