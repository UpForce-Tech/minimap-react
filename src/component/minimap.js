import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './minimap.css';

class Minimap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mousedown: false
        };
    }
    componentDidMount() {
        const miniElement = document.getElementsByTagName('body')[0];
        let cloneDiv = miniElement.cloneNode(true);
        cloneDiv.className = "minimap noselect";
        let miniregion = document.createElement('div');
        miniregion.className = 'miniregion';
        document.body.appendChild(miniregion);
        document.body.appendChild(cloneDiv);
        let mElement = document.getElementsByClassName('minimap')[0];
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
        let hasClassBody = document.getElementsByClassName('minimap')[0];
        let hasRegionBody = document.getElementsByClassName('miniregion')[0];
        hasRegionBody.parentNode.removeChild(hasRegionBody);
        hasClassBody.parentNode.removeChild(hasClassBody);
        const miniElement = document.getElementsByTagName('body')[0];
        let cloneDiv = miniElement.cloneNode(miniElement);
        cloneDiv.className = 'minimap noselect';
        let miniregion = document.createElement('div');
        miniregion.className = 'miniregion';
        document.body.appendChild(miniregion);
        miniElement.appendChild(cloneDiv);
        this.onResizeHandler(this);
        let mElement = document.getElementsByClassName('minimap')[0];
        mElement.addEventListener('mousemove', this.onMouseMoveHandler.bind(this));
        mElement.addEventListener('click', this.onClickHandler.bind(this), false);
        miniregion.addEventListener('mousedown', this.onMouseDownHandler.bind(this), false);
        miniregion.addEventListener('mouseup', this.onMouseUpHandler.bind(this), false);
        miniregion.addEventListener('mousemove', this.onMouseMoveHandler.bind(this), false);
        miniregion.addEventListener('click', this.onClickHandler.bind(this), false);
    }
    onResizeHandler(e) {
        const {offsetHeightRatio, offsetWidthRatio, widhtRatio, heightRatio, style, position,toggle} = this.props;
        if(!toggle) return false;
        const minimap = document.getElementsByClassName('minimap')[0];
        let scale = this.scale(e);
        let animation = 'scale(' + scale.x + ',' + scale.y + ')';
        let offsetHeight = document.documentElement.clientHeight * offsetHeightRatio;
        let offsetWidth = document.documentElement.clientWidth * offsetWidthRatio;
        let top = minimap.clientHeight * (scale.y - 1) / 2 + offsetHeight;
        let leftRight = minimap.clientWidth * (scale.x - 1) / 2 + offsetWidth;
        let width = document.documentElement.clientWidth * (1 / scale.x) * widhtRatio;
        let height = document.documentElement.clientHeight * (1 / scale.y) * heightRatio;

        let styles = {
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
        Object.assign(minimap.style, this._mergeStyles(styles, style));
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
        const {widhtRatio, heightRatio} = this.props;
        let documentElement = document.documentElement, minimap = document.getElementsByClassName('minimap')[0];
        return {
            x: (documentElement.clientWidth / minimap.clientWidth) * widhtRatio,
            y: (documentElement.clientHeight / minimap.clientHeight) * heightRatio
        };
    }
    _mergeStyles(...args) {
        return Object.assign({}, ...args);
    }
    _miniRegion() {
        if(document.body.scrollHeight > document.body.clientHeight) return false;
        const {offsetHeightRatio, offsetWidthRatio, position, style} = this.props;
        const minimap = document.getElementsByClassName('minimap')[0].getBoundingClientRect();
        let scale = this.scale();
        let regionTop = minimap.top * scale.y;
        let offsetWidth = document.documentElement.clientWidth * offsetWidthRatio;
        let styles = {
            width: document.getElementsByClassName('minimap')[0].offsetWidth * scale.x + 'px',
            height: window.innerHeight * scale.y + 'px',
            margin: '0px',
            top: window.pageYOffset * scale.y + document.documentElement.clientHeight * offsetHeightRatio - regionTop + 'px'
        };
        styles[position] = offsetWidth + 'px';
        Object.assign(document.getElementsByClassName('miniregion')[0].style, this._mergeStyles(styles, style))
    }
    _scrollTop(e) {
        const {offsetHeightRatio,toggle,smoothScrollDelay,smoothScroll} = this.props;
        if(!toggle) return false;
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
    widhtRatio: 0.05,
    offsetHeightRatio: 0.035,
    offsetWidthRatio: 0.035,
    position: 'right',
    smoothScroll: true,
    smoothScrollDelay: 200,
    toggle: true
};
Minimap.propTypes = {
    heightRatio: PropTypes.number,
    widhtRatio: PropTypes.number,
    offsetHeightRatio: PropTypes.number,
    offsetWidthRatio: PropTypes.number,
    position: PropTypes.string,
    smoothScroll: PropTypes.bool,
    smoothScrollDelay: PropTypes.number,
    toggle: PropTypes.bool
};
export default Minimap;