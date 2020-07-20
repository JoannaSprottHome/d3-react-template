/**
 * Returns Margin
 * @param {*} top 
 * @param {*} right 
 * @param {*} bottom 
 * @param {*} left 
 * @param {*} width 
 * @param {*} height 
 */
const returnMargin = (top, right, bottom, left, width, height) => {
    return {    
        top, 
        right, 
        bottom, 
        left, 
        width: width - left - right,
        height: height - top - bottom
    };
};

export { returnMargin };