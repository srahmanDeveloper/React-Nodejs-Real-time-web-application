import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
  require('C:/Users/saif/ToyShop/assetSource/upload/1570967890024.png'),
  require('C:/Users/saif/ToyShop/assetSource/upload/1570967968039.png'),
  require('C:/Users/saif/ToyShop/assetSource/upload/1570967890024.png'),
  require('C:/Users/saif/ToyShop/assetSource/upload/1570967968039.png')
];

class ProductShop extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: 0,
      messages: [{
        _id: "5da311928d7efb06d49ae6c8",
        ProductUniqueId: 1570967890024,
        ProductPrice: "20",
        ProductOffer: "3 for 2",
        ProductDes: "Casio Nice Watch",
        src: require('C:/Users/saif/ToyShop/assetSource/upload/1570967890024.png'),
        thumb:"",
        caption: ""
      }]
    }

    this.getProductInformation();
  }

  getProductInformation(){

    return axios.get('http://localhost:4000/product/getProductInformation')
      .then(res => {
        
        // temp code to remove last item
        //res.data = res.data.slice(0,-1);
        console.log(res.data);

        var responseResultAfterImageUpdate = this.setImageProductSource(res.data);

        console.log(responseResultAfterImageUpdate);

        this.setState({ isOpen:false,photoIndex:0,messages: responseResultAfterImageUpdate});
        
      })
  }

  setImageProductSource(response){

    for(var src = 0; src < response.length; src++){

      var ImgSrc1 = require('C:/Users/saif/ToyShop/assetSource/upload/1570967890024.png');
      if(!response[src].ProductUniqueId){
        response[src].ProductUniqueId = 1570968011856;
      }
      var ImgSrc = 'C:/Users/saif/ToyShop/assetSource/upload/' + response[src].ProductUniqueId + '.png';
      console.log(ImgSrc);
      
      response[src].thumb = ImgSrc;
      response[src].src = ImgSrc;
      response[src].caption = response[src].ProductDes;
    }
    return response;
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

    var  photoIndex = 0;
    var  isOpen = false;
    return (

      <div className="container-fluid">  

        <div className="row sectionGap">

          <div>

            {this.state.messages.map(product => (
              
              <div className="row" key={product._id}>
                <div className="col-sm-10" className="panelMargin">
                  <div>
                  
                  <img src={require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`)} style={{height:200, width:200}} />
                  
                  <p> Description: {product.ProductDes} </p>
                  <p> Src: {product.src} </p>
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

          <button type="button" style={{height:50}} onClick={() => this.setState({ isOpen: true })}>
              Open Lightbox
            </button>
     
            { /*isOpen &&*/ (
              <Lightbox
                mainSrc={images[photoIndex]}
                nextSrc={images[(photoIndex + 1) % images.length]}
                prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + images.length - 1) % images.length,
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (photoIndex + 1) % images.length,
                  })
                }
              />
            )}

        </div>

      </div>
    )
  }
}


export default ProductShop;