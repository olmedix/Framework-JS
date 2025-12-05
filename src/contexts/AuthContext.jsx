import { createContext,useState } from "../core/hooks.js";

const token = localStorage.getItem('authToken');
let userdata = JSON.parse(localStorage.getItem('user'));

export const AuthContext = createContext( ()=>{
  {token && userdata ? 
    {user:userdata, setUser: () => {}}: 
    {user:null, setUser: () => {}} 
  }
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(token ? userdata : null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}


