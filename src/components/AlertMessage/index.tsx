type AlertType = "success" | "error";

interface AlertMessageProps {
    type?: AlertType;
    message?: string;
}

const AlertMessage = ({ type = 'success', message }: AlertMessageProps) => {
    if (!message) return null;

    const typeStyles = {
        success: "bg-success-subtle border-success/20 text-success",
        error: "bg-error-subtle border-error/20 text-error",
    };

    return (
        <p className={`text-center text-sm font-medium px-4 py-2.5 rounded-md border mt-3 ${typeStyles[type]}`}>
            {message}
        </p>
    )
}

export default AlertMessage
