import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {VelocityComponent} from 'velocity-react';


const Loading = (props) => {
    return (
            <div style={{color:'#E2C089'}}>
                loading...
            </div>
            );
}
Loading.PropTypes = {
    style: PropTypes.object
}
export const _mergeStyles = (...args) => {
    return Object.assign({}, ...args);
}
const Toggle = (props) => {
    const {
        toggled,
        toggle_point_plus,
        toggle_point_minus,
        fontawsome
    } = props;
    let styles = {
        fill: "currentcolor",
        verticalAlign: 'middle',
        width: props.size,
        height: props.size
    };
    if (fontawsome) {
        return(
                <div className="tree-view_arrow">
                    <i className={(toggled) ? `fa ${toggle_point_minus}` : `fa ${toggle_point_plus}`}></i>
                </div>);
    } else {
        let className = "tree-view_arrow";
        if(toggled){
            className += ' tree-view_arrow-collapsed'
        }
        return(
                <div className={className}>
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
                         style={_mergeStyles(styles, props.style)}
                         ><g><path d={(toggled) ? toggle_point_minus : toggle_point_plus}></path></g></svg>
                </div>);
    }

}
Toggle.defaultProps = {
    size: 24,
    toggle_point_minus: 'M7 11v2h10v-2h-10zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z',
    toggle_point_plus: 'M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
}
Toggle.propTypes = {
    toggle_point_plus: PropTypes.string.isRequired,
    toggle_point_minus: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    style: PropTypes.object
}
const Header = (props) => {
    return (
            <span className="node">
                {props.node.name}
            </span>
            );
}
class Container extends Component {
    constructor(props) {
        super();
    }
    render() {
        const {terminal, node, onClick} = this.props;
        return(
                <div ref="clickable"
                     onClick={onClick}
                     >
                    {!terminal ? this.renderToggle() : null}
                    <Header node={node}/>
                </div>)
    }
    renderToggle() {
        return (
                <VelocityComponent>
                    {this.renderToggleDecorator()}
                </VelocityComponent>
                );
    }
    renderToggleDecorator() {
        const {toggle_point_minus, toggle_point_plus, size, toggled, fontawsome} = this.props;
        return (<Toggle toggle_point_minus={toggle_point_minus} toggle_point_plus={toggle_point_plus} size={size} toggled={toggled} fontawsome={fontawsome}/>);
    }
}
Container.propTypes = {
    node: PropTypes.object.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    terminal: PropTypes.bool.isRequired,
    toggle_point_plus: PropTypes.string,
    toggle_point_minus: PropTypes.string,
    fontawsome: PropTypes.bool.isRequired,
    toggled: PropTypes.bool
}
export default {
    Toggle,
    Loading,
    Header,
    Container
}