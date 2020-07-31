import { csv } from 'd3';

const readCSV = (path, callback) => {  
  csv(path).then(data => {
    if (callback) callback(data);
  });         
}; 

export { readCSV };