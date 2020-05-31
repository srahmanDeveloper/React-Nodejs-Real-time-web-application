import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Col, Row, Form } from "react-bootstrap";

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
      //type:event.target.elements.productFormType.value,
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
    alert(5);
    axios.post("http://localhost:4000/product/upload/", formData )
        .then(function(response) {
            console.log(response);
            console.log('Image uploaded');
            
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
      

      <Form onSubmit={this.handleSubmit}>
        
        <Form.Row>
          <Form.Group as={Col} controlId="productFormTitle">
            <Form.Label>Product Title</Form.Label>
            <Form.Control />
          </Form.Group>

          

          <Form.Group as={Col} controlId="productFormPrice">
            <Form.Label> Product Price </Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="productFormEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"  placeholder="Enter email" />
          </Form.Group>

          <Form.Group as={Col} controlId="productFormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="productFormUniqueId">
            <Form.Label>Product Id </Form.Label>
            <Form.Control placeholder="" value={this.state.productUniqueId} />
          </Form.Group>

          <Form.Group as={Col} controlId="productFormOffer">
            <Form.Label>Product Offer </Form.Label>
            <Form.Control placeholder="" />
          </Form.Group>

        </Form.Row>

        <Form.Group controlId="productFormType">
          <Form.Label>Product Type</Form.Label>
          <Form.Control as="select">
            <option>Brand New</option>
            <option> Used </option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productFormProductDes">
          <Form.Label>Product Description </Form.Label>
          <Form.Control as="textarea" rows="5" />
        </Form.Group>


        <Form.Group id="productFormConfirmBox">
          <Form.Check type="checkbox" label="Please Confirm Details Above Are Correct " />
        </Form.Group>

        <Form.File id="custom-file" label="Custom file input" custom onChange={this.onChangeHandler}/>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      
      
    )
  }
}


export default ProductForm;