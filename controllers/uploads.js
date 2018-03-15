const fs = require('fs');

module.exports = (app) => {

  app.post('/upload/image', (req, res) => {

    let filename = req.headers.filename;

    req.pipe(fs.createWriteStream('./uploads/image/' + filename + '.jpg'))
        .on('finish', () => {
          res.send({
            message: "File uploaded"
          });
        })
        .on('error', (err) => {
          console.log(err);
          res.status(400).send({
            message: "File not uploaded!",
            error: err.stack
          })
        });

  })

}