    import grid from 'gridfs-stream';
    import mongoose from 'mongoose';

    const url=`http://localhost:8000`;

    let gfs,GridFSBucket;
    const conn=mongoose.connection;
    conn.once('open',()=>{

        GridFSBucket = new mongoose.mongo.GridFSBucket(conn.db,{
            bucketName: 'fs'
        });
        gfs = grid(conn.db, mongoose.mongo);
        gfs.collection('fs');
    })

    export const uploadImage = async(request,response)=>{
        if(!request.file){
            return response.status(404).json("File not found");
        }

        const imageUrl=`${url}/file/${request.file.filename}`;

        return response.status(200).json(imageUrl);
    }

    export const getImage=async(request,response)=>{
        try{
            const file=await gfs.files.findOne({filename:request.params.filename});

            const readStream = GridFSBucketBucket.openDownloadStream(file._id);
            readStream.pipe(response);
        }catch(error){
            return response.status(500).json(error.message);
        }
    }