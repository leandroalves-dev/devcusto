//components
import { useState } from "react"
import Buttons from "../../components/Buttons"
import Input from "../../components/Input"
import Container from "../../components/Container"

//auth
import { resetPassword } from "../../services/auth"
import AlertMessage from "../../components/AlertMessage"

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
            setTimeout(() => { setError('') },2000)
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
        <Container>
            <div className="flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="mt-10 w-[100%] sm:w-[60%] mx-auto">
                    <h2 className="text-2xl mb-5 text-white/90">Recuperar Senha</h2>
                    <Input label="E-mail" type="text" name="email" value={email} placeholder="Digite seu e-mail..." onChange={handleInputChange} />
                    <Buttons title="Enviar e-mail" />
                    <AlertMessage type="error" message={error} />
                </form>
            </div>
        </Container>
    )
}

export default ForgotPassword
