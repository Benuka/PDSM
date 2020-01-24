import React, { Component } from 'react';
import Web3 from 'web3'
import logo from '../logo.png';
import './App.css';
import Marketplace from '../abis/Marketplace.json'
import Navbar from './NavBar';
import Main from './Main'
import Buyer from './Buyer'
import Authority from  './Authority'
import Transfer from './Transfer'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Marketplace.networks[networkId]
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({marketplace})
      const productCount = await marketplace.methods.productCount().call()
      const deployedProductCount = await marketplace.methods.deployedProductCount().call()
      console.log(deployedProductCount.toString())
      this.setState({productCount})
      this.setState({deployedProductCount})
      //load products
      for(var i=1; i<= productCount; i++){
        const product = await marketplace.methods.products(i).call()
        this.setState({
          products: [...this.state.products, product]
        })
      }
      // load deployedproducts
      for(var i=1; i<= deployedProductCount; i++){
        const deployedproduct = await marketplace.methods.deployedproducts(i).call()
        console.log(deployedproduct)
        this.setState({
          deployedproducts: [this.state.deployedproducts, deployedproduct]
        })
      }
      this.setState({ loading: false })

      console.log(marketplace)
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  createProduct(name, description, price, mfdate, expdate) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, description, price, mfdate, expdate).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseProduct(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  approveProducts(id, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.approveProducts(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }

    this.createProduct = this.createProduct.bind(this)
    this.approveProducts = this.approveProducts.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                :  <Main 
                products={this.state.products}
                createProduct={this.createProduct}/>
              }
          </main>
          </div>
          <hr/>
          <br/><br/><br/>
          <br/><br/><br/>
          <hr/>
          <Authority
          products={this.state.products}
          createProduct={this.createProduct}
          approveProducts={this.approveProducts}/> 

          <br/><br/><br/>
          <Buyer
            products={this.state.products}
            deployedproducts={this.state.deployedproducts}
            createProduct={this.createProduct}
            approveProducts={this.approveProducts}/>

<br/><br/><br/>
          {/* <Transfer
            products={this.state.products}
            deployedproducts={this.state.deployedproducts}
            createProduct={this.createProduct}
            approveProducts={this.approveProducts}/> */}
       
        </div>
      </div>
    );
  }
}

export default App;