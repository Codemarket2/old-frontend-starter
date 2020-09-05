import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { unsetAuthUser } from "../redux/actions/auth";
import { setRedirectPath } from "../redux/actions/redirect";

const NavC = (props) => {
  const { ivdrips, therapies, teams, services } = props.data;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    Auth.signOut().then(() => {
      localStorage.removeItem("frontend-starter");
      props.dispatch(unsetAuthUser());
    });
  };
  const handleRedirect = () => {
    props.dispatch(setRedirectPath("/"));
  };

  return (
    <>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand tag={Link} to="/">
          Beverly Hills
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Home
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                IV - Drip
              </DropdownToggle>
              <DropdownMenu>
                {ivdrips &&
                  ivdrips.map((i, idx) => (
                    <DropdownItem key={idx} tag={Link} to={`/ivdrip/${i.slug}`}>
                      {i.title}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Therapies
              </DropdownToggle>
              <DropdownMenu>
                {therapies &&
                  therapies.map((i, idx) => (
                    <DropdownItem
                      key={idx}
                      tag={Link}
                      to={`/therapies/${i.slug}`}
                    >
                      {i.title}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Other Services
              </DropdownToggle>
              <DropdownMenu>
                {services &&
                  services.map((i, idx) => (
                    <DropdownItem
                      key={idx}
                      tag={Link}
                      to={`/services/${i.slug}`}
                    >
                      {i.title}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Team
              </DropdownToggle>
              <DropdownMenu>
                {teams &&
                  teams.map((i, idx) => (
                    <DropdownItem key={idx} tag={Link} to={`/team/${i.slug}`}>
                      {i.title}
                    </DropdownItem>
                  ))}
              </DropdownMenu>
            </UncontrolledDropdown> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Data
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem tag={Link} to="/map">
                  Map
                </DropdownItem> */}
                <DropdownItem tag={Link} to="/data/yelp">
                  Yelp Scrapper
                </DropdownItem>
                <DropdownItem tag={Link} to="/data/linkedin">
                  LinkedIn Scrapper
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                SES
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem tag={Link} to="/map">
                  Map
                </DropdownItem> */}
                <DropdownItem tag={Link} to="/createemailtemplate">
                  Create Email Template
                </DropdownItem>
                <DropdownItem tag={Link} to="/sendtemplateemail">
                  Send Template Email
                </DropdownItem>
                <DropdownItem tag={Link} to="/email">
                  Email
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Other
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/imageupload">
                  Image Upload
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          {props.auth.authenticated ? (
            <>
              <NavbarText className="pr-2 text-light">
                <img
                  className="my-n3 mr-1"
                  style={{ width: "40px", borderRadius: "50%" }}
                  src={
                    props.auth.data.attributes.imageUrl
                      ? props.auth.data.attributes.imageUrl
                      : require("../../assets/default.jpg")
                  }
                />
                {props.auth.data.attributes.name}
              </NavbarText>
              <NavbarText className="py-0">
                <Button onClick={handleLogout} color="light" outline>
                  Logout
                </Button>
              </NavbarText>
            </>
          ) : (
            <NavbarText className="py-0">
              <Link onClick={handleRedirect} to="/signin">
                <Button color="light" outline>
                  SignUp/SignIn
                </Button>
              </Link>
            </NavbarText>
          )}
        </Collapse>
      </Navbar>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(NavC);
