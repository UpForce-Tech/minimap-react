import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import App from './App';
import Gallary from './Gallary.js';
import Blog from './Blog.js';


const AppRoute = () => (
  <Router>
    <div>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="container">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/gallary">Gallary</Link></li>
                    </ul>
                </div>
            </div>
        </nav>  
        <div className="container">
          <Route exact path="/" component={App}/>
          <Route path="/blog" component={Blog}/>
          <Route path="/gallary" component={Gallary}/>
        </div>
    </div>
  </Router>
);
ReactDOM.render(<AppRoute />, document.getElementById('root'));
registerServiceWorker();
