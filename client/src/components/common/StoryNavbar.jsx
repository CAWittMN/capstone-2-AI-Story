import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

const StoryNavbar = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate();
  return (
    <Navbar position="sticky" isBlurred={true} shouldHideOnScroll={true}>
      <NavbarBrand>
        <Link to="/">
          <img className="rounded-lg" src={logo} alt="logo" />
        </Link>
        <h3
          className=" ml-3 text-white select-none opacity-80 text-2xl font-bold"
          style={{ fontFamily: "Lora" }}
        >
          Story Gen
        </h3>
      </NavbarBrand>
      {!isLoggedIn ? (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              variant="flat"
              auto
              size="small"
              color="success"
              onClick={() => navigate("/login")}
              style={{
                fontFamily: "Lora",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
              className="text-white"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              variant="ghost"
              auto
              size="small"
              color="success"
              onClick={() => navigate("/signup")}
              style={{
                fontFamily: "Lora",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
              className="text-white opacity-80"
            >
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <>
          <NavbarContent justify="center">
            <NavbarItem></NavbarItem>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <Button
                auto
                variant="ghost"
                size="small"
                color="warning"
                className="opacity-70 text-white"
                style={{
                  fontFamily: "Lora",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </NavbarItem>
          </NavbarContent>
        </>
      )}
    </Navbar>
  );
};

export default StoryNavbar;
