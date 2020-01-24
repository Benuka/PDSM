import React, { Component } from 'react';
//import {QRGenerator} from 'dynamic-qr-code-generator';
import QRCode from 'qrcode.react';

class Main extends Component {

  render() {
    var props={isLogo:true,value:'Your text or URL here'};
    return ( 
      <div id="content">
        <h2>Authority</h2>
        
        <p> </p>
        <h3>Requests</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col">Accept</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              //console.log(key);
              console.log(product.isApproved);
                return(
                 !product.isApproved ?
                    <tr key={key}>
                        <th scope="row">{product.id.toString()}</th>
                        <td>{product.name.toString()}</td>
                        <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether') } Eth</td>
                        <td>{product.owner}</td>
                        {/* <td>{product.productKey}</td> */}
                        
                        {/* <td>{product.isApproved
                        ?<p>Approved</p> : <p>Pending</p>
                        }
                        </td> */}
                        {/* <td>{product.isApproved
                        ?<QRCode value={product.id.toString()}/> : null
                        }</td><td></td> */}
                        {/* <td>{ !product.purchased 
                            ?   <button name={product.id} value={product.price}
                                    onClick={(event) => {
                                    this.props.purchaseProduct(event.target.name, event.target.value);
                                    } }> Buy
                                </button>
                            : null
                            }
                        </td>*/}
                        <td>{ !product.purchased 
                            ?   <button name={product.id} value={product.price}
                                    onClick={(event) => {
                                    this.props.approveProducts(event.target.name, event.target.value);
                                    } }> Approve
                                </button>
                            : null
                            }
                        </td> 
                    </tr>
                    :null
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