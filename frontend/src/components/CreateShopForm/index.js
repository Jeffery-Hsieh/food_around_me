import React, { Component } from "react"
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


class CreateShopForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shopName:"",
      category:"",
      country:"",
      region:"",
      phone:"",
      address:"",
      description:"",
    }
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name
    
    this.setState({
      [name]: value
    });
  }

  selectCountry = country => {
    this.setState({
      country:country
    })
  }

  selectRegion = region => {
    this.setState({
      region:region
    })
  }

  handleOnChange = (value) => {
    this.setState({ phone: value })
  }

  handleSubmit = (event) => {
    const { createShop, coinbase } = this.props
    createShop(this.state, coinbase)
    event.preventDefault()
  }

  render() {
    const { categories } = this.props
    return(
      <div className="container">
        <Form>
          <FormGroup>
            <div className="row">
              <div className="col">
                <Label for="shopNameInput">ShopName</Label>
                <Input
                  type="text"
                  name="shopName"
                  value={this.state.shopName}
                  onChange={this.handleInputChange}
                  required
                  />
              </div>
              <div className="col">
                <Label for="phoneInput">Phone number</Label>
                <ReactPhoneInput
                  defaultCountry={'tw'}
                  value={this.state.phone}
                  onChange={this.handleOnChange}
                  />
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <div className="row">
              <div className="col">
                <Label for="categorySelect">Category</Label>
                <Input type="select" defaultValue="Select Category" name="category" onChange={this.handleInputChange}>
                  <option>Select Category</option>
                  {categories.map((category, index) =>
                    <option key={index}>{category}</option>
                  )}
                </Input>
              </div>
              <div className="col">
                <Label for="countrySelect">Country</Label>
                  <CountryDropdown
                    classes="form-control"
                    value={this.state.country}
                    onChange={this.selectCountry} />
              </div>
              <div className="col">
                <Label for="citySelect">City/Region</Label>
                <RegionDropdown
                  classes="form-control"
                  country={this.state.country}
                  value={this.state.region}
                  onChange={this.selectRegion}
                />
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <Label for="AddressInput">Address</Label>
            <Input type="text" name="address" onChange={this.handleInputChange}/>
          </FormGroup>

          <FormGroup>
            <Label for="descriptionInput">Description</Label>
            <Input type="textarea" name="description" placeholder="Shop Description" onChange={this.handleInputChange}/>
          </FormGroup>

          <FormGroup>
            <Label for="photoBrowser">Upload photos</Label>
            <CustomInput id="1" type="file" name="customFile"/>
          </FormGroup>

          <Button
            onClick={this.handleSubmit}
          >
          Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default CreateShopForm
