// functions for transforming photo.csv data with missing quotation marks

const fs = require('fs');
const csv = require('csv-parser');

let chunksCount = 0;
let fileBuffer = Buffer.alloc(1024);

const inputCSVPath = './photos.csv';
const outputCSVPath = './photos' + '_transformed.csv';
const pattern = new RegExp("80\n", "g"); ///80\\n/;
const replacement = '80"\n';

const fixQuotationMarks = (string, pattern, replacement) => {
  const regex = pattern;
  const p = string;
  let resultingText = p.replace(regex, replacement);
  return resultingText;
};

const closeFd = (fd) => {
  fs.close(fd, (err) => {
    if (err) throw err;
  });
}

fs.createReadStream(inputCSVPath)
  .once('error', (err) => {
    console.error(err);
  })
  .on('data', (chunk) => {
    const transformedChunk  = fixQuotationMarks(chunk.toString(), pattern, replacement);

    fs.open(outputCSVPath, 'a', (err, fd) => {
      if (err) throw err;
    try {
      fs.appendFile(fd, transformedChunk, 'utf8', (err) => {
        chunksCount++;
        closeFd(fd);
        if (err) throw err;
      });
    } catch (err) {
      console.log('append failed');
      closeFd(fd);
      throw err;
    }
  });
    // console.log('this is a transformed chunk: ', transformedChunk);
    // fileBuffer.concat(transformedChunk);
    // chunks.push(transformedChunk);
  })
  .on('end', function () {
    console.log('end of transformation, chunks processed:', chunksCount);
    // let outputText = chunks.join();
    // console.table(users)
    // TODO: SAVE users data to another file
    // fs.writeFile(outputCSVPath, outputText, (err) => {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log('transformed csv file saved successfully!');
    // });
  });

function writeToCSVFile(users) {
  const filename = 'output.csv';
  fs.writeFile(filename, extractAsCSV(users), err => {
    if (err) {
      console.log('Error writing to csv file', err);
    } else {
      console.log(`saved as ${filename}`);
    }
  });
}

function extractAsCSV(users) {
  // const header = ["Username, Password, Roles"];
  // const rows = users.map(user =>
  //    `${user.username}, ${user.password}, ${user.roles}`
  // );
  // return header.concat(rows).join("\n");
}