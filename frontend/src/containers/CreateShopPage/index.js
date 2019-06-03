import React, { Component } from "react"
import { createShop, connectWeb3 } from "../../redux/actions"
import CreateShopForm from "../../components/CreateShopForm"
import { connect } from "react-redux"


class CreateShopPage extends Component {
  componentDidMount() {
    const { connectWeb3 } = this.props
    connectWeb3();
  }

  render() {
    return (
      <div>
        <CreateShopForm
          {...this.props}
        />
      </div>
    );
  }
}


const mapDispatch = { createShop, connectWeb3 }

const mapState = ({ search, web3 }) => ({
  categories: search.categories,
  status: search.isLoading,
  coinbase: web3.coinbase,
  balance: web3.balance,
  status: web3.shopIsCreated,
})

export default connect(mapState, mapDispatch)(CreateShopPage);
