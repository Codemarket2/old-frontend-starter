import React from "react";
import { Col, Row, NavItem, Nav, NavLink, NavbarText } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

const VerticalNav = ({ children }) => {
  return (
    <div>
      <Row>
        <Col xs="1">
          <Nav vertical>
            <NavItem>
              <NavbarText>Data</NavbarText>
            </NavItem>
            <NavItem>
              <NavLink
                className="vertical-link"
                activeClassName="activenav"
                tag={Link}
                to="/data/yelp"
              >
                Yelp
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="vertical-link"
                activeClassName="activenav"
                tag={Link}
                to="/data/linkedin"
              >
                LinkedIn
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col>{children}</Col>
      </Row>
    </div>
  );
};

export default VerticalNav;
