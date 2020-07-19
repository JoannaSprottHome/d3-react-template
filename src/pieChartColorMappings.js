import { scaleOrdinal } from 'd3';
/**
 * Calculate each item in pie chart percentage
 * @param {item} element 
 * @param {entire array} data 
 */
const getcolors = (data, colorArray) => {
    const percentage = (element, data) => {
        const arrSum = arr => arr.reduce((a,b) => a +b, 0);
        return (element*100)/arrSum(data);
    }; 

    // TODO: Use this to add legend
    const mappingArray = data.map((each, index, array) => {
        return { result: `${percentage(each, array)}`, color: colorArray[index] }
    });
    
    const coloursOnly = mappingArray.map(color => {
        return color.color;
    });

    return scaleOrdinal(coloursOnly);
};    

export { getcolors };