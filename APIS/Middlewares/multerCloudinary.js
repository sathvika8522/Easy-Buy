//import cloudinary modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name: 'shankari',
    api_key: '228274846292859',
    api_secret: 'EPFzwGZsDH-ygHQyt1yZb7VDQoY'
})


//configure multjer-storage-cloudinary
const clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "userImages",
            public_id: file.fieldname + '-' + Date.now()
        }
    }
})


//configure multer
const multerObj = multer({ storage: clStorage })

module.exports=multerObj;