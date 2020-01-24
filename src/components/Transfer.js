import React, { Component } from 'react';

class Transfer extends Component {

  render() {
    return (
      <div id="content">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Current Owner</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.deployedproducts.map((deployedproduct, key) => {
              //console.log(key);
              console.log(deployedproduct.isApproved);
                return(
                    <tr key={key}>
                        <th scope="row">{deployedproduct.id.toString()}</th>
                        <td>{deployedproduct.name.toString()}</td>
                        <td>{window.web3.utils.fromWei(deployedproduct.price.toString(), 'Ether') } Eth</td>
                        <td>{deployedproduct.owner}</td>
                        
                        {/* <td>{product.isApproved
                        ?<p>Approved</p> : <p>Pending</p>
                        }
                        </td> */}
                        {/* <td>{ !product.purchased 
                            ?   <button name={product.id} value={product.price}
                                    onClick={(event) => {
                                    this.props.purchaseProduct(event.target.name, event.target.value);
                                    } }> Buy
                                </button>
                            : null
                            }
                        </td> */}
                        <td>{ !deployedproduct.purchased 
                            ?   <button name={deployedproduct.id} value={deployedproduct.price}
                                    onClick={(event) => {
                                    this.props.transferProduct(event.target.name, event.target.value);
                                    } }> Transfer
                                </button>
                            : null
                            }
                        </td>
                    </tr>
                )
            })}
          </tbody>
        </table>
        
      </div>
    );
  }
}

export default Transfer;