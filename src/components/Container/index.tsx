export interface ContainerProps {
    children: React.ReactNode
    className?: string
}

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={`max-w-6xl w-full mx-auto px-6 flex-grow ${className ?? ''}`}>
            {children}
        </div>
    )
}

export default Container
