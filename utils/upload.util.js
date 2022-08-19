const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null,path.join(__dirname, '..', 'imgs'));
    },
    filename: (req, file, cb) => {
        cb(null, "test.png");
        console.log(file);
    },
})

const upload = multer({ storage });

module.exports = { upload }