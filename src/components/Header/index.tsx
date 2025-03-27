import { useState } from "react";
import { Link } from "react-router-dom"

//icons
import { BsJustify, BsLock, BsPersonFill, BsX } from "react-icons/bs"

//components
import Container from "../Container"

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <header className="h-30 md:h-40 bg-neutral-900">

            <div className="hidden md:flex bg-[#FF3C32] h-10">
                <Container>
                    <nav>
                        <ul className="flex justify-end items-center gap-4 h-10">
                            <li>Olá visitante!</li>
                            <li className="flex items-center hover:text-white cursor-pointer"><BsLock /> <Link to='/register'>Cadastrar</Link></li>
                            <li className="flex items-center hover:text-white cursor-pointer"><BsPersonFill /> <Link to="/login">Entrar</Link></li>
                        </ul>
                    </nav>
                </Container>
            </div>

            <Container className="md:flex justify-between items-center pt-6">
                
                <Link to='/' className="flex gap-4 items-center justify-center sm:justify-centerlex">
                    <img src="./logo.png" alt="DevCusto" />
                    <div className="flex flex-col leading-5">
                        <h1 className="text-2xl text-white">Dev<span className="text-[#FF3C32]">Custo</span></h1>
                        <h2 className="text-white text-sm sm:text-[12px] ">O melhor custo e desenvolvimento</h2>
                    </div>
                </Link>

                <div className='md:hidden absolute top-10 left-3'>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {!menuOpen && (
                            <BsJustify size={30} className='text-white' />
                        )}
                    </button>
                </div>

                <div className="hidden md:flex">
                    <nav>
                        <ul className="flex gap-5 text-white text-[18px]">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/projects">Projetos</Link></li>
                            <li><Link to="/company">Compania</Link></li>
                            <li><Link to="/contact">Contato</Link></li>
                        </ul>
                    </nav>
                </div>

                
                {/*MENU MOBILE*/}
                <div className={`fixed top-0 right-0 w-64 h-full bg-[#FF3C32] z-99  transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
                    <button className="absolute top-4 right-4 text-white" onClick={() => setMenuOpen(false)}>
                            <BsX size={30} />
                    </button>
                    
                    
                    <div className="p-4">
                        <nav>
                            <ul className="flex flex-col gap-2">
                                <li>Olá visitante!</li>
                                <li className="flex items-center hover:text-white cursor-pointer"><BsLock /> Cadastrar</li>
                                <li className="flex items-center hover:text-white cursor-pointer"><BsPersonFill /> Entrar</li>
                            </ul>
                        </nav>

                        <nav className="mt-4">
                            <ul className="flex flex-col gap-2 text-white text-[18px]">
                                <li className="border-b-1 border-white/20 pb-2"><Link to="/">Home</Link></li>
                                <li className="border-b-1 border-white/20 pb-2"><Link to="/projects">Projetos</Link></li>
                                <li className="border-b-1 border-white/20 pb-2"><Link to="/company">Compania</Link></li>
                                <li><Link to="/contact">Contato</Link></li>
                            </ul>
                        </nav>
                    </div>

                </div>

            </Container>
        </header>
    )
}

export default Header
