/**
 * Calculate each item in pie chart percentage
 * @param {item} element 
 * @param {entire array} data 
 */
const getcolors = (data, colorArray) => {
    const colorMapping = data.map((each, index) => {
        return { result: `${Object.keys(each)[0]}`, color: colorArray[index] }
    });
    return {
        colorMapping, 
    };
};    

export { getcolors };