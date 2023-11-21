import React, { useState } from 'react';
import Sketch from '@uiw/react-color-sketch';

function ColorPicker ({setBgColor}){
    const [hex, setHex] = useState("#fff");
    return (
      <div>
      <Sketch
          style={{ margin: 5, float : 'right' }}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            setBgColor(color.hex)
          }}
        />
      </div>
    );
  };
  
  export default ColorPicker;
