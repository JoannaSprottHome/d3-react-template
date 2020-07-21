import { scaleOrdinal } from 'd3';

/**
 * Calculate each item in pie chart percentage
 * @param {item} element 
 * @param {entire array} data 
 */
const getcolors = (data, colorArray) => {
    const percentage = (element, data) => {
        const arrSum = arr => arr.reduce((a,b) => a +b, 0);        
        return Math.round((element*100)/arrSum(data));
    }; 

    const colorMapping = data.map((each, index, array) => {
        return { result: `${percentage(each, array)}`, color: colorArray[index] }
    });

    const coloursOnly = colorMapping.map(color => color.color);
    const colors = scaleOrdinal(coloursOnly);

    return {
        colorMapping, // needed for legend
        colors
    };
};    

export { getcolors };