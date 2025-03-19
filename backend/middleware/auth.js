const config = require('../config')
const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers['authorization']; 

    if (!apiKey || apiKey !== `ApiKey-${config.Api_key}`) {
        return res.status(403).json({status:false, errors: "Invalid API Key" });
    }

    next(); 
};

module.exports = apiKeyAuth