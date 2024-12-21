import { createContext, useState } from "react";



 export const UserContext = createContext(null); 
 
 // eslint-disable-next-line react/prop-types
 export default function UserProvider({children}) {
    const [token , setToken] = useState(localStorage.getItem("token"))
  
    function logOut() {
    setToken(null)
    localStorage.removeItem("token")
     
    }
    return (
        <UserContext.Provider value={{token , setToken, logOut}}>
             {children}
        </UserContext.Provider>
    )
 }













































// /* eslint-disable react-hooks/rules-of-hooks */
// import { createContext, useState } from "react";

//  // eslint-disable-next-line react-refresh/only-export-components
//  export const UserContext = createContext(null);


//  // eslint-disable-next-line react/prop-types
//  export default function UserProvider({children}) {

//   const [token , SetToken] = useState(null)

//   return  <UserContext.Provider value={{token , SetToken }}>
//    {children}
//     </UserContext.Provider>
//  }