const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const FYP1Model = require("../Model/FYP1Schema");
const error = require("../Middleware/error");

exports.FYP1Data = asyncErr(async (req, res, next) => {

    // FILLING ALL THE FIELDS
    if (!req.file) {
      return next(new ErrorHandler("Please upload the file", 400));
    }

    fileUrl = req.file.path;
    // FIND BY file Path
    const fyp1 = await FYP1Model.findOne({ fileUrl });

    if (fyp1 === null) {
      await FYP1Model.create({
        fileUrl: fileUrl
      });
      res.status(201).json({
        success: true,
        message: "Document has been Uploaded"
      });
    }else{
        res.status(406).json({
            message: "Document has been Already Uploaded",
      });
    }
 
});

