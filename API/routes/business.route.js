

const express = require('express');
const app = express();
const productRoutes = express.Router();
const fs = require('fs');


let ProductAdd = require('../models/StoreProduct');


productRoutes.route('/storeProductInformation').post(function (req, res) {
  let productAdd = new ProductAdd(req.body);
  productAdd.save()
    .then(productAdd => {
      res.status(200).json({'productAdd': 'productAdd in added successfully'});

    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

productRoutes.route('/exportJpegImageFromTempFile').post(function (req, res) {

   let file = req.files;
  console.log(req.files.Image);

    var jpegData = fs.readFileSync('temp/tmp-1-1567952679303');
    fs.writeFile('uploads/image.png', jpegData,function(err, result) {
         if(err) console.log('error', err);
       });
    console.log(jpegData);

  return res.json({ success: true });

});



productRoutes.route('/getProductInformation').get(function (req, res) {

    ProductAdd.find(function (err, products){
    if(err){
      console.log(err);
    }
    else {
      res.json(products);
    }
  });
});

productRoutes.route('/getFilesFromProductGallery').get(function (req, res) {
    
    const testFolder = 'C:/Users/saif/MyAngularClient/src/assets/images/Gallery/';
    
    var files = [];

    fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
      
      files.push(file);
      
    });
    res.json(files); 
});


productRoutes.route('/deleteProduct/:id').get(function (req, res) {
    ProductAdd.findByIdAndRemove({_id: req.params.id}, function(err, product){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

productRoutes.route('/editProduct/:id').post(function (req, res) {
    ProductAdd.findById(req.params.id, function(err, product) {
    if (!product)
      return next(new Error('Could not load Document'));
    else {
        product.ProductDes = req.body.ProductDes;
        product.ProductPrice = req.body.ProductPrice;
        product.ProductOffer = req.body.ProductOffer;

        product.save().then(product => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

productRoutes.route('/getFilesFromProductGallery').get(function (req, res) {
    
    const testFolder = 'C:/Users/saif/MyAngularClient/src/assets/images/Img/';
    const fs = require('fs');
    var files = [];

    fs.readdirSync(testFolder).forEach(file => {
      console.log(file);
      
      files.push(file);
      
    });
    res.json(files); 
});



module.exports = productRoutes;