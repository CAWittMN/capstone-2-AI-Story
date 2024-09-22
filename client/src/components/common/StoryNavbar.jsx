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
import { useSpring, animated } from "@react-spring/web";

const StoryNavbar = ({ isLoggedIn, isAdmin, currUser, logout }) => {
  const navigate = useNavigate();
  const springs = useSpring({
    config: { duration: 1000 },
    from: { y: -100, opacity: 1 },
    to: {
      y: 0,
      opacity: 1,
    },
    delay: 5000,
  });
  return (
    <animated.div style={{ ...springs }}>
      <Navbar position="sticky" isBlurred={true} shouldHideOnScroll={true}>
        <NavbarBrand>
          <Link to={"/"}>
            <img className="rounded-lg" src={logo} alt="logo" />
          </Link>
          {isLoggedIn && (
            <Link to={"/"}>
              <h3
                className=" ml-3 text-white select-none border px-3 py-1 rounded-xl opacity-80 text-xl font-bold"
                style={{ fontFamily: "Lora" }}
              >
                Stories
              </h3>
            </Link>
          )}
          {isAdmin && (
            <Link to={`/admin`}>
              <h3
                className=" ml-3 text-white select-none border px-3 py-1 rounded-xl opacity-80 text-xl font-bold"
                style={{ fontFamily: "Lora" }}
              >
                Admin
              </h3>
            </Link>
          )}
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
    </animated.div>
  );
};

export default StoryNavbar;
