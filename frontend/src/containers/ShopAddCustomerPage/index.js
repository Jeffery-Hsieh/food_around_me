import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { getShopDetail, connectWeb3, addCustomer } from "../../redux/actions"

class ShopAddCustomerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customerAddress:""
    }
  }

  componentDidMount() {
    const { connectWeb3, getShopDetail, shopId } = this.props
    getShopDetail(shopId)
    connectWeb3()
  }

  handleChange = event => {
    this.setState({
      customerAddress:event.target.value
    })
  }

  handleSubmit = event => {
    const { addCustomer , shop, coinbase } = this.props
    addCustomer(shop.contractAddress, this.state.customerAddress, coinbase)
    this.setState({
      customerAddress:""
    })
  }

  render() {
    const { shop } = this.props
    return (
      <div className="container">
        <Form>
          {shop
            ? <FormGroup>
                <Label for="shopName">{ shop.shopName }</Label>
              </FormGroup>
            : null
          }
          <FormGroup>
            <Label for="exampleText">Your client address</Label>
            <Input
              type="textarea"
              name="comment"
              value={this.state.customerAddress}
              onChange={this.handleChange}
              />
          </FormGroup>

          <Button
            onClick={this.handleSubmit}
          >
          Submit
          </Button>

        </Form>
      </div>
    );
  }
}

const mapState = ({ search, web3 }, ownProps) => ({
  shop: search.shopDetail,
  coinbase: web3.coinbase,
  shopId: ownProps.match.params.shopId
})

const mapDispatch = { getShopDetail, connectWeb3, addCustomer }

export default connect(mapState, mapDispatch)(ShopAddCustomerPage);
