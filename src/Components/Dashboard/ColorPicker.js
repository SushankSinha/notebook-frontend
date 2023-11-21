import React, { useState } from 'react';
import Sketch from '@uiw/react-color-sketch';
import Button from "@mui/material/Button";

function ColorPicker ({setBgColor}){
    const [hex, setHex] = useState("#fff");
    const [displayColor, setDisplayColor] = useState(false);
    return (
      <div>
        {displayColor && <Sketch
          style={{ margin: 5, float : 'right' }}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            setBgColor(color.hex)
          }}
        />}
        <Button type='button' style={{margin : '5px', float : 'right', width : '125px', wordWrap : 'break-word'}} onClick={() => setDisplayColor(!displayColor)}>
          Theme
        </Button>
      </div>
    );
  };
  
  export default ColorPicker;
