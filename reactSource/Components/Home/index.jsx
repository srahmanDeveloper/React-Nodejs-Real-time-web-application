import React, { Component } from 'react';
import NewProduct from 'C:/Users/saif/ToyShop/assetSource/image/NewProduct.JPG';
import SellProduct from 'C:/Users/saif/ToyShop/assetSource/image/SellProduct.JPG';

class Home extends Component {

render() {
return(
<div>
<div className="col-sm-6">
<h4> Welcome to eShop.  </h4>
<p>This website help you sell your products. Also you can buy products for less. </p>
<div className="row">
<div className="col">
<h4> Sell </h4>
<br/>
<p> Got some unwanted products. Sell in our website for free. </p>
</div>
<div className="col">
<h4> Buy </h4>
<br/>
<p> Looking to purchase new/used  products for less. Please browse our website.  </p>
</div>
</div>
<div className="row">
<div className="col">
<button type="button" className="btn btn-dark button" name="getStarted"> Sell Your Product </button>
</div>

<div className="col">
<button type="button"  className="btn btn-dark button" name="getStarted"> Buy New Product </button>
</div>
<div className="col-sm-6"><img src={NewProduct} /></div>
</div>

</div>
<div className="row sectionGap">
<div className="col-sm-6"><img src={SellProduct} /></div>

<div className="col-sm-6 col-md-4 col-lg-6">
<h4> Secure Payment  </h4>
<p>We provide secure transaction management system for all the online transaction. </p>
<div className="row">

<div className="col">

<h4> Live Chat </h4>
<br/>
<p> Love to chat with all connected users. Click get started button below to make a start.   </p>
</div>
<div className="col">
<h4> Queries? </h4>
<br/>
<p> Coming Soon... </p>
</div>
</div>
<div className="row">


</div>

</div>
</div>

</div>

);
}
}

export default Home;