import { Link, NavLink } from "react-router-dom";
import freshcartlogo from "../../assets/imgs/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";

export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { CartInfo, GetCartProducts } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    GetCartProducts();
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navLinkClasses = ({ isActive }) =>
    `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] 
    before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${
      isActive ? "before:w-full font-semibold" : ""
    }`;

  return (
    <nav className="navbar bg-slate-100 shadow-sm py-3 fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center justify-between gap-5 md:gap-12">
        {/* Logo */}
        <a href="" className="block ml-2">
          <img src={freshcartlogo} alt="FreshCart Logo" />
        </a>

       

        {/* Navigation Menu */}
        <div
          className={`absolute top-[60px] left-0 w-full bg-slate-100 md:static md:w-auto md:flex items-center gap-5 transition-all duration-300 space-x-6 ${
            isMenuOpen ? "block" : "hidden md:block"
          }`}
        >
          {token && (
            <>
            <ul className="flex flex-col md:flex-row gap-5 items-center">
              <li>
                <NavLink className={navLinkClasses} to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/cart">
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/products">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/categories">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/brands">
                  Brands
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink className={navLinkClasses} to="/allorders">
                  Orders
                </NavLink>
              </li>
              {/* Log Out Option for Small Screens */}
              <li className="block md:hidden">
                <button
                  onClick={logOut}
                  className="flex items-center gap-2 text-red-600 font-medium"
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Log Out
                </button>
              </li>
            </ul>
              <ul className={` hidden md:flex items-center gap-5 ${!token && "ms-auto"}`}>
            <li>
               <a href="https://instagram.com" target="_blank">
              <i className="fa-brands fa-instagram"></i>
               </a>
             </li>
             <li>
               <a href="https://facebook.com" target="_blank">
                 <i className="fa-brands fa-facebook"></i>
               </a>
             </li>
             <li>
                <a href="https://tiktok.com" target="_blank">
                  <i className="fa-brands fa-tiktok"></i>
               </a>
            </li>
           <li>
               <a href="https://twitter.com" target="_blank">
                 <i className="fa-brands fa-twitter"></i>
               </a>
           </li>
          <li>
              <a href="https://linkedin.com" target="_blank">
                 <i className="fa-brands fa-linkedin"></i>
              </a>
           </li>
           <li>
              <a href="https://youtube.com" target="_blank">
                 <i className="fa-brands fa-youtube"></i>
           </a>
           </li>
              </ul>
            </>
          )}
         <ul className="flex flex-col items-center gap-5 mt-5 sm:flex-col md:flex-row md:mt-0">
             {!token && (
              <>
             <li>
              <NavLink className={navLinkClasses} to="/signup">
                  Sign up
              </NavLink>
             </li>
             <li>
              <NavLink className={navLinkClasses} to="/login">
                Log in
              </NavLink>
         </li>
           </>
           )}
        </ul>

        </div>
         
          {/* Toggle Button & Cart Icon (Small Screens) */}
        <div className="flex items-center gap-5 ">
          {token && (
            <Link to="/cart" className="relative">
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <div className="cart-counter absolute flex items-center justify-center w-5 h-5 bg-primary-800 text-white rounded-full top-0 right-0 translate-x-1/2 -translate-y-1/2">
                {CartInfo === null ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : (
                  <span className="text-sm font-semibold">
                    {CartInfo.numOfCartItems}
                  </span>
                )}
              </div>
            </Link>
          )}
          <button
            className="text-xl mx-2 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
          </button>
        </div>
        
        {/* Log Out Button */}
        {token && (
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={logOut}
              className="flex items-center gap-2  font-semibold bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}


