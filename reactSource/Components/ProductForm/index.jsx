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
      formObj:{}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  handleSubmit(event){

    event.preventDefault();
    
    console.log(event.target.elements.productFormProductDes.value);
    console.log(this.state);
    var productObj = {
      title: event.target.elements.productFormTitle.value,
      price: event.target.elements.productFormPrice.value,
      id: event.target.elements.productFormUniqueId.value,
      offer:event.target.elements.productFormOffer.value,
      type:event.target.elements.productFormType.value,
      description: event.target.elements.productFormProductDes.value
      
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
    
    
  }

  

  


  render() {

    const { articleToEdit } = this.props;
    const { title, body, author } = this.state;
    var productToEdit = false;
    var email = "SaifTestEmail";
    var productUniqueId = 1570967890024;
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
            <Form.Control placeholder="" value={productUniqueId} />
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      
      
    )
  }
}


export default ProductForm;