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
      newArr[index][key].push(each);
    }  
  });
  return newArr;     
};

const formatArrayByDateTotals = (array, [propsToConsolidate]) => { 
  const formattedByDate = formatArrayByDate(array);
  formattedByDate.forEach(each => { // this is each day
    const key = Object.keys(each)[0]; // we only have one object per day
    const value = each[key];
    console.log(`value: ${
      JSON.stringify(
        value
        )
    }`);
  });
  // Object.keys(formattedByDate).forEach(key => {
  //   console.log("the key" + key);        
  //   console.log(formattedByDate[key]); 
  // });

  


};

// const formatArrayByDateTotalsORIG = (array, [propsToConsolidate]) => { 
//   //console.log(propsToConsolidate);
//   //1 only add the props we want
//   // 1a iterate over the object keys - DONE
//   // 1b work out if they are in the array - DONE
//   // 2 add them to the existing value

//   // [prop1, prop2]
//   // [{many props}, {}, {}]

//   // iterate over the original array (forEach)
//   // iterate over each prop 

//   array.forEach((each) => { 
//     // this is each array with one object
//     // check if new array is empty
//     // if so add the first
//   });

//   let onlyTheProps = [];
//   array.forEach((each) => { // but this is 3 entries...
//     onlyTheProps = Object.entries(each).map(eachObj => {
//       const prop = eachObj[0];
//       if (propsToConsolidate.includes(prop)) {
//         if (onlyTheProps.length === 0) {
//           return {[prop]: each[prop]};
//         } else {
//           console.log(onlyTheProps);
//           console.log("needs to be summed");
//           return {[prop]: each[prop]};
//         }
//       }
//     }).filter(defined => defined);
//   });

//   const consolidatedObj = onlyTheProps.reduce(function(result, current) {
//     return Object.assign(result, current);
//   }, {});

//   /////////////////////////////////////////////
//   const newArr = []; 
//   array.forEach((each) => {
//     const dateObj = {
//       [each.Date]: each   
//     };
//     const index = datePresent(each.Date, newArr);
//     if (index < 0) {
//       newArr.push(dateObj);
//     } else {      
//       const key = Object.keys(newArr[index]);
//       //console.log(newArr[index][key]);
//       //newArr[index][key].push(each); // instead of pushing, need to sum the totals
//     }  
//   });
//   return newArr;     
// }; 

export { formatArrayByDate, formatArrayByDateTotals };