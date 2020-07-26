/**
 * Calculate each item in pie chart percentage
 * @param {item} element 
 * @param {entire array} data 
 */
const getcolors = (data, colorArray) => {
    const colorMapping = data.map((each, index) => {
        return { result: `${"Title..."}`, color: colorArray[index] }
    });
    return {
        colorMapping, 
    };
};    

export { getcolors };