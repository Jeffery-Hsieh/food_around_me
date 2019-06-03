import React, { Component } from "react"
import { connect } from "react-redux"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { createComment, getShopDetail, connectWeb3 } from "../../redux/actions"
import { Redirect } from "react-router-dom"

class ShopCreateCommentPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: "",
      redirect: false,
    }
  }

  componentDidMount() {
    const { getShopDetail, shopId, connectWeb3 } = this.props
    getShopDetail(shopId)
    connectWeb3()
  }

  handleChange = event => {
    this.setState({
      comment:event.target.value
    })
  }

  handleSubmit = event => {
    const { createComment, shop, coinbase, shopId } = this.props
    createComment(shop.contractAddress, this.state.comment, coinbase)
  }

  render() {
    const { shop, shopId } = this.props
    if( this.state.redirect === true ) {
      return <Redirect to={`/shops/${shopId}`} />
    }

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
            <Label for="exampleText">Your Comment</Label>
            <Input
              type="textarea"
              name="comment"
              value={this.state.comment}
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

const mapDispatch = { getShopDetail, connectWeb3 ,createComment }

export default connect(mapState, mapDispatch)(ShopCreateCommentPage);
