
export const defaultMatcher = (filterText, node) => {
    if (Object.prototype.toString.call(node) === '[object Array]') {
        node.filter(function (node) {
            return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
        });
    } else {
        return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
    }
}

export const findNode = (node, filter, matcher) => {
    return matcher(filter, node) || // i match
            (node.children && // or i have decendents and one of them match
                    node.children.length &&
                    !!node.children.find(child => findNode(child, filter, matcher)));
};

export const filterTree = (node, filter, matcher = defaultMatcher) => {
    if (matcher(filter, node) !== node.children) {
        return node;
    }
    const filtered = node.filter(child => findNode(child, filter, matcher))
            .map(child => filterTree(child, filter, matcher));
    return Object.assign({}, node, {children: filtered});
}

export const expandFilteredNodes = (node, filter) => {
    let children = [];
    if (Object.prototype.toString.call(node) === '[object Array]') {
        node.filter(function (child) {
            children = children.concat(expandFilteredNodes(child, filter));
            return children;
        });
    } else {
         children.push(searchChildren(node, filter));
    }
    return children;
};
export const searchChildren = (node, filter, matcher = defaultMatcher) => {
    let children = node.children;
    if (!children || children.length === 0) {
        return Object.assign([], node, {toggled: true});
    }
    const childrenWithMatches = node.children.filter(child => findNode(child, filter, matcher));
    var shouldExpand = childrenWithMatches.length > 0;
    // If im going to expand, go through all the matches and see if thier children need to expand
    if (shouldExpand) {
        children = childrenWithMatches.map(child => {
            return searchChildren(child, filter, matcher);
        });
    }
    return Object.assign({}, node, {
        children: children,
        toggled: shouldExpand
    });
}
export const toggleExpandedForAll = (node, expanded = true) => {
    var children = node.children;
    if (node.hasOwnProperty('children') && children.length > 0) {
        return children = singleChildren(node, expanded);
    } else {
        children = node.filter(function (child) {
            let children = child.children;
            if (!children || children.length === 0) {
                child.toggled = true;
                return child;
            }
            const childrenWithMatches = child.children.filter(child => child);
            const shouldExpand = childrenWithMatches.length > 0;
            if (shouldExpand) {
                children = childrenWithMatches.map(child => {
                    child.toggled = expanded;
                    return renderChildren(child, expanded);
                });
            }
            child.toggled = true;
            return children;
        });
        return children;
}
}
export const renderChildren = (node, expanded) => {
    let children = node.children;
    if (!children || children.length === 0) {
        return node;
    }
    const childrenWithMatches = node.children.filter(child => child);
    const shouldExpand = childrenWithMatches.length > 0;
    if (shouldExpand) {
        children = childrenWithMatches.map(child => {
            child.toggled = expanded;
            return renderChildren(child, expanded);
        });
    }
    return children;
}
export const singleChildren = (node, expanded) => {
    let children = node.children;
    if (!children || children.length === 0) {
        return Object.assign({}, node, {toggled: true});
    }
    const childrenWithMatches = node.children.filter(child => child);
    const shouldExpand = childrenWithMatches.length > 0;
    if (shouldExpand) {
        children = childrenWithMatches.map(child => {
            return singleChildren(child);
        });
    }
    return Object.assign({}, node, {
        children: children,
        toggled: expanded
    });
}