const content = require('./home.ejs');
const layout = require('../../index.ejs'); 
module.exports = layout({content:content()}); 
