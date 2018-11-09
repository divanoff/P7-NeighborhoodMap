import React, {Component} from 'react';

export default class MapError extends Component {
    state = {
        show: false,
        timeout: null
    }

    componentDidMount() {
        let timeout =  window.setTimeout(() => {
            this.setState({show: true});
        }, 3000);
        this.setState({timeout});
    }

    componentWillUnmount() {
        window.clearTimeout(this.state.timeout);
    }

    render() {
        return (
           <div style={{textAlign: 'center'}}>
                {this.state.show ?
                    (
                        <div>
                            <h1>Error loading map</h1>
                            <p>Cannot connect to Google Maps. Check your network connectivity and try again.</p>
                        </div>
                    )
                    :
                    (<div>Loading map...</div>)
            } </div>
        )
    }
}