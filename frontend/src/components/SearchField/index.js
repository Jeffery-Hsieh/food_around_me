import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "./index.css";

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }

  select = (event) => {
    const { type, handleChange } = this.props;
    handleChange(event.target.innerText);
  }

  render() {
    const {type, options, search} = this.props;

    return(
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="col-2">
          <DropdownToggle caret>
            {search ? search : type}
          </DropdownToggle>
          <DropdownMenu>
            { options.map((option,index) =>
              <DropdownItem
                key={index}
                onClick={this.select}
                >
                {option}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
    )
  }
}

export default SearchField;
