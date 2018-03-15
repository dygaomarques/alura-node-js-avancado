var fs = require('fs');

fs.readFile('image.jpg', ( err, data ) => {
  console.log('Reading file');
  
  fs.writeFile('image-buffer.jpg', data, ( err ) => {
    if( err ) {
      console.log(err);
      return;
    }
    console.log('Writing file');
    
  })
});