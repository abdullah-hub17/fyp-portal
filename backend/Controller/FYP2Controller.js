const asyncErr = require("../Middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const FYP2Model = require("../Model/FYP2Schema");

exports.FYP2Data = asyncErr(async (req, res, next) => {
    // FILLING ALL THE FIELDS
    if (!req.file) {
      return next(new ErrorHandler("Please fill file feilds", 400));
    }

    fileUrl = req.file.path;
    // FIND BY file Path
    const fyp2 = await FYP2Model.findOne({ fileUrl });

    if (fyp2 === null) {
      await FYP2Model.create({
        fileUrl : fileUrl,
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
