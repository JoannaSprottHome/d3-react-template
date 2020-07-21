/**
 * Returns Margin
 * @param {*} marginData
 */
const returnMargin = (marginData) => {
    const { top, right, bottom, left, width, height } = marginData;
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