import React from 'react';
import Button from '@material-ui/core/Button';

export default function() {
    return (
        <div className="header" >
            <Button><i className="material-icons">menu</i></Button>
            <h1>Craft beers near you</h1>
        </div>
    );
}