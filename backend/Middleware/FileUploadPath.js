const multer = require("multer");
// FILE UPLOAD PATH

// FYP Registration Multer
const FYPRegistrationStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./FYP_Proposal_Files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
exports.FYPRegistrationUpload = multer({ storage: FYPRegistrationStorage });


// FYP - 1  Multer
const FYP1storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./FYP_1_Files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
exports.FYP1upload = multer({ storage: FYP1storage });


// FYP - 2 Multer 
const FYP2storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./FYP_2_Files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
exports.FYP2upload = multer({storage: FYP2storage });


// FYP - 3 Multer
const FYPstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./FYP_3_Files");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
exports.FYP3upload = multer({ storage: FYPstorage });