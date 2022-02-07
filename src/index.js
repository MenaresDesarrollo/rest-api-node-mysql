const express = require('express');
const app = express();

// setttings
app.set('port', process.env.PORT || 3000);

// middleawares
app.use(express.json());

// Routes
app.use(require('./routes/employees'));


// starting server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});