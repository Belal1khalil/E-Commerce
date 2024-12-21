import UseisOnline from "../../Hook/UseOnline";

export default function Offline({children}) {
     let isOnline = UseisOnline() 
    
     if(!isOnline) {
        return children
     }
}