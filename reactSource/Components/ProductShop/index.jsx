import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';


class ProductShop extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      messages: [{
        _id: "5da311928d7efb06d49ae6c8",
        ProductUniqueId: 1570967890024,
        ProductPrice: "20",
        ProductOffer: "3 for 2",
        ProductDes: "Casio Nice Watch"
      }]
    }

    this.getProductInformation();
  }

  getProductInformation(){

    return axios.get('http://localhost:4000/product/getProductInformation')
      .then(res => {
        
        console.log(res.data);
        this.setState({ messages: res.data});
      })
  }

  addProduct(product){

    console.log(2);

  }

  deleteProduct(product){

    console.log(3);

  }

  editProduct(product){

    console.log(2);

  }


  render() {

    return (

      <div className="container-fluid">  

        <div className="row sectionGap">

          <div>

            {this.state.messages.map(product => (
              <div className="row">
                <div className="col-sm-10" className="panelMargin">
                  <div>

                  <img src= {product._id} style={{height:200, width:200}} onClick={console.log(1)}  />
                  <p> Description: {product.ProductDes} </p>
                  <p> Price: £{product.ProductPrice} </p>
                  <p> Offer: {product.ProductOffer} </p>
                  <p> Title: {product.ProductText} </p>

                  <input type="number" className="quantityHeight" id="quantity" placeholder="Qty" />

                  <button className="button btn btn-primary" onClick={this.addProduct}>Add To Basket </button>
                  <button className="button btn btn-danger" onClick={this.deleteProduct}>Delete</button>
                  <button className="button btn btn-success" onClick={this.editProduct}>Edit</button>
                </div>
                </div>
              </div>
              
            ))}

          </div>

        </div>

      </div>
    )
  }
}


export default ProductShop;