import React, { Component } from 'react';
import TreeView from './component/tree-view';
import * as filters from './component/filters';
import Minimap from './component/minimap';
const data = [{
        name: 'React Application TreeView',
        toggled: true,
        children: [
            {
                name: 'example',
                children: [
                    {name: 'app.js'},
                    {name: 'data.js'},
                    {name: 'index.html'},
                    {name: 'styles.js'},
                    {name: 'webpack', children: [
                            {
                                name: 'app', children: [
                                    {name: 'folder.js', children: [
                                            {name: 'folder2',
                                                children: [
                                                    {name: 'a123',
                                                        children: [{
                                                                name: 'test.js'
                                                            }]
                                                    }
                                                ]
                                            }
                                        ]}
                                ]
                            },
                            {name: 'data.js'},
                            {name: 'index.html'},
                            {name: 'styles.css'}, ]}
                ]
            },
            {
                name: 'example',
                children: [
                    {name: 'app.js'},
                    {name: 'data.js'},
                    {name: 'index.html'},
                    {name: 'styles.js'},
                    {name: 'webpack.config.js'}
                ]
            },
            {
                name: 'node_modules',
                children: [{
                        name: 'abad',
                        children: [{
                                name: 'lib',
                                loading: true,
                                children: [{name: 'file.js'}]
                            }]
                    }]
            },
            {
                name: 'src',
                children: [
                    {
                        name: 'components',
                        children: [
                            {name: 'decorators.js'},
                            {name: 'treebeard.js'}
                        ]
                    },
                    {name: 'index.js'}
                ]
            },
            {
                name: 'themes',
                children: [
                    {name: 'animations.js'},
                    {name: 'default.js'}
                ]
            },
            {name: 'Gulpfile.js'},
            {name: 'index.js'},
            {name: 'package.json'}
        ]
    }, {
        name: 'React Application TreeView',
        toggled: true,
        children: [
            {
                name: 'example',
                children: [
                    {name: 'app.js'},
                    {name: 'data.js'},
                    {name: 'index.html'},
                    {name: 'styles.js'},
                    {name: 'webpack', children: [
                            {
                                name: 'app', children: [
                                    {name: 'folder.js', children: [
                                            {name: 'folder2',
                                                children: [
                                                    {name: 'a123',
                                                        children: [{
                                                                name: 'test.js'
                                                            }]
                                                    }
                                                ]
                                            }
                                        ]}
                                ]
                            },
                            {name: 'data.js'},
                            {name: 'index.html'},
                            {name: 'styles.css'}, ]}
                ]
            },
            {
                name: 'example',
                children: [
                    {name: 'app.js'},
                    {name: 'data.js'},
                    {name: 'index.html'},
                    {name: 'styles.js'},
                    {name: 'webpack.config.js'}
                ]
            },
            {
                name: 'node_modules',
                children: [{
                        name: 'abad',
                        children: [{
                                name: 'lib',
                                loading: true,
                                children: [{name: 'file.js'}]
                            }]
                    }]
            },
            {
                name: 'src',
                children: [
                    {
                        name: 'components',
                        children: [
                            {name: 'decorators.js'},
                            {name: 'treebeard.js'}
                        ]
                    },
                    {name: 'index.js'}
                ]
            },
            {
                name: 'themes',
                children: [
                    {name: 'animations.js'},
                    {name: 'default.js'}
                ]
            },
            {name: 'Gulpfile.js'},
            {name: 'index.js'},
            {name: 'package.json'}
        ]
    }, {
        name: 'React Application TreeView',
        toggled: true,
        children: [
            {
                name: 'example',
                children: [
                    {name: 'app.js'},
                    {name: 'data.js'},
                    {name: 'index.html'},
                    {name: 'styles.js'},
                    {name: 'webpack', children: [
                            {
                                name: 'app', children: [
                                    {name: 'folder.js', children: [
                                            {name: 'folder2',
                                                children: [
                                                    {name: 'a123',
                                                        children: [{
                                                                name: 'test.js'
                                                            }]
                                                    }
                                                ]
                                            }
                                        ]}
                                ]
                            },
                            {name: 'data.js'},
                            {name: 'index.html'},
                            {name: 'styles.css'}, ]}
                ]
            },
            {
                name: 'example',
                children: [
                    {name: 'app.js'},
                    {name: 'data.js'},
                    {name: 'index.html'},
                    {name: 'styles.js'},
                    {name: 'webpack.config.js'}
                ]
            },
            {
                name: 'node_modules',
                children: [{
                        name: 'abad',
                        children: [{
                                name: 'lib',
                                loading: true,
                                children: [{name: 'file.js'}]
                            }]
                    }]
            },
            {
                name: 'src',
                children: [
                    {
                        name: 'components',
                        children: [
                            {name: 'decorators.js'},
                            {name: 'treebeard.js'}
                        ]
                    },
                    {name: 'index.js'}
                ]
            },
            {
                name: 'themes',
                children: [
                    {name: 'animations.js'},
                    {name: 'default.js'}
                ]
            },
            {name: 'Gulpfile.js'},
            {name: 'index.js'},
            {name: 'package.json'}
        ]
    }];

class CompanyPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: data,
        };
        this.collapseAll = this.collapseAll.bind(this);
        this.expandAll = this.expandAll.bind(this);
        this.onToggle = this.onToggle.bind(this);
    }
    onToggle(node, toggled) {
        if (this.state.cursor) {
            this.setState({cursor: {active: false}});
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    }
    onFilterMouseUp(e) {
        const filter = e.target.value.trim();
        if (!filter) {
            return this.setState({treeData: data})
        }
        // var filtered = filters.filterTree(data, filter);
        var filtered = filters.expandFilteredNodes(data, filter);
        this.setState({treeData: filtered});
    }
    expand(expanded) {
        this.setState({
            treeData: filters.toggleExpandedForAll(this.state.treeData, expanded)
        });
    }
    collapseAll() {
        this.expand(false);
    }
    expandAll() {
        this.expand(true);
    }
    render() {
        return(
                <div className="treeview-1" >
                    <div className="section-1" id="a">
                        <button onClick={this.expandAll}>Expand all</button>
                        <button onClick={this.collapseAll}>Collapse all</button>
                        <div>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <i className="fa fa-search"></i>
                                </span>
                                <input type="text"
                                       className="form-control"
                                       placeholder="Search the tree..."
                                       onKeyUp={this.onFilterMouseUp.bind(this)}
                                       />
                            </div>
                        </div>
                        <TreeView 
                            data={this.state.treeData} 
                            toggle_point_plus="M13 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-1-5c-5.51 0-10 4.49-10 10s4.49 10 10 10 10-4.49 10-10-4.49-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
                            toggle_point_minus="M7 11v2h10v-2h-10zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            size="15px"
                            onToggle={this.onToggle}
                            />
                        <Minimap 
                            IdName="root"
                            position="right" 
                            smoothScroll={true} 
                            smoothScrollDelay={200} 
                            toggle={true}
                            />
                
                    </div>
                </div>
                );
    }
}

class App extends Component {
    render() {
        return (
                <div className="App">
                    <CompanyPeople/>
                </div>
                );
    }
}

export default App;
