const content = require('./home.ejs');
// const layout = require('../../index.ejs'); 
const layout = require('../shared/_layout.ejs'); 
module.exports = layout({
    content:content(),
    title:"home"
}); 
