import fs from "fs" // fs is a built-in Node.js module that provides an API for interacting with the file system, allowing you to read, write, and manipulate files and directories.
import path from "path" // path is a built-in Node.js module that provides utilities for working with file and directory paths, making it easier to handle file paths across different operating systems.
import multer from "multer" // multer is a Node.js/Express middleware used to handle file uploads, especially when a client sends files using multipart/form-data.
// Multer handles incoming file uploads from HTTP requests.


const uploadDir = path.resolve("./temp") // This line defines the directory where uploaded files will be temporarily stored. It uses the path.resolve method to create an absolute path to a folder named "temp" in the current working directory. This ensures that the upload directory is correctly resolved regardless of where the script is executed from.

// uploaddir  will store something like /Users/username/project/temp, depending on the current working directory of the Node.js process. This is important for ensuring that uploaded files are saved in a consistent and expected location.

if (!fs.existsSync(uploadDir)) { // existsSync checks if the specified directory (uploadDir) already exists. If it does not exist, the code inside the if block will execute.
    fs.mkdirSync(uploadDir, { recursive: true }) // mkdirSync creates the directory specified by uploadDir. The { recursive: true } option allows the creation of nested directories if they do not already exist. This ensures that the "temp" directory is created if it doesn't exist, preventing errors when trying to save uploaded files.
}

const storage = multer.diskStorage({ // diskStorage is a method provided by multer that allows you to customize how files are stored on disk. It takes an object with two properties: destination and filename, which define where and how the uploaded files will be saved.
    destination(req, file, cb) { // The destination function specifies the folder where the uploaded files will be stored. It takes three parameters: req (the request object), file (the file being uploaded), and cb (a callback function). cb is called with two arguments: an error (if any) and the destination path. In this case, it simply passes null for the error and the uploadDir for the destination, indicating that files should be saved in the "temp" directory.
        cb(null, uploadDir)
    }
    ,
    filename(req, file, cb) { // The filename function specifies the name of the file that will be saved on disk. It also takes three parameters: req, file, and cb. In this case, it generates a unique filename by concatenating the current timestamp (Date.now()) with the original name of the uploaded file (file.originalname). This helps prevent filename collisions when multiple files with the same name are uploaded. The cb function is called with null for the error and the generated filename.
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const fileFilter = (req, file, cb) => {
     if(file.mimetype=="application/pdf" ||
        file.mimetype.startsWith("image/")
      ){
          
        cb(null,true)

      }else{
        cb(new Error("Only PDF and Images are allowed."))
      }
}


export default  multer({
    storage, fileFilter, limits: {
        fileSize: 20 * 1024 * 1024
    }
})