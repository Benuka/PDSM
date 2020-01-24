import React, { Component } from 'react';
//import {QRGenerator} from 'dynamic-qr-code-generator';
import QRCode from 'qrcode.react';

class Main extends Component {

  render() {
    var props={isLogo:true,value:'Your text or URL here'};
    return ( 
      <div id="content">
        <h2>Manufacturer</h2>
        <h3>Add Product</h3>
        <form onSubmit={(event) => {
          event.preventDefault();
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          const description = this.description.value
          const mfdate = this.mfdate.value
          const expdate = this.expdate.value
          this.props.createProduct(name, description, price, mfdate, expdate);
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="description"
              type="text"
              ref={(input) => { this.description = input }}
              className="form-control"
              placeholder="Product Description"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="mfdate"
              type="text"
              ref={(input) => { this.mfdate = input }}
              className="form-control"
              placeholder="Manufacturing Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="expdate"
              type="text"
              ref={(input) => { this.expdate = input }}
              className="form-control"
              placeholder="Expirtation Date"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        <p> </p>
        <h3>Product and Status</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">MF_Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              //console.log(key);
              console.log(product.isApproved);
                return(
                    <tr key={key}>
                        <th scope="row">{product.id.toString()}</th>
                        <td>{product.name.toString()}</td>
                        <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether') } Eth</td>
                        <td>{product.owner}</td>
                        {/* <td>{product.productKey}</td> */}
                        <td>{product.mfdate}</td>
                        <td>{product.isApproved
                        ?<p>Approved</p> : <p>Pending</p>
                        }
                        </td>
                        <td>{product.isApproved
                        ?<QRCode value={product.productKey.toString()}/> : null
                        }</td><td></td>
                        {/* <td>{ !product.purchased 
                            ?   <button name={product.id} value={product.price}
                                    onClick={(event) => {
                                    this.props.purchaseProduct(event.target.name, event.target.value);
                                    } }> Buy
                                </button>
                            : null
                            }
                        </td>
                        <td>{ !product.purchased 
                            ?   <button name={product.id} value={product.price}
                                    onClick={(event) => {
                                    this.props.transferProduct(event.target.name, event.target.value);
                                    } }> Transfer
                                </button>
                            : null
                            }
                        </td> */}
                    </tr>
                )
            })}
          </tbody>
        </table>
        
        
        {/* <QRCode value="Benuka" /> */}
      </div>
      
    );
  }
}

export default Main;