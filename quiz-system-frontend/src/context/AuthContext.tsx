import { createContext, ReactNode, useContext, useEffect, useState } from "react"

// Định nghĩa kiểu dữ liệu cho user
interface User{
    token: string
    username: string
}

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType{
    user: User | null
    role: string | null
    login:  (token: string, username: string, role: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

//Component AuthProvider để cung cấp context
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [role, setRole] = useState<string | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        const storedRole = localStorage.getItem("role")
        if(storedUser && storedRole) {
            setUser(JSON.parse(storedUser))
            setRole(storedRole)
        }
    }, [])

    const login = (token: string, username: string, role: string) => {
        const newUser: User = {token, username}
        setUser(newUser)
        setRole(role)
        localStorage.setItem('user',JSON.stringify(newUser))
        localStorage.setItem('role', role)
    }

    const logout = () => {
        setUser(null)
        setRole(null)
        localStorage.removeItem('user')
        localStorage.removeItem('role')
    }

    return(
        <AuthContext.Provider value={{user, role, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

//Hook để sử dụng AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}