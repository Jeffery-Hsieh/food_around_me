import React from 'react';
import { Link, NavLink as RRDNav } from 'react-router-dom';
import { NavbarToggler, Container, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import shop from "../Assets/shop_icon.png"
import board from "../Assets/shop_icon.png"
import rank from "../Assets/rank_icon.png"
import profile from "../Assets/profile_icon.png"
import "./index.css"

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      showNavbar: false
    };
  }

  toggleNavbar(e) {
    e.preventDefault();
    this.setState({
      showNavbar: !this.state.showNavbar
    });
  }

  render() {
    const link_page = ["shop","rank","board","profile"]
    const link = link_page.map((page, index) => {
      return(
        <NavItem key={index} className="mr-4">
          <NavLink tag={RRDNav} to={`/${page}/`} activeClassName="active">
            <img className="mr-2" src={require(`../Assets/${page}_icon.png`)} alt={`${page}`} />
            {page}
          </NavLink>
        </NavItem>
      )
    })

    return (
      <React.Fragment>
        <Navbar color="light" light expand="md">
         <NavbarBrand href="/">Food Around Me</NavbarBrand>
         <NavbarToggler onClick={this.toggle} />
         <Collapse isOpen={this.state.isOpen} navbar>
           <Nav className="ml-auto" navbar>
              { link }
            </Nav>
          </Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
