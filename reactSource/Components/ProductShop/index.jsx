import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Button from 'react-bootstrap/Button';
import { Col, Row, Form } from "react-bootstrap";



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
    var isEditMode = true;

    return (

      <div className="container-fluid">

        <br />
        <div className="row">

             <h2 className="productTitle">  Online Product Gallery(New/Used) </h2>

        </div>

        <div className="row sectionGap productTitle">

            <div className="usedProductHighlighter"> <p className="productHighlighterText"> Used </p> </div>
            <div className="newProductHighlighter"> <p className="productHighlighterText"> New </p>  </div>

        </div>

        

        <div className="row sectionGap productShopMainItems">

            {this.state.messages.map(product => (
              
              

              <div className="row" key={product._id}>

                <div className="col-sm-10" className="panelMargin">

                  {isEditMode === true &&
                    
                    <Form  onSubmit={this.handleSubmit}>
                      <div className="editFormBackGround">

                      
                        
                      <br />
                      
                      <h3 className="formEditTitle"> Edit Existing Toy </h3>
                      <br />
                      <center><img src={require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`)} onClick={() => this.setState({ isOpen: true, selectedImageSrc: require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`) })} style={{height:200, width:400}} /> </center>


                      <Form.Group as={Col} controlId="productFormTitle">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control />
                      </Form.Group>

                      

                      <Form.Group as={Col} controlId="productFormPrice">
                        <Form.Label> Product Price </Form.Label>
                        <Form.Control value={product.ProductPrice} />
                      </Form.Group>
                      

                      
                        
                      <Form.Group as={Col} controlId="productFormPassword">
                        <Form.Label>Admin Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                      

                      
                      <Form.Group as={Col} controlId="productFormUniqueId">
                        <Form.Label>Product Id </Form.Label>
                        <Form.Control disabled placeholder="" value={product.ProductUniqueId} />
                      </Form.Group>

                      <Form.Group as={Col} controlId="productFormOffer">
                        <Form.Label>Product Offer </Form.Label>
                        <Form.Control placeholder="" value={product.ProductOffer} />
                      </Form.Group>

                     

                      <Form.Group as={Col}  controlId="productFormType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control as="select">
                          <option>Brand New</option>
                          <option> Used </option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col}  controlId="productFormProductDes">
                        <Form.Label>Product Description </Form.Label>
                        <Form.Control as="textarea" rows="3" value={product.ProductDes} />
                      </Form.Group>


                      <Form.Group  id="productFormConfirmBox">
                        <Form.Check type="checkbox" label="Please Confirm Details Above Are Correct " />
                      </Form.Group>
                      <br />
                      <Button className="inputStyle" variant="primary" type="submit">
                        Update
                      </Button>
                      <br />
                      <br />

                    </div>
                    </Form>
                  }


                  {isEditMode === false &&
                    
                    <div className={ product.ProductType == 'Used' ? 'productOldImageBorder' : 'productNewImageBorder' }>
                  
                        <center><img src={require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`)} onClick={() => this.setState({ isOpen: true, selectedImageSrc: require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`) })} style={{height:200, width:400}} /> </center>
                        < br/>
                        <p> <b> Title: {product.ProductText} </b> </p>
                        <p> <b> Type: {product.ProductType} </b> </p>
                        <p> <b>Description: {product.ProductDes} </b> </p>
                        <p> <b> Price: £{product.ProductPrice} </b> </p>
                        <p className="offer"> <b> Offer: {product.ProductOffer} </b> </p>
                        

                        <input type="number" className="quantityHeight" id="quantity" placeholder="Qty" />

                        <button className="button btn btn-primary" onClick={this.addProduct}>Add To Basket </button>
                        <button data-param={product._id} className="button btn btn-danger" onClick={this.deleteProduct}>Delete</button>

                        <button className="button btn btn-success" onClick={this.editProduct}>Edit</button>
                      </div>

                    }

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