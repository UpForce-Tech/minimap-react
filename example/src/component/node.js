import React,{Component} from 'react';
import Icon from './icon';
import PropTypes from 'prop-types';
import NodeHeader from './header';
import {VelocityTransitionGroup} from 'velocity-react';
import decorators from './decorators';

class TreeNode extends Component{
    constructor(props) {
        super(props);
        this.state = {}
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        let toggled = !this.props.node.toggled;
        let onToggle = this.props.onToggle;
        if(onToggle){ onToggle(this.props.node, toggled); }
    }
    animations(){
        const props = this.props;
        if(props.animations === false){ return false; }
        let anim = Object.assign({}, props.animations, props.node.animations);
        return {
            drawer: anim.drawer(this.props)
        };
    }
    render() {
       const animations = this.animations();
        return(
                <li className={'tree-view_item'}>
                    {this.renderHeader()}
                    {this.renderDrawer(animations)}
                </li>);
    }
    
    renderDrawer(animations){
         const toggled = this.props.node.toggled;
         if(!animations && !toggled){ return null; }
         if(!animations && toggled ){
            return this.renderChildren(animations);
        }
        return (
            <VelocityTransitionGroup {...animations.drawer} ref="velocity">
                {toggled ? this.renderChildren(animations) : null}
            </VelocityTransitionGroup>
        );
    }
    renderHeader() {
                let {toggle_point_plus,toggle_point_minus,size,fontawsome} = this.props;
                return(
                        <NodeHeader 
                            node={Object.assign({},this.props.node)}
                            toggle_point_plus={toggle_point_plus}
                            toggle_point_minus={toggle_point_minus}
                            size={size}  
                            fontawsome={fontawsome}
                            onClick={this.onClick}   
                            animations={this.props.animations}        
                        >
                        </NodeHeader>
                       );
    }
    renderChildren() {
        //if(this.props.node.loading){return this.renderLoading();}
        let children = this.props.node.children;
        let expanded = !this.props.collapsed ? this.state.expanded:this.props.collapsed;
        if (!Array.isArray(children)) { children = children ? [children] : []; }
        let containerClassName = 'tree-view_children';
        if(expanded){
           containerClassName += ' tree-view_children-collapsed'; 
        }
        return (
                <ul className={containerClassName}>
                    {children.map((child, index) =>
                        <TreeNode
                            {...this._eventBubbles()}
                            key={child.id || index}
                            node={child}
                            collapsed={child.expanded || null}
                            toggle_point_plus={this.props.toggle_point_plus}
                            toggle_point_minus={this.props.toggle_point_minus}
                            size={this.props.size}   
                            animations={this.props.animations}
                            fontawsome={this.props.fontawsome}
                        >
                        </TreeNode>
                        )}
                </ul>
                );
    }
    Toggle(collapsed) {
        let arrowClassName = 'tree-view_arrow';
        let iconClassbase = <Icon size="1rem" icon="remove-circle-outline" />;
        if (collapsed) {
            iconClassbase = <Icon size="1rem" icon="control-point" />;
        }
        return (<div onClick={this.toggleClick.bind(this)} data-toggle={collapsed} className={arrowClassName}>{iconClassbase}</div>);
    }
    renderLoading(){
        return (
            <ul>
                <li>
                    <decorators.Loading/>
                </li>
            </ul>
        );
    }
    _eventBubbles(){
        return { onToggle: this.props.onToggle };
    }
}

NodeHeader.propTypes = {
    node:PropTypes.object.isRequired,
    animations:PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    fontawsome:PropTypes.bool.isRequired,
    onToggle:PropTypes.func,
    toggle_point_plus:PropTypes.string,
    toggle_point_minus:PropTypes.string,
    size:PropTypes.string
}
export default TreeNode;