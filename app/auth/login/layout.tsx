
const AuthLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <div className="flex bg-gray-100 flex-col items-center justify-center h-screen">
            {children}
        </div>
    );
}

export default AuthLayout;