export interface ContainerProps{
    children: React.ReactNode
    className?: string
}

const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={`max-w-7xl w-full mx-auto px-3 ${className}`}>
            {children}
        </div>
    )
}

export default Container
