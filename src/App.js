import React, { Component } from 'react';
import Upload from "./logo.js"
import "./App.css"
import shirt from "./pictures/purepng.com-white-t-shirtt-shirtfabrict-shapegramnetsmenswhite-14215264292423zp8k.png"
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Draggable from 'react-draggable';



class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    cropResult: null,
  };
  this.cropImage = this.cropImage.bind(this);
  this.onChange = this.onChange.bind(this);
}

onChange(e) {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
    files = e.dataTransfer.files;
  } else if (e.target) {
    files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
    this.setState({ src: reader.result });
  };
  reader.readAsDataURL(files[0]);
}

cropImage() {
  if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
    return;
  }
  this.setState({
    cropResult: this.cropper.getCroppedCanvas().toDataURL(),
  });
}



render() {
  return (
    <div>
      <div class="columns">
      <div class="column">
        <img className="chat" src={ shirt }/>
      </div>
        <div className="column" style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
            <Cropper
            style={{ height: 400, width: '100%' }}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
            dragmode="move"
            />
            <div className="box" style={{ width: '50%', float: 'left' }}>
              <h1>
                <span>Crop</span>
                <button onClick={this.cropImage} style={{ float: 'left' }}>
                  Crop Image
                </button>
              </h1>
              <Draggable
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[10, 10]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
              <img className="handle" style={{ width: '300px' }} src={this.state.cropResult} alt="cropped image" />
              </Draggable>
              <h1 className= "drag" >drag me </h1>
            </div>
        </div>
      </div>
      <br style={{ clear: 'both' }} />
    </div>


  );
}
}

export default App;
