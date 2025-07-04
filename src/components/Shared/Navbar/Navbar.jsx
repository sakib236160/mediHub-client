// import { Link, NavLink } from "react-router-dom";
// import logo from "../../../assets/images/logo.png";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProvider";
// import Container from "../Container";

// const Navbar = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await logOut();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="fixed z-10 bg-white/90 w-full shadow-sm">
//       <Container>
//         <nav className="flex items-center justify-between py-4">
//           {/* Logo + Name */}
//           <Link to="/" className="flex items-center gap-2">
//             <img src={logo} alt="Logo" className="w-48" />
//           </Link>
//           <ul className="flex items-center gap-6 text-gray-700 font-medium">
//             <NavLink
//               to="/"
//               className={({ isActive }) => (isActive ? "text-primary" : "")}
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/contact"
//               className={({ isActive }) => (isActive ? "text-primary" : "")}
//             >
//               Contact
//             </NavLink>

//             {user && (
//               <NavLink
//                 to="/available-camps"
//                 className={({ isActive }) => (isActive ? "text-primary" : "")}
//               >
//                 Available Camps
//               </NavLink>
//             )}
//           </ul>

//           {/* Right Side */}
//           <div className="flex items-center gap-3 relative">
//             {user ? (
//               <div className="relative">
//                 <img
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   src={user.photoURL}
//                   alt="Profile"
//                   className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
//                   referrerPolicy="no-referrer"
//                 />
//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
//                     <div className="px-4 py-2 text-gray-700 font-semibold">
//                       {user.displayName || "User"}
//                     </div>
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-2 text-gray-700 hover:bg-primary/10"
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-primary/10"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90"
//               >
//                 Join Us
//               </Link>
//             )}
//           </div>
//         </nav>
//       </Container>
//     </div>
//   );
// };

// export default Navbar;

import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Container from "../Container";
import { Menu, X } from "lucide-react"; // for hamburger icon

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        Contact
      </NavLink>
      {user && (
        <>
          <NavLink
            to="/available-camps"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Available Camps
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Dashboard
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="fixed z-10 bg-white/90 w-full shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-48" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
            {navLinks}
          </ul>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <img
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                  referrerPolicy="no-referrer"
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <div className="px-4 py-2 text-gray-700 font-semibold">
                      {user.displayName || "User"}
                    </div>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-primary/10"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-primary/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signup"
                className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90"
              >
                Join Us
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 px-6 flex flex-col gap-4 text-gray-700 font-medium md:hidden z-50">
              {navLinks}
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-left px-2 py-2 text-gray-700 hover:bg-primary/10"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 text-center"
                >
                  Join Us
                </Link>
              )}
            </div>
          )}
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;

