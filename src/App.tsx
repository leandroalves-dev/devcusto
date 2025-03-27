import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import Company from './pages/Company'
import Contact from './pages/Contact'

//components
import Header from './components/Header';
 
function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/projects' element={<Projects />} />
                <Route path='/company' element={<Company />} />
                <Route path='/contact' element={<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
