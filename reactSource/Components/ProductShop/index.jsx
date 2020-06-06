import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



class ProductShop extends React.Component {

  
  constructor(props) {

    super(props);
    this.state = {
      isOpen: false,
      photoIndex: 0,
      isOld: true,
      messages: [{
        _id: "5da311928d7efb06d49ae6c8",
        ProductUniqueId: 1570967890024,
        ProductPrice: "20",
        ProductType: "None",
        ProductOffer: "3 for 2",
        ProductDes: "Casio Nice Watch",
        src: require('C:/Users/saif/ToyShop/assetSource/upload/1570967890024.png'),
        thumb:"",
        selectedImageSrc: '',
        caption: ""
      }]
    }

    this.getProductInformation();
    this.deleteProduct = this.deleteProduct.bind(this);
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
      var ImgSrc = require('C:/Users/saif/ToyShop/assetSource/upload/' + response[src].ProductUniqueId + '.png');
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

  deleteProduct(event){

    console.log(event.target.dataset);
    //console.log(product);
    var id = event.target.dataset.param;

    return axios.get('http://localhost:4000/product/deleteProduct/' + id)
      .then(res => {
        
        console.log('Product Deleted');
        
      })

  }

  editProduct(product){

    console.log(2);

  }


  render() {

    /*var  photoIndex = 0;
    var  isOpen = false;*/
    return (

      <div className="container-fluid">

            
        <div className="row sectionGap">

            <div className="usedProductHighlighter"> <p className="productHighlighterText"> Used </p> </div>
            <div className="newProductHighlighter"> <p className="productHighlighterText"> New </p>  </div>

        </div>

        <div className="row sectionGap">

          
            
            {this.state.messages.map(product => (
              
              <div className="row" key={product._id}>
                <div className="col-sm-10" className="panelMargin">
                  <div className={ product.ProductType == 'Used' ? 'productOldImageBorder' : 'productNewImageBorder' }>
                  
                  <img src={require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`)} onClick={() => this.setState({ isOpen: true, selectedImageSrc: require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`) })} style={{height:200, width:200}} />
                  
                  <p> Description: {product.ProductDes} </p>
                  <p> Src: {product.src} </p>
                  <p> Price: £{product.ProductPrice} </p>
                  <p> Type: {product.ProductType} </p>
                  <p> Offer: {product.ProductOffer} </p>
                  <p> Title: {product.ProductText} </p>

                  <input type="number" className="quantityHeight" id="quantity" placeholder="Qty" />

                  <button className="button btn btn-primary" onClick={this.addProduct}>Add To Basket </button>
                  <button data-param={product._id} className="button btn btn-danger" onClick={this.deleteProduct}>Delete</button>

                  <button className="button btn btn-success" onClick={this.editProduct}>Edit</button>
                </div>
                </div>
              </div>
              
            ))}

        </div>

        <div className="row sectionGap">

          { this.state.isOpen && (
            <Lightbox
              mainSrc={this.state.selectedImageSrc}
              onCloseRequest={() => this.setState({ isOpen: false })}
              
            />
          )}
          </div>

      </div>
    )
  }
}


export default ProductShop;