import React, {Component} from 'react';
        import Minimap from './component/minimap';
        class Home extends Component {
        render() {
        return(<div>
    <div className="row">
        <div className="col-lg-8">
            <h1>Blog Post Title</h1>
            <p className="lead">
                by <a href="javascript:void(0);">React Minimap Component</a>
            </p>
            <hr/>
            <p><span className="glyphicon glyphicon-time"></span> Posted on August 24, 2013 at 9:00 PM</p>
            <hr/>
            <img className="img-responsive" src="http://placehold.it/900x300" alt=""/>
            <hr/>
            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, doloribus, dolorem iusto blanditiis unde eius illum consequuntur neque dicta incidunt ullam ea hic porro optio ratione repellat perspiciatis. Enim, iure!</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem voluptates cupiditate voluptas illo saepe quaerat numquam recusandae? Qui, necessitatibus, est!</p>
            <hr/>
            <div className="well">
                <h4>Leave a Comment:</h4>
                <form>
                    <div className="form-group">
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <hr/>
            <div className="media">
                <a className="pull-left" href="javascript:void(0);">
                    <img className="media-object" src="http://placehold.it/64x64" alt=""/>
                </a>
                <div className="media-body">
                    <h4 className="media-heading">Start Bootstrap
                        <small>August 25, 2014 at 9:30 PM</small>
                    </h4>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                </div>
            </div>
            <div className="media">
                <a className="pull-left" href="javascript:void(0);">
                    <img className="media-object" src="http://placehold.it/64x64" alt=""/>
                </a>
                <div className="media-body">
                    <h4 className="media-heading">Start Bootstrap
                        <small>August 25, 2014 at 9:30 PM</small>
                    </h4>
                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                    <div className="media">
                        <a className="pull-left" href="javascript:void(0);">
                            <img className="media-object" src="http://placehold.it/64x64" alt=""/>
                        </a>
                        <div className="media-body">
                            <h4 className="media-heading">Nested Start Bootstrap
                                <small>August 25, 2014 at 9:30 PM</small>
                            </h4>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="well">
                <h4>Blog Search</h4>
                <div className="input-group">
                    <input type="text" className="form-control"/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">
                            <span className="glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>
            </div>
            <div className="well">
                <h4>Blog Categories</h4>
                <div className="row">
                    <div className="col-lg-6">
                        <ul className="list-unstyled">
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6">
                        <ul className="list-unstyled">
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                            <li><a href="javascript:void(0);">Category Name</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="well">
                <h4>Side Widget Well</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, perspiciatis adipisci accusamus laudantium odit aliquam repellat tempore quos aspernatur vero.</p>
            </div>
        </div>
    </div>
    <Minimap 
        IdName="root"
        position="right" 
        smoothScroll={true} 
        smoothScrollDelay={200} 
        toggle={true}
        />
</div>)
    }
};
export default Home;