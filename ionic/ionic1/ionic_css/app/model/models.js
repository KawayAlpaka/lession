var mongoose = require('mongoose');

var accessTokenSchema = require('../schema/access_token');
mongoose.model('AccessToken', accessTokenSchema);

