import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
export default function CustomNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  let { user, logOut } = useUserAuth();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="my-nav">
      <Navbar expand="md" fixed="" className="px-3 shadow-sm">
        <NavbarBrand tag={ReactLink} to="/home" className="logo">
          CAR.RENT{" "}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            style={{
              color: "#5D5A88",
            }}
            className="me-auto"
            navbar
          ></Nav>
          <Nav>
            <NavItem>
              <NavLink tag={ReactLink} to="/home" className="nav-items">
                Home{" "}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/about" className="nav-items">
                About
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/dashboard" className="nav-items">
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/list-vehicle" className="nav-items">
                List Vehicle
              </NavLink>
            </NavItem>
            {user && (
              <NavItem>
                <NavLink tag={ReactLink} to="/home" className="nav-items">
                  {user.displayName}
                </NavLink>
              </NavItem>
            )}
            {user && (
              <NavItem>
                <NavLink>
                  <Button
                    style={{
                      background: "#5D5A88",
                    }}
                    onClick={logOut}
                  >
                    Logout
                  </Button>
                </NavLink>
              </NavItem>
            )}
            {!user && (
              <NavItem>
                <NavLink tag={ReactLink} to="/login" className="nav-logins">
                  <Button
                    style={{
                      background: "#5D5A88",
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
              </NavItem>
            )}
            {!user && (
              <NavItem>
                <NavLink tag={ReactLink} to="/signUp" className="nav-logins">
                  <Button
                    style={{
                      background: "#5D5A88",
                    }}
                  >
                    Signup
                  </Button>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
