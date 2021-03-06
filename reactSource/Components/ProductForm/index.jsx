import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Col, Row, Form } from "react-bootstrap";
import socketIOClient from "socket.io-client";

class ProductForm extends React.Component {

  
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: '',
      body: '',
      author: '',
      email: 'srahman@test.com',
      password: 'rony0692A',
      formObj:{},
      selectedFile: null,
      productUniqueId : Date.now()
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  handleSubmit(event){

    event.preventDefault();
    
    console.log(event.target.elements.productFormProductDes.value);
    console.log(this.state);
    var productObj = {
      ProductTitle: event.target.elements.productFormTitle.value,
      ProductPrice: event.target.elements.productFormPrice.value,
      ProductUniqueId: this.state.productUniqueId,
      ProductOffer:event.target.elements.productFormOffer.value,
      ProductType:event.target.elements.productFormType.value,
      ProductDes: event.target.elements.productFormProductDes.value
      
    };
    this.setState({formObj:productObj});

    console.log(productObj);

    if(event.target.elements.productFormEmail.value == this.state.email  && event.target.elements.productFormPassword.value == this.state.password ){

      console.log('Matched');
    }

    axios.post("http://localhost:4000/product/storeProductInformation", productObj )
        .then(function(response) {
            console.log(response);

            
        }) .catch(function (error) {
            console.log(error);
        });




        this.uploadAttachedImage();
    
    
  }

  onChangeHandler(event){

    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })

  }

  uploadAttachedImage(){

    const formData = new FormData();
    formData.append('Image', this.state.selectedFile, this.state.selectedFile.name);
    formData.append('ComponentId', this.state.productUniqueId);
    
    axios.post("http://localhost:4000/product/upload/", formData )
        .then(function(response) {
            console.log(response);
            console.log('Image uploaded');
            setTimeout(function(){

              const socket = socketIOClient('http://localhost:4000');
              socket.emit('new-product', 'New Product Added');
              
            },5000);
            
        }) .catch(function (error) {
            console.log(error);
        });
  }

  render() {

    const { articleToEdit } = this.props;
    const { title, body, author } = this.state;
    var productToEdit = false;
    var email = "SaifTestEmail";
    return (
      

      <Form  onSubmit={this.handleSubmit}>
        <div className="formBackGround">
        <br />
        
        <h3 className="formTitle"> Add New Toy </h3>
        <br />
        <Form.Row className="inputStyle">
          <Form.Group as={Col} controlId="productFormTitle">
            <Form.Label>Product Title</Form.Label>
            <Form.Control />
          </Form.Group>

          

          <Form.Group as={Col} controlId="productFormPrice">
            <Form.Label> Product Price </Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Row className="inputStyle">
          <Form.Group as={Col} controlId="productFormEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"  placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="productFormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Row className="inputStyle">
          <Form.Group as={Col} controlId="productFormUniqueId">
            <Form.Label>Product Id </Form.Label>
            <Form.Control placeholder="" value={this.state.productUniqueId} />
          </Form.Group>

          <Form.Group as={Col} controlId="productFormOffer">
            <Form.Label>Product Offer </Form.Label>
            <Form.Control placeholder="" />
          </Form.Group>

        </Form.Row>

        <Form.Group className="inputStyle" controlId="productFormType">
          <Form.Label>Product Type</Form.Label>
          <Form.Control as="select">
            <option>Brand New</option>
            <option> Used </option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="inputStyle" controlId="productFormProductDes">
          <Form.Label>Product Description </Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>


        <Form.Group className="inputStyle" id="productFormConfirmBox">
          <Form.Check type="checkbox" label="Please Confirm Details Above Are Correct " />
        </Form.Group>

        <Form.File id="custom-file" className="inputStyle" onChange={this.onChangeHandler}/>
        <br />
        <Button className="inputStyle" variant="primary" type="submit">
          Submit
        </Button>
        <br />
        <br />

      </div>
      </Form>

      
      
    )
  }
}


export default ProductForm;