const urlModel = require('../model/urlModel');
const crypto = require('crypto');

exports.convertUrl = (req, res) => {
    const { originalUrl } = req.body;
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;

    if (!originalUrl || !urlRegex.test(originalUrl)) {
        return res.status(400).json({ status: false, errors: "Invalid URL" });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256').update(originalUrl + salt).digest('hex');
    const shortUrl = hash.slice(0, 8);
    const shortern_url = `short.url/${shortUrl}`
    console.log(shortern_url);
    const createUrl = new urlModel({
        original_url: originalUrl,
        short_url: shortern_url
    });

    createUrl.save()
        .then(() => {
            return res.status(200).json({ status: true, message: "Short URL created successfully" });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ status: false, errors: "An error occurred while creating the short URL" });
        });
};


exports.geturl = (req,res) => {
    const id = req.params.shortCode 
    urlModel.findById(id)
    .then((url) =>{
        if(!url) {
            throw ({Status:false,errors:"No Such Url Found"})
        }
        return res.status(200).json({status:true,message:"Url Retivred",data:url})
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ status: false, errors: "An error occurred while getting the short URL" });
    });
}


exports.updateUrl = (req,res) => {
    const id = req.query.shortCode
    urlModel.findById(id)
    .then((url) =>{
        if(!url) {
            throw ({Status:false,errors:"No Such Url Found"})
        }
        url.redirect_count = url.redirect_count + 1
        return url.save() 
    })
    .then((updateUrl) => {
        if(!updateUrl) {
            throw ({status:false,errors:"can't update count"})
        }
        return res.status(200).json({status:true,message:'Count updated successfully',data:updateUrl})
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ status: false, errors: "An error occurred while updating the short URL count" });
    });
}


exports.geturlcount = (req,res) => {
    const id = req.params.shortCode 
    urlModel.findById(id)
    .then((url) =>{
        if(!url) {
            throw ({Status:false,errors:"No Such Url Found"})
        }
        return res.status(200).json({status:true,message:"Url Retivred",data:url.redirect_count})
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ status: false, errors: "An error occurred while getting the short URL count" });
    });
}

exports.listallurl = (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5; 
    let result
    urlModel.find()
      .skip((page - 1) * limit)
      .limit(limit).sort({ createdAt: -1 }).exec()
      .then((data) => {
        if (!data) {
          throw { status: false, error: "No records found" };
        }
        result = data;
        return urlModel.countDocuments(); // Assuming User model exists and you're counting users
      })
      .then((count) => {
        return res.status(200).json({
          status: true,
          message: 'Got All URLs successfully',
          data: result,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          count: count
        });
      })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ status: false, errors: "An error occurred while getting the short URL count" });
    });
    // urlModel.find()
    // .then((data) => {
    //     if(!data) {
    //         throw ({status:false,message:"No data found"})
    //     }
    //     return res.status(200).json({status:true,data:data})
    // })
    // .catch((err) => {
    //     console.error(err);
    //     return res.status(500).json({ status: false, errors: "An error occurred while getting the short URL count" });
    // });
}

