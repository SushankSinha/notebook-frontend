import React, {useState} from 'react'

function FontPicker() {
    const [activeFontFamily, setActiveFontFamily] = useState('Open Sans')
    {/*const [display, setDisplay] =useState(false)*/}
    return (
        <div>
            <FontPicker
                style={{ margin: '10 5 5 5', float : 'right' }}
                apiKey="AIzaSyBAmV8B7Uu0YNE1bPIMhW9CCexFudtg8wc"
                activeFontFamily={activeFontFamily}
                onChange={(nextFont) =>
                    setActiveFontFamily(nextFont.family)
                }
            />
            {/* <button type='button' className='btn btn-success' style={{margin : '5px', float : 'right', width : '125px', wordWrap : 'break-word'}} onClick={() => setDisplay(!display)}>
                Change Font
            </button> */}
        </div>
    );
}

export default FontPicker