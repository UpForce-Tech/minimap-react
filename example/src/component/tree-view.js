import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Node from './node';
import defaultAnimations from './animations';
import './treeview.css';

class TreeView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: this.props.collapsed
        };
    }
    render() {
        let data = this.props.data;
        if (!Array.isArray(data)) {
            data = [data];
        }
        return (<div className="main-section">
            <ul className="tree-view">
                {data.map((node, index) =>
                        <Node 
                            key={node.id || index} 
                            node={node}
                            toggle_point_plus={this.props.toggle_point_plus}
                            toggle_point_minus={this.props.toggle_point_minus}
                            size={this.props.size}
                            fontawsome={this.props.fontawsome}
                            animations={this.props.animations}
                            onToggle={this.props.onToggle}        
                        />
                            )}
            </ul>
        </div>);
    }

}
TreeView.propTypes = {
    style : PropTypes.object,
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ]).isRequired,
    animations : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    onToggle:PropTypes.func,
    toggle_point_plus:PropTypes.string,
    toggle_point_minus:PropTypes.string,
    fontawsome:PropTypes.bool
}

TreeView.defaultProps = {
    animations:defaultAnimations,
    fontawsome:false
}

export default TreeView;

