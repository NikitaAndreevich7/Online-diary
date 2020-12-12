const multer = require('multer')


const storage = multer.diskStorage({

  destination(req, file, cd){
    cd(null,'public/assets/uploads')
  },
  filename(req, file, cd){
    cd(null, Date.now() + '-' + file.originalname)
  }
  
})

const allowedTypes = ['image/png','image/jpg','image/jpeg']

const fileFilter = (req,file,cd) =>{
  if(allowedTypes.includes(file.mimetype)){
    cd(null,true)
  }else{
    cd(null,false)
  }
}

module.exports = multer({
  storage,
  fileFilter
})