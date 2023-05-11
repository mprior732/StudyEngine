import React from 'react';
import './Input.css'

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