import { Link } from "react-router-dom"

//icons
import { BsLock, BsPersonFill } from "react-icons/bs"
import { FiLogOut } from "react-icons/fi"

//context
import { useAuth } from "../../context/useAuth"

const Welcome = () => {

    const {user, logout} = useAuth()

    return (
        <>
            {user ? (
                <>
                    <li>Bem-vindo {user.displayName}</li>
                    <li className="flex items-center hover:text-white cursor-pointer" onClick={logout}><FiLogOut /></li>
                </>
            ):(
                <>
                    <li>Olá visitante!</li>
                    <li className="flex items-center hover:text-white cursor-pointer"><BsLock /> <Link to='/register'>Cadastrar</Link></li>
                    <li className="flex items-center hover:text-white cursor-pointer"><BsPersonFill /> <Link to="/login">Entrar</Link></li>
                </>
            )}
        </>
    )
}

export default Welcome