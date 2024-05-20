const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const FYP3Model = require("../Model/FYP3Schema");

exports.FYP3Data = asyncErr(async (req, res, next) => {
    // FILLING ALL THE FIELDS
    if (!req.file) {
      return next(new ErrorHandler("Please fill file feilds", 400));
    }

    fileUrl = req.file.path;
    // FIND BY PROJECTTITLE
    const fyp3 = await FYP3Model.findOne({ fileUrl });

    if (fyp3 === null) {
      await FYP3Model.create({
        fileUrl: fileUrl,
      });
      res.status(201).json({
        sucess: true,
        message: "Document has been Uploaded"
      });
    }else{
        res.status(406).json({
            message: "Document has been Already Uploaded"
        });
      }
});
