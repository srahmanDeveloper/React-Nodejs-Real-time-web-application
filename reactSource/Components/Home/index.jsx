import React, { Component, useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import NewProduct from 'C:/Users/saif/ToyShop/assetSource/image/NewProduct.JPG';
import SellProduct from 'C:/Users/saif/ToyShop/assetSource/image/SellProduct.JPG';
import DynamicView from 'C:/Users/saif/ToyShop/assetSource/image/DynamicView.JPG';
import Gallery from 'C:/Users/saif/ToyShop/assetSource/image/Gallery.JPG';
import LiveChatImage from 'C:/Users/saif/ToyShop/assetSource/image/live.PNG';

var $ = require( "jquery" );

var url = 'SaifTest';

var liveChatMessages = [

  {id:1,message:''}
  
]; 

class Home extends Component {


constructor(props) {
    
    super(props);
    var url = '';
	url = 'http://localhost:4000';

    

    this.state = {
      title: '',
      body: '',
      author: '',
      message: '',
      typedMessage: '',
      liveChat: [{id:1,message:''}]
    }

    this.initiateReaTimeChat();
  }

  initiateReaTimeChat(nextProps) {

  	

  	const socket = socketIOClient('http://localhost:4000');

    socket.on("FromAPI", data => {

      console.log(data);
    });

    this.getMessages();
    
  }

	getMessages(){

		const socket = socketIOClient('http://localhost:4000');
		socket.on('new-message', (message) => {
			console.log(message);
			this.setState({message: message});
			liveChatMessages.push({
				id: Date.now(),
				message: message
			});
			this.setState({liveChat: liveChatMessages});
			console.log(liveChatMessages);
		});


	}

	sendMessage() {

		var message = this.state.message;
		console.log(this.state);

		const socket = socketIOClient('http://localhost:4000');
		socket.emit('new-message', message);
		this.setState({typedMessage: ''});
		$('.eachMessage').show().delay(15000).fadeOut();
	}

	updateMessage(event){
        
        console.log(event.target.value);
		this.setState({message: event.target.value});
		this.setState({typedMessage: event.target.value});
	}


	render() {

		return(

			<div>
				<div className="container-fluid">
					<div className="row sectionGap">
						<div className="col-sm-6">
					        <h3> Welcome to Online Toy Shop.  </h3>
					        <p>This website help you sell your unwanted toys. Also you can buy new/used toys for less amount. </p>
					        <div className="row">
					          <div className="col">
					            <h4> Sell Unwanted Toys </h4>
					            <br/>
					            <p> Got some unwanted products. Sell in our website for free. </p>
					          </div>
					          <div className="col">
					            <h4> Purchase New/Used Toys </h4>
					             <br/>
					            <p> Looking to purchase new/used toys for less amount. Please browse our website.  </p>
					          </div>
					        </div>
					        <div className="row">
					          <div className="col">
					            <button type="button" className="btn btn-dark button" name="getStarted"> Sell Your Toy </button>
					          </div>

					          <div className="col">
					            <button type="button"  className="btn btn-dark button" name="getStarted"> Buy New/Used Toy </button>
					          </div>

					        </div>

					      </div>
					      <div className="col-sm-6"><img className="imageMaxHeight" src ={NewProduct} /></div>
					</div>

					<div className="row sectionGap">
      
					      <div className="col-sm-6 col-md-8 col-lg-6"><img className="imageMaxHeight" src={SellProduct} /></div>

					      <div className="col-sm-6 col-md-4 col-lg-6">
					        <h4> Online Secure Payment  </h4>
					        <p>We provide secure transaction management system for all the online transaction. </p>
					        <div className="row">

					          
					          <div className="col">
					            <h4> Live Support </h4>
					             
					            
					          </div>
					        </div>
					        <div className="row">
					          
					          <div className="col-4">
					            <p> <b> Live Chat With Us <img style={{height:50, width:50}} src ={LiveChatImage} /> </b></p>
					          </div>

					          <div className="col">
					            
					          	<div className="chatPanel">
								    {this.state.liveChat.map(each => (
								      <div className="eachMessage" key={each.id}>{each.message}</div>
								    ))}
								  </div>
						          
						          <input className="chatPanelInput" type="text" value={this.state.typedMessage} onChange={this.updateMessage.bind(this)}></input>

						          <button className="button btn btn-primary chatPanelButton" onClick={this.sendMessage.bind(this)}>Send</button>

						          </div>

					          

					        </div>

					      </div>
					    </div>

					    <div className="row sectionGap">
					      <div className="col-sm-8 col-md-6">

					        <h4> Online Bird Gallery </h4>
					        <p > Wish to browse our online bird gallery. <abbr className="textUnderLine"> Please click here </abbr> </p>
					        
					        <div className="row">
					          <div className="col">
					            <h4> Our Services </h4>
					            <br/>
					            
					          </div>
					          
					        </div>
					        <div className="row">
					          <div className="col">
					            <span className="glyphicon glyphicon-ok-circle listIconOkay"> Purchase Used Toys For Less  </span>
					            <span className="glyphicon glyphicon-ok-circle listIconOkay"> Sell Unwanted Toys  </span>
					            <span className="glyphicon glyphicon-ok-circle listIconOkay"> Offer Unwanted Toys For Free  </span>
					          </div>

					        </div>
					      </div>
					      <div className="col-sm-4 col-md-6"><img className="imageMaxHeight floatingImageDimension" src ={DynamicView} /> <img className="imageMaxHeight floatingImage floatingImageDimension" src ={Gallery} />
			    		 </div>
					    </div>


					    <br />
    
					    <div className="row sectionGap">
					      
					      <div className="col-sm-7 col-md-6 col-lg-6">
					        <h4> About Us </h4>

					            <span className="glyphicon glyphicon-ok-circle listIconOkay"> Purchase Used Products For Less  </span>
					            <span className="glyphicon glyphicon-ok-circle listIconOkay"> Sell Unwanted Products  </span>
					            <span className="glyphicon glyphicon-ok-circle listIconOkay"> Offer Unwanted Products For Free  </span>
					        <br/>
					        
					      </div>

					      <div className="col-sm-5 col-md-6 col-lg-6">
					        <h3> Contact Us </h3>
					         
					          <span className="glyphicon glyphicon-ok-circle listIconOkay"> Mobile Number: 0750 87* ****</span>
					          <span className="glyphicon glyphicon-ok-circle listIconOkay"> Fax Number: 01247******  </span>
					          <span className="glyphicon glyphicon-ok-circle listIconOkay"> Address: ** The Green, Wigan, Lancashire, Wn5 *** </span>
					          

					          
  
					      </div>
					      
					    </div>


				</div>

			</div>

		);
	}
}

export default Home;