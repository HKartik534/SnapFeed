const express = require("express")
const cors = require("cors")
const postModel = require("./src/api/post/postModel")
const multer = require("multer")
const uploadFile = require("./src/utils/helper")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

const upload = multer({ storage: multer.memoryStorage() })


app.post("/post/create", upload.single("image"), async (req, res) => {
    const uploadPost = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image: uploadPost.url,
        caption: req.body.caption
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
})

app.get("/post/all", async (req, res) => {
    const post = await postModel.find()
    res.status(200).json({
        message: "Post data fetched",
        post
    })
})

app.post("/post/delete", async (req, res) => {
        const id = req.body._id
        postModel.deleteOne({_id:id})
        .then((deletedata)=>{
            res.send({
                status:200,
                success:true,
                message:"Post deleted successfully",
                deletedata
            })
        })
        .catch((err)=>{
            res.send({
                status:500,
                success:false,
                message:"Something wrong with delete"
            })
        })
    })


module.exports = app