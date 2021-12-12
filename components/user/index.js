const router = require('express').Router();
const user_service = require('./user');
const multer  = require('multer') //use multer to upload blob data
const upload = multer(); // set multer to be the upload variable
const fs = require('fs'); 

router.get('/all',async(req,res,next)=>{
    try{
        const users = await user_service.read_users();
        res.send(users);
    }catch(err){
        next(err);
    }
})

router.post('/audio',upload.single('soundBlob'),async(req,res,next)=>{
    try{
        if(req.file){
            let uploadLocation = __dirname+'/../../public/' + req.file.originalname 
            fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
            res.send({"msg":"Uploaded successfully"});
        }
        else{
            res.send({"msg":"Please provide file"})
        }
        
    }catch(err){
        next(err);
    }
})


module.exports = router;