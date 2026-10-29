const { ImageKit }=require("@imagekit/nodejs")

const client= new ImageKit({
    privateKey:""
})

async function uploadFile(buffer) {
    const uploadFile= await client.files.upload({
        file:buffer.toString("base64"),
        fileName:"post.jpg"
    })

    return uploadFile
    
}

module.exports=uploadFile
