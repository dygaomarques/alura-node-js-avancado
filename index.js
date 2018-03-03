const app = require('./config/custom-express')();

app.listen( 3000, () => console.log('The rock\'s happens on port 3000!') );