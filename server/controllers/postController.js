import db from './../models';
const postController = {};

postController.post = (req,res) => {
    const{
        title,
        text,
        link,
        userId
    } = req.body;

    //create a new instance of post
    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId
    });
    post.save().then((newPost)=>{
        return res.status(200).json({
            success:true,
            data: newPost
        });
    }).catch((err)=>{
        return res.status(500).json({
            message: err
        });
    });
};
postController.getAll = (req,res)=>{
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id'
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator -_id',
        match: {'isDeleted':false}
    }).then((posts)=>{
        return res.status(200).json({
            success:true,
            data: posts
        });
    }).catch((err)=>{
        return res.status(500).json({
            message: err
        });
    });
};
export default postController;