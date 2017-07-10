import React, {Component} from 'react';
import Minimap from './component/minimap';



class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numChildren: 20
        };
    }
    onAddChild(e) {
        e.preventDefault();
        this.setState({
            numChildren: this.state.numChildren + 10
        });
    }
    render() {
        const children = [];
        for (var i = 0; i < this.state.numChildren; i += 1) {
            children.push(<ChildComponent key={i} number={i} />);
        }
        return(
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">Thumbnail Gallery</h1>
                        </div>
                        <ParentComponent addChild={this.onAddChild.bind(this)}>
                            {children}
                        </ParentComponent>
                    </div>
                    <Minimap 
                        rootId="root"
                        position="right" 
                        smoothScroll={true} 
                        smoothScrollDelay={200} 
                        toggle={true}
                        />
                </div>
                );
    }
}
;
class ParentComponent extends React.Component {
    render() {
        return (
                <div className="card calculator">
                    <p><a href="#" style={{position:'fixed',bottom:'25px',left:'0px'}} className="btn btn-success"  onClick={this.props.addChild}>Add More Gallery</a></p>
                    <div id="children-pane">
                        {this.props.children}
                    </div>
                </div>
                );
    }
}
class ChildComponent extends React.Component {
    render() {
        return (
                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="javascript:void(0);">
                        <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
                    </a>
                </div>
                );
    }
}
;

export default Gallery;