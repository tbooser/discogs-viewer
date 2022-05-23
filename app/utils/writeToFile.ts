const fs = require('fs');

export default (rawData: any, filename: string) => {
  let data = JSON.stringify(rawData, null, 2);
  fs.writeFile(filename, data, (err: any) => {
    if (err) throw err;
    console.log('Data written to file');
  });
};
