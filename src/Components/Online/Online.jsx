import UseisOnline from "../../Hook/UseOnline";

export default function Online(children) {
     let isOnline = UseisOnline() 
     if(isOnline) {
        return children
     }
}