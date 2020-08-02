const datePresent = (date, array) => {
  return array.findIndex(each => {
    return Object.keys(each)[0] === date;
  });
};

/**
 * Returns array with objects of the same date grouped into single array
 * @param {array} array 
 */
const formatArrayByDate = array => { 
  const newArr = []; 
  array.forEach((each) => {
    const dateObj = {
      [each.Date]: [each]     
    };
    const index = datePresent(each.Date, newArr);
    if (index < 0) {
      newArr.push(dateObj);
    } else {      
      const key = Object.keys(newArr[index]);
      newArr[index][key].push(each); // instead of pushing, need to sum the totals
    }  
  });
  return newArr;     
}; 

export { formatArrayByDate };