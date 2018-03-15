const fs = require('fs');
const file = process.argv[2];

fs.createReadStream(file)
  .pipe(fs.createWriteStream('image-stream.jpg'))
  .on('finish', () => {
    console.log('Stream finished!');
  });