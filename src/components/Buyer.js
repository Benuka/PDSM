import React, { Component } from 'react';

class Buyer extends Component {

  render() {
    return (
      <div id="content">
        <h2>Buyer</h2>
        <h3>Validate Product</h3>
        <form onSubmit={(event) => {
          event.preventDefault();
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price);
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product address"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Validate</button>
          
        </form>
        <hr/>
        <p><b>Invalid Product</b></p>
            
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <h3>Buy Product</h3>

        <form onSubmit={(event) => {
          event.preventDefault();
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price);
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product address"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Buy</button>
          
        </form>
        
      </div>
    );
  }
}

export default Buyer;