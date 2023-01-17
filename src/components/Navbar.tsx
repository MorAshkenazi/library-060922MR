import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {
  let navigate = useNavigate();
  return (
    <>
      <h1 className="bg-dark text-light">Book Collection</h1>
      {isLoggedIn && (
        <button
          className="btn btn-info"
          onClick={() => {
            sessionStorage.setItem("isLoggedIn", "false");
            navigate("/");
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>
      )}
    </>
  );
};

export default Navbar;
