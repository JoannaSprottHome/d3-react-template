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

const formatArrayByDateTotals = (array, [propsToConsolidate]) => { 
  console.log(propsToConsolidate);
  //1 only add the props we want
  // 1a iterate over the object keys - DONE
  // 1b work out if they are in the array - DONE
  // 2 add them to the existing value

  array.forEach((each) => {
    // console.log(each); // each is an object
    // console.log(Object.keys(each));

    Object.entries(each).forEach(eachObj => {
      const prop = eachObj[0];
      propsToConsolidate.find(propToConsolidate => {
        if (propToConsolidate === prop) {
          // console.log(` prop should be added: ${prop}`);
        }
        return propToConsolidate === prop;
      });
    });

  });

  /////////////////////////////////////////////
  const newArr = []; 
  array.forEach((each) => {
    const dateObj = {
      [each.Date]: each   
    };
    const index = datePresent(each.Date, newArr);
    if (index < 0) {
      newArr.push(dateObj);
    } else {      
      const key = Object.keys(newArr[index]);
      //console.log(newArr[index][key]);
      //newArr[index][key].push(each); // instead of pushing, need to sum the totals
    }  
  });
  return newArr;     
}; 

export { formatArrayByDate, formatArrayByDateTotals };