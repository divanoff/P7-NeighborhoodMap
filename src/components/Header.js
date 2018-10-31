import React from 'react';
import Button from '@material-ui/core/Button';

export default function(props) {
    return (
        <div className="header" >
            <Button onClick={props.onToggleDrawer} ><i className="material-icons">menu</i></Button>
            <div className="title" >
                <h1>Craft beers near {
                    (props.city && (
                        `${props.city}, ${props.state}`
                    )) || ' you'
                    }
                </h1>
            </div>
        </div>
    );
}