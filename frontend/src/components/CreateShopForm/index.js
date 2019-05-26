import React, { Component } from "react"
import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap'

class CreateShopForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shopName:"",
      category:"",
      country:"",
      city:"",
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

  handleSubmit = (event) => {
    const { createShop, coinbase } = this.props
    createShop(this.state, coinbase)
    event.preventDefault()
  }

  render() {
    const { categories, countries, cities } = this.props
    return(
      <div className="container">
        <Form>
          <FormGroup>
            <Label for="shopNameInput">ShopName</Label>
            <Input
              type="text"
              name="shopName"
              placeholder="Your shopName"
              onChange={this.handleInputChange}
              required
              />
          </FormGroup>
          <FormGroup>
            <div className="row">
              <div className="col">
                <Label for="categorySelect">Category</Label>
                <Input type="select" name="category" onChange={this.handleInputChange}>
                  {categories.map((category, index) =>
                    <option key={index}>{category}</option>
                  )}
                </Input>
              </div>
              <div className="col">
                <Label for="countrySelect">Country/Region</Label>
                <Input type="select" name="country" onChange={this.handleInputChange}>
                  {countries.map((country, index) =>
                    <option key={index}>{country}</option>
                  )}
                </Input>
              </div>
              <div className="col">
                <Label for="citySelect">City</Label>
                <Input type="select" name="city" onChange={this.handleInputChange}>
                  {cities.map((city, index) =>
                    <option key={index}>{city}</option>
                  )}
                </Input>
              </div>
            </div>
          </FormGroup>

          <FormGroup>
            <Label for="AddressInput">Address</Label>
            <Input type="text" name="address" placeholder="Address" onChange={this.handleInputChange}/>
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
