let fs = require('fs')
let express = require('express')
let app = express()

//cors跨域
let cors = require('cors')
let option = {
  origin:["http://localhost:8080"]
}

//引入模块
let multer = require('multer')
//初始化上传对象
let upload = multer({
  dest:"./upload"
})

app.use(cors(option))

//处理上传请求
//单个文件可以调用upload.single()方法，传入表单文件的name
app.post('/',upload.single('file'),(req,res) => {
  //利用fs模块重命名
  let oldP = `${req.file.destination}/${req.file.filename}`
  let newP = `${oldP}${req.file.originalname}`
  fs.rename(oldP,newP,(req,res) => {
    console.log('图片上传成功')
  })
  res.send({
    isupload:true
  })
})

app.listen(8081,() => {
  console.log("服务器启动成功");
})