
//components
import { useState } from "react"
import Buttons from "../../components/Buttons"
import Input from "../../components/Input"

//auth
import { resetPassword } from "../../services/auth"

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setMessage('')
        setError('')

        if(!email){
            setError('Por favor, digite um e-mail válido');
            return
        }

        try {

            const response = await resetPassword(email)
            setMessage(response);
            setEmail('')
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                throw new Error('Erro desconhecido. Tente novamente');
            } else {
                throw new Error('Erro desconhecido. Tente novamente');
            }
        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
        <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="mt-10 w-[100%] sm:w-[60%] mx-auto">
                    <h2 className="text-2xl mb-5 text-white/90">Recuperar Senha</h2>
                    <Input label="E-mail" type="text" name="email" value={email} placeholder="Digite seu e-mail..." onChange={handleInputChange} />
                    <Buttons title="Enviar e-mail" />

                    {error && (
                        <p className="bg-red-200 border border-red-300 text-center p-2 rounded-[3px] text-zinc-700">{error}</p>
                    )}
                    {message && (
                        <p className="bg-green-100 border border-green-300 text-center p-2 rounded-[3px] text-zinc-700">{message}</p>
                    )}
                </form>
        </div>
    )
}

export default ForgotPassword
