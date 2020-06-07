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
      isEditMode: false,
      editProductId: '',
      editProductIndex: 0,
      listOfProducts: [{
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
    this.handleEditForm = this.handleEditForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.runEditMode = this.runEditMode.bind(this);
    this.stopEditMode = this.stopEditMode.bind(this);
  }

  getProductInformation(){

    return axios.get('http://localhost:4000/product/getProductInformation')
      .then(res => {
        
        // temp code to remove last item
        //res.data = res.data.slice(0,-1);
        console.log(res.data);

        var responseResultAfterImageUpdate = this.setImageProductSource(res.data);

        console.log(responseResultAfterImageUpdate);

        this.setState({ isOpen:false,photoIndex:0,listOfProducts: responseResultAfterImageUpdate});
        
      })
  }

  runEditMode(){

    
    this.setState({isEditMode: true});
  }

  stopEditMode(){

    
    this.setState({isEditMode: false});
  }

  handleSubmit(event){

    event.preventDefault();

    /*if(event.target.elements.productFormPassword.value == this.state.password ){

      console.log('Matched');
    }*/

    console.clear();
    console.log(this.state.editProductIndex);
    console.log(this.state.editProductId);

    axios.post("http://localhost:4000/product/editProduct/" + this.state.editProductId, this.state.listOfProducts[this.state.editProductIndex] )
        .then(function(response) {
            console.log(response);
            location.reload();
            
        }) .catch(function (error) {
            console.log(error);
        });
    
    
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
        location.reload();
        
      })

  }

  editProduct(product){

    console.log(2);

  }

  handleEditForm(event,id,el){

    /*console.log(el);
    console.log(id);
    console.log(this.state.listOfProducts[0]);

    console.log(event.target.value);*/

    

    var updatedListOfProducts = this.state.listOfProducts;
    var selectedProductIndex = 0;
    var selectedProductId = '';

    for(var each = 0; each < updatedListOfProducts.length; each++){

      if(updatedListOfProducts[each].ProductUniqueId == id){

        selectedProductIndex = each;
        selectedProductId = updatedListOfProducts[each]._id;
        console.log(selectedProductId);

        switch(el){

          case 'Price':
            updatedListOfProducts[each].ProductPrice  = event.target.value;
          break;

          case 'Offer':
            updatedListOfProducts[each].ProductOffer  = event.target.value;
          break;

          case 'Type':
            updatedListOfProducts[each].ProductType  = event.target.value;
          break;

          case 'Description':
            updatedListOfProducts[each].ProductDes  = event.target.value;
          break;

          case 'Title':
            updatedListOfProducts[each].ProductTitle  = event.target.value;
          break;

        }
        
      }
    }
    
    this.setState({editProductId: selectedProductId, editProductIndex: selectedProductIndex, listOfProducts: updatedListOfProducts});

    //this.setState({listOfProducts: updatedListOfProducts });

  }


  render() {

    /*var  photoIndex = 0;
    var  isOpen = false;*/
    

    return (

      <div className="container-fluid">

        <br />
        <div className="row">

             <h2 className="productTitle">  Online Product Gallery(New/Used) </h2>

        </div>

        <div className="row sectionGap productTitle">

            <div className="usedProductHighlighter"> <p className="productHighlighterText"> Used </p> </div>
            <div className="newProductHighlighter"> <p className="productHighlighterText"> New </p>  </div>
            <h4> Would you like to edit existing products? </h4>

            {this.state.isEditMode === false &&
              <Button onClick={this.runEditMode}className="" variant="primary">
                        Run Edit Mode
                      </Button>
            }
            
            {this.state.isEditMode === true &&

              <Button onClick={this.stopEditMode} className="" variant="primary">
                        Stop Edit Mode
                      </Button>
            }
            


        </div>

        

        <div className="row sectionGap productShopMainItems">

            {this.state.listOfProducts.map(product => (
              
              

              <div className="row" key={product._id}>

                <div className="col-sm-10" className="panelMargin">

                  {this.state.isEditMode === true &&
                    
                    <Form  onSubmit={this.handleSubmit}>
                      <div className="editFormBackGround">

                      
                        
                      <br />
                      
                      <h3 className="formEditTitle"> Edit Existing Toy </h3>
                      <br />
                      <center><img src={require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`)} onClick={() => this.setState({ isOpen: true, selectedImageSrc: require(`C:/Users/saif/ToyShop/assetSource/upload/${product.ProductUniqueId}.png`) })} style={{height:200, width:400}} /> </center>


                      <Form.Group as={Col} controlId="productFormTitle">
                        <Form.Label>Product Title</Form.Label>
                        <Form.Control onChange={(e) => this.handleEditForm( e,product.ProductUniqueId,'Title')} value={product.ProductTitle}/>
                      </Form.Group>

                      

                      <Form.Group as={Col} controlId="productFormPrice">
                        <Form.Label> Product Price </Form.Label>
                        <Form.Control placeholder="Price" onChange={(e) => this.handleEditForm( e,product.ProductUniqueId,'Price')} value={product.ProductPrice} />
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
                        <Form.Control placeholder="" onChange={(e) => this.handleEditForm( e,product.ProductUniqueId,'Offer')} value={product.ProductOffer} />
                      </Form.Group>

                     

                      <Form.Group as={Col}  controlId="productFormType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control as="select" onChange={(e) => this.handleEditForm( e,product.ProductUniqueId,'Type')} value={product.ProductType}>
                          <option>Brand New</option>
                          <option> Used </option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group as={Col}  controlId="productFormProductDes">
                        <Form.Label>Product Description </Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={(e) => this.handleEditForm( e,product.ProductUniqueId,'Description')} value={product.ProductDes} />
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


                  {this.state.isEditMode === false &&
                    
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