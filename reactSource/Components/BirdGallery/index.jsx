import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

var slideShowmages = [];

class BirdGallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      photoIndex: 0,
      images: [{
        _id: 0,
        imageId: 1,
        src: '',
        thumb:"",
        caption: ""
      }]
    }

    this.getImagesFromGallery();
  }

  getImagesFromGallery(){

    return axios.get('http://localhost:4000/product/getFilesFromProductGallery')
      .then(res => {
        
        var imageArray = [];
        for(var image = 0; image < res.data.length; image++){
          
          var sObj = {
            _id: image,
            imageId: res.data[image].split('.')[0],
            src: '',
            thumb:"",
            caption: ""
          };
          imageArray.push(sObj);
          slideShowmages.push(require(`C:/Users/saif/ToyShop/assetSource/gallery/${res.data[image].split('.')[0]}.jpg`));
        }
        this.setState({ isOpen:false,photoIndex:0,images: imageArray});
        console.log(slideShowmages);
        
      })
  }

  render() {

    return (

      <div className="container-fluid">  

        <div className="row sectionGap">

          {this.state.images.map(product => (
            
              <div key={product._id} className="col-sm-4" className="panelMargin">    
                
                <img onClick={() => this.setState({ isOpen: true, photoIndex: product._id })} src={require(`C:/Users/saif/ToyShop/assetSource/gallery/${product.imageId}.jpg`)} style={{height:200, width:200}} />
              
              </div>
          ))}
        </div>

        <div className="row sectionGap">

          { this.state.isOpen && (
            <Lightbox
              mainSrc={slideShowmages[this.state.photoIndex]}
              nextSrc={slideShowmages[(this.state.photoIndex + 1) % slideShowmages.length]}
              prevSrc={slideShowmages[(this.state.photoIndex + slideShowmages.length - 1) % slideShowmages.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (this.state.photoIndex + slideShowmages.length - 1) % slideShowmages.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (this.state.photoIndex + 1) % slideShowmages.length,
                })
              }
            />
          )}
          </div>

      </div>
    )
  }
}


export default BirdGallery;