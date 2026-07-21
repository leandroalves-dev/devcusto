import { useState } from "react"
import { Link } from "react-router-dom"

//components
import Buttons from "../../components/Buttons"
import Input from "../../components/Input"
import Container from "../../components/Container"
import AlertMessage from "../../components/AlertMessage"

//auth
import { resetPassword } from "../../services/auth"

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('')
        setError('')

        if (!email) {
            setError('Por favor, digite um e-mail válido');
            setTimeout(() => { setError('') }, 2000)
            return
        }

        try {
            const response = await resetPassword(email)
            setMessage(response);
            setTimeout(() => setMessage(''), 2000);
            setEmail('')

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
                throw new Error('Erro desconhecido. Tente novamente');
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    return (
        <Container>
            <div className="max-w-md mx-auto mt-16">
                <h2 className="text-2xl font-semibold text-text mb-1">Recuperar Senha</h2>
                <p className="text-text-muted text-sm mb-8">Digite seu e-mail para receber as instruções de recuperação.</p>

                <div className="bg-surface border border-border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input label="E-mail" type="email" name="email" value={email} placeholder="Digite seu e-mail" onChange={handleInputChange} />
                        <div className="pt-2">
                            <Buttons title="Enviar Link de Recuperação" />
                        </div>
                        <AlertMessage type="error" message={error} />
                        <AlertMessage type="success" message={message} />
                    </form>
                </div>

                <p className="text-center text-text-muted text-sm mt-6">
                    Lembrou a senha?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-hover transition-colors">
                        Voltar ao login
                    </Link>
                </p>
            </div>
        </Container>
    )
}

export default ForgotPassword
