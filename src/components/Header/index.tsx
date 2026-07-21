import { useState } from "react";
import { Link, useLocation } from "react-router-dom"

//icons
import { BsJustify, BsX } from "react-icons/bs"

//components
import Container from "../Container"
import Welcome from "../Welcome";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/company", label: "Sobre" },
        { to: "/projects", label: "Projetos" },
        { to: "/contact", label: "Contato" },
    ];

    const isActive = (path: string) => {
        if (path === "/") return location.pathname === "/";
        return location.pathname.startsWith(path);
    };

    return (
        <header className="bg-surface border-b border-border">

            <div className="hidden md:flex bg-primary/10 border-b border-border">
                <Container className="flex justify-end items-center h-9">
                    <ul className="flex items-center gap-4 text-sm">
                        <Welcome />
                    </ul>
                </Container>
            </div>

            <Container className="flex justify-between items-center h-16">

                <Link to='/' className="flex gap-3 items-center">
                    <img src={`/logo.png?${new Date().getTime()}`} alt="DevCusto" className="h-8" />
                    <div className="flex flex-col leading-tight">
                        <span className="text-lg font-semibold text-text tracking-tight">Dev<span className="text-primary">Custo</span></span>
                    </div>
                </Link>

                <div className='md:hidden'>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 text-text-secondary hover:text-text transition-colors"
                        aria-label="Abrir menu"
                    >
                        <BsJustify size={22} />
                    </button>
                </div>

                <nav className="hidden md:flex">
                    <ul className="flex items-center gap-1">
                        {navLinks.map(link => (
                            <li key={link.to}>
                                <Link
                                    to={link.to}
                                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                                        isActive(link.to)
                                            ? "text-text bg-surface-hover"
                                            : "text-text-secondary hover:text-text hover:bg-surface-hover/50"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile menu */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setMenuOpen(false)}
                    />
                )}

                <div className={`fixed top-0 right-0 w-72 h-full bg-surface border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <span className="text-sm font-medium text-text">Menu</span>
                        <button
                            className="p-1 text-text-secondary hover:text-text transition-colors"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Fechar menu"
                        >
                            <BsX size={20} />
                        </button>
                    </div>

                    <div className="p-4">
                        <div className="mb-6">
                            <ul className="flex flex-col gap-1 text-sm">
                                <Welcome />
                            </ul>
                        </div>

                        <nav>
                            <ul className="flex flex-col gap-1" onClick={() => setMenuOpen(false)}>
                                {navLinks.map(link => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            className={`block px-3 py-2.5 text-sm rounded-md transition-colors ${
                                                isActive(link.to)
                                                    ? "text-text bg-surface-hover"
                                                    : "text-text-secondary hover:text-text hover:bg-surface-hover/50"
                                            }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

            </Container>
        </header>
    )
}

export default Header
