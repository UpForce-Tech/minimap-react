# Minimap
A preview of full webpage or its DOM element with flexible positioning and navigation support

## Installation

To install this Component, run `yarn add minimap` or `npm install minimap`.

## Usage
to use this component in your project, just add the following

```javascript
import React from 'react';
import Minimap from 'minimap';

class App extends Component {
    render() {
        return (
               <Minimap 
                    heightRatio={0.6}
                    widthRatio={0.05} 
                    offsetHeightRatio={0.035} 
                    offsetWidthRatio={0.035} 
                    position="right" 
                    smoothScroll={true} 
                    smoothScrollDelay={200} 
                    toggle={true}/>
                );
    }
}

export default App;
