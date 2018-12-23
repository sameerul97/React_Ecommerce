import React, { Component } from 'react';

class ErrorComponent extends Component {
    render() {
        const divStyle = {
            width: "100 %",
            height: "80vh"
        };
        return (
            <div className="bg-light errorPage" style={divStyle}>
                <h1 className="display-3 text-black text-center">404 Not Found</h1>
            </div>
        )
    }
}

export default ErrorComponent;
