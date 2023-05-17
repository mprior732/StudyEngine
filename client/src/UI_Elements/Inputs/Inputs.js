import React from 'react';
import './Inputs.css'

export function Input({name, type, onChange}) {
    return (
        <div className='input-container'>
            <input 
                type={type}
                required='required'
                onChange={onChange}
            />
            <span>{name}</span>
        </div>
    );
}