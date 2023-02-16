import React from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { useState, useEffect } from "react";


function Recommend_dial(props) {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('True');
  
    const radios = [
      { name: 'Yes', value: 'True' },
      { name: 'No', value: 'False' },
    ];
    
    const radioChange = (e) => {
        setRadioValue(e.currentTarget.value);
        props.changeDial(e.currentTarget.value);
    }

    return (
      <>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-danger' : 'outline-success'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={radioChange}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </>
    );
  }
  
  export default Recommend_dial