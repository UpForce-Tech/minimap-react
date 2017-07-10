import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import App from './App';
import Gallary from './Gallary.js';
import Blog from './Blog.js';
import registerServiceWorker from './registerServiceWorker';

const AppRoute = () => (
  <Router>
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li><Link to="/minimap-react/">Home</Link></li>
                        <li><Link to="/minimap-react/blog">Blog</Link></li>
                        <li><Link to="/minimap-react/gallary">Gallary</Link></li>
                    </ul>
                </div>
            </div>
        </nav>  
        <div className="container">
          <Route exact path="/minimap-react/" component={App}/>
          <Route path="/minimap-react/blog" component={Blog}/>
          <Route path="/minimap-react/gallary" component={Gallary}/>
        </div>
    </div>
  </Router>
);
ReactDOM.render(<AppRoute />, document.getElementById('root'));
registerServiceWorker();
