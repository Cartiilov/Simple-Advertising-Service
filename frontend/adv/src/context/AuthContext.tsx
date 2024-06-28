/* eslint-disable no-prototype-builtins */
import {
    type ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { jwtDecode } from "jwt-decode";
  // import { decomposeColor } from '@mui/material';
  
  /*Email: admin@admin.pl
  Hasło: zaq1@WSX */
  
  interface IAuthContextType {
    isLogged: boolean;
    isAdmin: boolean;
    setIsLogged: (state: boolean) => void;
      token: string | null,
      setToken: (state: string) => void
  }
  
  const AuthContext = createContext<IAuthContextType>({
    isLogged: false,
    isAdmin: false,
    setIsLogged: () => {},
      token: "",
      setToken: () => {}
  ,
  });
  
  const pre_token = "http://schemas.microsoft.com/ws/2008/06/identity/claims/";
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState<string | null>("")
  
    useEffect(() => {
      console.log("property token exists" + localStorage.hasOwnProperty("token"));
      if (localStorage.hasOwnProperty("token")) {
        const token = localStorage.getItem("token");
        let decoded: any = null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        try{
          decoded = jwtDecode(token == null ? "" : token);
        } catch (err) {
          console.log(err);
        }
        const claim_str = pre_token + "role";
  
        // console.log(decoded[claim_str])
  
        setIsLogged(true);
  
        if (decoded[claim_str] === "Admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    }, []);
    useEffect(() => {
      // if(localStorage.hasOwnProperty("token") && localStorage.hasOwnProperty("user"))
      if(localStorage.hasOwnProperty("token"))    
      {
          setIsLogged(true)
          setToken(localStorage.getItem("token"));
      }
  }, [])
    return (
      <AuthContext.Provider value={{ isLogged, isAdmin, setIsLogged, token, setToken }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export default useAuth;
  