import React, {Component} from 'react';
import PropTypes from 'prop-types';
import decorators from './decorators';
class Header extends Component {
    constructor(props) {
        super();
    }
    render() {
        const terminal = !this.props.node.children;
        const toggle_point_plus = this.props.toggle_point_plus;
        const toggle_point_minus = this.props.toggle_point_minus;
        const toggled = this.props.node.toggled;
        const size = this.props.size;
        return(<div className="tree-view-item_node">
            <decorators.Container
                terminal={terminal} 
                node={this.props.node}
                toggle_point_plus={toggle_point_plus}
                toggle_point_minus={toggle_point_minus}
                size={size}    
                onClick={this.props.onClick}
                toggled={toggled}
                fontawsome={this.props.fontawsome}
                animations={this.props.animations}        
                />
        </div>);
    }
}
Header.propTypes = {
    node:PropTypes.object.isRequired,
    animations:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onClick:PropTypes.func.isRequired,
    toggle_point_plus:PropTypes.string.isRequired,
    toggle_point_minus:PropTypes.string.isRequired,
    fontawsome:PropTypes.bool,
    toggled:PropTypes.bool,
}
export default Header;