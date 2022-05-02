import React from 'react';

export default (props) => {

  const text = props.text.split('');
  const userInput = props.userInput.split('');


  return (
    <div className="border rounded p-3 mb-4"> {
      text.map((s, i) => {
        let color;
        if (i < props.userInput.length) {
          color = s === props.userInput[i] ? '#956fd6' : '#f17c7c';
        }
        return <span key = {i} style = {{color: color}}>{s}</span>
      }) // If user types right letter, color turns purple! (else red)
    }
    </div>
  )
}