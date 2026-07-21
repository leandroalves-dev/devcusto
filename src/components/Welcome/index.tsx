import { Link } from "react-router-dom"

//icons
import { BsLock, BsPersonFill } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"

//context
import { useAuth } from "../../context/useAuth"

const Welcome = () => {
    const { user, logout } = useAuth()

    return (
        <>
            {user ? (
                <>
                    <li className="text-text-secondary text-xs">Olá, {user.displayName}</li>
                    <li>
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 text-text-secondary hover:text-primary text-xs transition-colors"
                        >
                            <FiLogOut size={14} />
                            Sair
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className="text-text-secondary text-xs">Olá, visitante</li>
                    <li>
                        <Link to='/register' className="flex items-center gap-1.5 text-text-secondary hover:text-text text-xs transition-colors">
                            <BsLock size={12} />
                            Cadastrar
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="flex items-center gap-1.5 text-text-secondary hover:text-text text-xs transition-colors">
                            <BsPersonFill size={12} />
                            Entrar
                        </Link>
                    </li>
                </>
            )}
        </>
    )
}

export default Welcome
