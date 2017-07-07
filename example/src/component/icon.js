import React, {Component} from 'react';
import PropTypes from 'prop-types';
class Icon extends Component {
    constructor(props) {
        super();
    }
    _mergeStyles(...args) {
        return Object.assign({}, ...args);
    }
    renderGraphics() {
        switch (this.props.icon) {
            case 'remove-circle-outline':
                return (
                        <g><path d="M7 11v2h10v-2h-10zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
                        );
            case 'control-point':
                return (
                        <g><path d="M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
                        );
            default :
                return (
                        <g><path d="M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
                        );
        }
    }

    render() {
        let styles = {
            fill: "currentcolor",
            verticalAlign: 'middle',
            width: this.props.size,
            height: this.props.size
        };
        return (
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
                     style={this._mergeStyles(styles, this.props.style)}
                     >{this.renderGraphics()}</svg>
                );
    }
}
Icon.defaultProps = {
    size: 24
}
Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    style: PropTypes.object
}

export default Icon; 