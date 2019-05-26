import React from 'react';
import { NavLink as RRDNav } from 'react-router-dom';
import { NavbarToggler, Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import "./index.css"

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNavbar: false
    };
  }

  toggleNavbar = e => {
    e.preventDefault();
    this.setState({
      showNavbar: !this.state.showNavbar
    });
  }

  render() {
    const link_page = ["shops","profile"]
    const link = link_page.map((page, index) => {
      return(
        <NavItem key={index} className="mr-5">
          <NavLink tag={RRDNav} to={`/${page}/`} activeClassName="active">
            <img className="mr-2" src={require(`../../Assets/${page}_icon.png`)} alt={`${page}`} />
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
