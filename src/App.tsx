import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Company from './pages/Company'
import Contact from './pages/Contact'
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

//components
import Header from './components/Header';
 
function App() {
    return (
        <div className='bg-neutral-950 h-screen'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/company' element={<Company />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
