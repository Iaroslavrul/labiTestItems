const commentRemover = (elem) => {
    if (elem.nodeType === 8) {
        elem.remove();
    }
};

const getChildren = (element) => {
    const childElements = [...element.childNodes];
    if (childElements.length > 0) {
        childElements.map(elem => {
            commentRemover(elem);
            if (elem.childNodes) {
                getChildren(elem);
            }
        })
    }
};
// test comment
/*and one more
* comment*/
getChildren(document.body);
