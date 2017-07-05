import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './component/minimap.css';

class Minimap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mousedown: false
        };
    }
    componentDidMount() {
        if (!this.props.IdName) {
            console.error('Warning: Undefined Html DOM Id.');
            return false;
        } else if (document.getElementById(this.props.IdName) === null) {
            console.error("Warning: can't find the specific id in your DOM");
            return false;
        }
        const miniElement = document.getElementById(this.props.IdName);
        if (typeof (miniElement) === 'undefined' && miniElement === null)
            return false;
        let minimapElement = document.createElement('div');
        minimapElement.className = 'minimap-treeview';
        document.body.appendChild(minimapElement);
        let cloneDiv = miniElement.cloneNode(true);
        cloneDiv.className = "minimap noselect " + this.props.IdName;
        let miniregion = document.createElement('div');
        miniregion.className = 'miniregion';
        document.body.appendChild(miniregion);
        minimapElement.appendChild(cloneDiv);
        let mElement = document.getElementsByClassName('minimap')[0];
        let minimapOveraly = document.createElement('div');
        minimapOveraly.className = 'minimap-overlay';
        mElement.appendChild(minimapOveraly);
        this.onResizeHandler(mElement);
        window.addEventListener('resize', this.onResizeHandler.bind(this, miniElement), false);
        window.addEventListener('scroll', this.onScrollHandler.bind(this), false);
        miniregion.addEventListener('mousedown', this.onMouseDownHandler.bind(this), false);
        miniregion.addEventListener('mouseup', this.onMouseUpHandler.bind(this), false);
        miniregion.addEventListener('mousemove', this.onMouseMoveHandler.bind(this), false);
        miniregion.addEventListener('click', this.onClickHandler.bind(this), false);
        mElement.addEventListener('mousedown', this.onMouseDownHandler.bind(this), false);
        mElement.addEventListener('mouseup', this.onMouseUpHandler.bind(this), false);
        mElement.addEventListener('mousemove', this.onMouseMoveHandler.bind(this), false);
        mElement.addEventListener('click', this.onClickHandler.bind(this), false);
    }

    componentDidUpdate() {
        if (!this.props.IdName) {
            console.error('Warning: Undefined Html DOM Id.');
            return false;
        } else if (document.getElementById(this.props.IdName) === null) {
            console.error("Warning: can't find the specific id in your DOM");
            return false;
        }
        let hasClassBody = document.getElementsByClassName('minimap')[0];
        let hasRegionBody = document.getElementsByClassName('miniregion')[0];
        hasRegionBody.parentNode.removeChild(hasRegionBody);
        hasClassBody.parentNode.removeChild(hasClassBody);
        const miniElement = document.getElementById(this.props.IdName);
        let minimapElement = document.getElementsByClassName('minimap-treeview')[0];
        let cloneDiv = miniElement.cloneNode(miniElement);
        cloneDiv.className = 'minimap noselect ' + this.props.IdName;
        let miniregion = document.createElement('div');
        miniregion.className = 'miniregion';
        document.body.appendChild(miniregion);
        minimapElement.appendChild(cloneDiv);
        let mElement = document.getElementsByClassName('minimap')[0];
        let minimapOveraly = document.createElement('div');
        minimapOveraly.className = 'minimap-overlay';
        mElement.appendChild(minimapOveraly);
        this.onResizeHandler(this);
        mElement.addEventListener('mousemove', this.onMouseMoveHandler.bind(this));
        mElement.addEventListener('click', this.onClickHandler.bind(this), false);
        miniregion.addEventListener('mousedown', this.onMouseDownHandler.bind(this), false);
        miniregion.addEventListener('mouseup', this.onMouseUpHandler.bind(this), false);
        miniregion.addEventListener('mousemove', this.onMouseMoveHandler.bind(this), false);
        miniregion.addEventListener('click', this.onClickHandler.bind(this), false);
    }
    onResizeHandler(e) {
        const {offsetHeightRatio, offsetWidthRatio, widthRatio, heightRatio, style, position, toggle} = this.props;
        if (!toggle)
            return false;
        const minimap = document.getElementsByClassName('minimap')[0];
        const minimapOverlay = document.getElementsByClassName('minimap-overlay')[0];
        const minimapTree = document.getElementsByClassName('minimap-overlay')[0];
        let scale = this.scale(e);
        let animation, width, height, top, leftRight, styles, minimapHeight = minimap.clientHeight - 10,
                offsetHeight = document.documentElement.clientHeight * offsetHeightRatio,
                offsetWidth = document.documentElement.clientWidth * offsetWidthRatio;
        width = document.documentElement.clientWidth * (1 / scale.x) * widthRatio;
        height = document.documentElement.clientHeight * (1 / scale.y) * heightRatio;
        top = minimap.clientHeight * (scale.y - 1) / 2 + offsetHeight;
        leftRight = minimap.clientWidth * (scale.x - 1) / 2 + offsetWidth;
        if (document.body.scrollHeight > document.body.clientHeight) {
            animation = 'scale3d(0.4,0.4,1)';
            styles = {
                '-webkit-transform': animation,
                '-moz-transform': animation,
                '-ms-transform': animation,
                '-o-transform': animation,
                transforn: animation,
                width: width + 'px',
                height: height + 'px',
                margin: '0px',
                padding: '0px',
                'transform-origin': '0% 0%'
            };
        } else {
            animation = 'scale3d(' + scale.x + ',' + scale.y + ',1)';
            styles = {
                '-webkit-transform': animation,
                '-moz-transform': animation,
                '-ms-transform': animation,
                '-o-transform': animation,
                transforn: animation,
                width: width + 'px',
                height: height + 'px',
                margin: '0px',
                padding: '0px',
                top: top + 'px'
            };
            styles[position] = leftRight + 'px';
        }
        Object.assign(minimapTree.style, {height: minimapHeight + 'px', width: width + 'px'});
        Object.assign(minimap.style, this._mergeStyles(styles, style));
        Object.assign(minimapOverlay.style, {height: height + 'px', width: width + 'px'});
        this._miniRegion(e);
    }
    onScrollHandler() {
        let minimap = document.getElementsByClassName('minimap')[0];
        let minregion = document.getElementsByClassName('miniregion')[0];
        const {offsetHeightRatio} = this.props;
        minimap = minimap.getBoundingClientRect();
        let scale = this.scale();
        let offsetHeight = window.innerHeight * offsetHeightRatio;
        let offsetTop = minimap.top * scale.y;
        let offsetPosition = (window.pageYOffset) * scale.y;
        let regionHeight = minregion.offsetHeight;
        let regionBottom = minimap.offsetHeight * scale.y + offsetTop;

        if (offsetPosition + regionHeight + offsetHeight < offsetTop || offsetPosition > regionBottom) {
            Object.assign(minregion.style, {display: 'none'});
        } else {
            Object.assign(minregion.style, {top: offsetPosition + offsetHeight - offsetTop + 'px', display: 'block'});
        }

    }
    onClickHandler(e) {
        this._scrollTop(e);
        this.setState({mousedown: false});
    }
    onMouseMoveHandler(e) {
        const mouseDown = this.state.mousedown;
        if (!mouseDown) {
            this.setState({mousedown: false});
            return false;
        }
        this._scrollTop(e);
    }
    onMouseDownHandler(e) {
        this.setState({mousedown: true});
        let region = document.getElementsByClassName('miniregion')[0];
        let minimap = document.getElementsByClassName('minimap')[0];
        this.addClass(region, 'dragging');
        this.addClass(minimap, 'noselect');
    }
    onMouseUpHandler(e) {
        let region = document.getElementsByClassName('miniregion')[0];
        let minimap = document.getElementsByClassName('minimap')[0];
        this.removeClass(region, 'dragging');
        this.removeClass(minimap, 'noselect');
        this.setState({mousedown: false});
    }
    scale() {
        const {widthRatio, heightRatio} = this.props;
        let documentElement = document.documentElement, minimap = document.getElementsByClassName('minimap')[0];
        return {
            x: (documentElement.clientWidth / minimap.clientWidth) * widthRatio,
            y: (documentElement.clientHeight / minimap.clientHeight) * heightRatio
        };
    }
    onScrollChecker(element) {
        return document.getElementById(element).scrollHeight > document.getElementById(element).clientHeight;
    }
    _mergeStyles(...args) {
        return Object.assign({}, ...args);
    }
    _miniRegion() {
        if (document.body.scrollHeight > document.body.clientHeight) {
            Object.assign(document.getElementsByClassName('miniregion')[0].style, {display: 'none'});
            return false;
        }
        const {offsetHeightRatio, offsetWidthRatio, position, style} = this.props;
        const minimap = document.getElementsByClassName('minimap')[0].getBoundingClientRect();
        let scale = this.scale();
        let regionTop = minimap.top * scale.y;
        let offsetWidth = document.documentElement.clientWidth * offsetWidthRatio - 5;
        let styles = {
            width: (document.getElementsByClassName('minimap')[0].offsetWidth * scale.x) + 15 + 'px',
            height: window.innerHeight * scale.y + 'px',
            margin: '0px',
            top: window.pageYOffset * scale.y + document.documentElement.clientHeight * offsetHeightRatio - regionTop + 'px',
            display: 'block'
        };
        styles[position] = offsetWidth + 'px';
        Object.assign(document.getElementsByClassName('miniregion')[0].style, this._mergeStyles(styles, style));
    }
    _scrollTop(e) {
        const {offsetHeightRatio, toggle, smoothScrollDelay, smoothScroll} = this.props;
        if (!toggle)
            return false;
        const minimap = document.getElementsByClassName('minimap')[0].getBoundingClientRect();
        let scale = this.scale();
        let offsetHeight = document.documentElement.clientHeight * offsetHeightRatio;
        let offsetTop = minimap.top * scale.y;
        let regionHeight = document.getElementsByClassName('miniregion')[0].offsetHeight;
        let target = (e.clientY - regionHeight / 2 - offsetHeight + offsetTop) / scale.y;
        if (e.type === 'click' && smoothScroll) {
            let current = window.pageYOffset;
            let maxTarget = document.getElementsByClassName('minimap')[0].offsetHeight;
            target = Math.max(target, Math.min(target, maxTarget));
            let direction = target > current;
            let delay = smoothScrollDelay;
            let distance = Math.abs(current - target);
            let r = delay / distance;
            let unitScroll = 1;
            let unitDelay = 4;

            if (r >= 4) {
                unitDelay = parseInt(unitScroll, 10);
            } else if (r >= 1) {
                unitScroll = parseInt(r, 10) * 4;
            } else {
                unitScroll = (4 / r);
            }
            let next = current;
            let count = parseInt(distance / unitScroll, 15);
            var smoothScrolling = () => {
                next = next + (direction ? unitScroll : -unitScroll);
                if (--count <= 0) {
                    clearInterval(timer);
                    next = target;
                }
                window.scrollTo(0, next);
            };
            let timer = window.setInterval(smoothScrolling, unitDelay);
        } else {
            window.scrollTo(0, target);
        }
        e.stopPropagation();
    }

    addClass(el, className) {
        if (el.className)
            el.classList.add(className);
        else if (!this.hasClass(el, className))
            el.className += " " + className;

    }
    hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        else
            return !!el.className.match(new RegExp('(\\b' + className + '(\\b)'));
    }
    removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (this.hasClass(el, className)) {
            let reg = new RegExp('(\\b' + className + '(\\b)');
            el.className = el.className.replace(reg, ' ');
        }
    }
    render() {
        return <div></div>;
    }
}
Minimap.defaultProps = {
    heightRatio: 0.6,
    widthRatio: 0.07,
    offsetHeightRatio: 0.038,
    offsetWidthRatio: 0.032,
    position: 'right',
    smoothScroll: true,
    smoothScrollDelay: 200,
    toggle: true
};
Minimap.propTypes = {
    heightRatio: PropTypes.number,
    widthRatio: PropTypes.number,
    offsetHeightRatio: PropTypes.number,
    offsetWidthRatio: PropTypes.number,
    position: PropTypes.string,
    smoothScroll: PropTypes.bool,
    smoothScrollDelay: PropTypes.number,
    toggle: PropTypes.bool,
    IdName: PropTypes.string.isRequired
};
export default Minimap;