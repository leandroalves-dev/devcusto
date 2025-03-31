
type AlertType = "success" | "error";

interface AlertMessageProps {
  type?: AlertType;
  message?: string;
}

const AlertMessage = ({ type = 'success', message}: AlertMessageProps) => {

    if(!message) return null;

    const baseStyles = 'text-center p-2 rounded-[3px] text-zinc-700 my-3 border'
    const typeStyles = {
        success: "bg-green-100 border-green-300",
        error: "bg-red-200 border-red-300",
    };

    return (
        <>
            <p className={`${baseStyles} ${typeStyles[type]}`}>{message}</p>;
        </>
    )
}

export default AlertMessage