import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages
import Home from './pages/Home'
import Projects from './pages/Projects'

import Company from './pages/Company'
import Contact from './pages/Contact'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';

//components
import Header from './components/Header';
import NewProjects from './components/NewProjects'
//context
import { AuthProvider } from './context/authContext';
 
function App() {
    return (
        <div className='bg-neutral-950 h-screen'>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/projects' element={<Projects />} />
                        <Route path='/company' element={<Company />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/reset' element={<ForgotPassword />} />
                        <Route path='/new-projects' element={<NewProjects />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}

export default App
