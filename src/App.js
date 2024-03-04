import React, { Component } from 'react';
import './App.css';
// import Clarifai from 'clarifai'
import ParticlesBg from 'particles-bg'
import Navigation from './Components/Navigation/Navigation'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Logo from './Components/Logo/Logo'
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';



// "#ffccfb
// const app = new Clarifai.App(
//   {
//     apiKey: 'e88a5514927349be99e16c970d1db1d1'
//   }
// )
const setupClarifai = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = 'b8b293a27ef1463ba23d07fa63a8ab73';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'vs1708';
  const APP_ID = 'smartbrain';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
            // "base64": IMAGE_BYTES_STRING
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions;


}


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false,

    }
  }
  calculateFaceLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height)
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height),
      
    }
  }
  displayFaceBox = (box) => {
    
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", setupClarifai(this.state.input))
    .then(response => response.json())
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))


      .catch(error => console.log('error', error));

  }
  onSigninChange=(route)=>{
    if(route==='signout'){
      this.setState({isSignedin: false})
    }
    else if(route==='home'){
      this.setState({isSignedin: true})

    }
    this.setState({route:route});
  }
  

  render() {
    const {route,box,isSignedin,imageUrl}=this.state
    return (
      <div className="App">
        <ParticlesBg className='particles' color="#ffccfb" type="cobweb" num={150} bg={true} />
        <Navigation isSignedin={isSignedin} onSigninChange={this.onSigninChange}/>
        {
        route==='home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          :(
            route==='signin'
              ?<div><Logo /> <SignIn onSigninChange={this.onSigninChange} />  </div>
              :<div><Logo /><Register onSigninChange={this.onSigninChange} /></div>
          )
        
        }
      </div>
    )
  };
}

export default App;
