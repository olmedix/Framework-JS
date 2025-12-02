import { createContext,useState } from "../core/hooks";

export const AuthContext = createContext({
  user:null,
  setUser: () => {}
})


export function AuthProvider({children}){
  const [user,setUser] = useState(null);

  return (
    <AuthContext.Provider value = {{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

