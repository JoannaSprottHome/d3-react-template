import { csv } from 'd3';

/**
 * Reads CSV file at location and calls callback, if present.
 * CSV file must reside in the public folder, which is specified with "./"
 * e.g. public/data/my-file.csv would be "./data/my-file.csv"
 * @param {Path to CSV file} path 
 * @param {Callback to be executed} callback 
 */
const readCSV = (path, callback, callbackArgs) => {  
  csv(path).then(data => {
    if (callback) callback(data, callbackArgs);
  });         
}; 

export { readCSV };