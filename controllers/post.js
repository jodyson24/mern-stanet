const Posts = require('../models/posts')
const Comments = require('../models/comment')
const Users =  require('../models/user')

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const post = {
    createPost: async (req, res) => {
        try {
            const { content, images } = req.body;

            if(images.length === 0)
            return res.status(400).json({msg: "Please add your photo."})

            const newPost =  new Posts({
                content, images, user: req.user._id
            })

            await newPost.save()

            res.json({
                msg: 'created post',
                newPost: {
                    ...newPost._doc,
                    user: req.user
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({
                user: [...req.user.following, req.user._id]
            }), req.query).paginating()

            const posts =  await features.query.sort('-createdAt')
            .populate("user likes", "avatar username fullname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePost: async (req, res) => {
        try {
            const { content, images } = req.body;

            const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
                content, images
            }).populate("user likes", "avatar username fullname")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            res.json({
                msg: 'Updated post',
                newPost: {
                    ...post._doc,
                    content, images
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Posts.find({_id: req.params.id, likes: req.user._id})
            if(post.length > 0) return res.status(400).json({msg: "You already liked this post!"})

            const like  = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $push: {likes: req.user._id}
            }, {new: true})

            if(!like) return res.status(400).json({msg: "This post does not exist!"})

            res.json({msg: 'Liked Posts! '})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unLikePost: async (req, res) => {
        try {
            const unlike = await Posts.findOneAndUpdate({_id: req.params.id}, {
                $pull: {likes: req.user._id}
            }, {new: true})

            if(!unlike) return res.status(400).json({msg: "This post does not exist!"})

            res.json({msg: 'unliked Posts! '})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({user: req.params.id}), req.query)
            .paginating()

            const posts = await features.query.sort("-createdAt")

            const postLength = await Posts.find({user: req.params.id})

            res.json({
                posts,
                result: posts.length,
                totalPosts: postLength.length
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
            .populate("user likes", "avatar username fullname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            if(!post) return res.status(400).json({msg: "This post does not exist!"})

            res.json({post})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getPostsDiscover: async (req, res) => {
        try {
            // const features = new APIfeatures(Posts.find({
            //     user:{$nin: [...req.user.following, req.user._id]}
            // }), req.query).paginating()

            // const posts =  await features.query.sort('-createdAt')

            const newArr = [...req.user.following, req.user._id]

            const num = req.query.num || 9

            const posts = await Posts.aggregate([
                {$match: {user: {$nin: newArr}}},
                {$sample: {size: Number(num)}},
            ])

            return res.json({
                msg: 'Success!',
                result: posts.length,
                posts
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id})
            await Comments.deleteMany({_id: {$in: post.comments}})

            res.json({
                msg: "Post Deleted!",
                newPost: {
                    ...post,
                    user: req.user
                }
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    savePost:  async (req, res) => {
        try {
            const user = await Users.find({_id: req.user._id,saved: req.params.id})
            if(user.length > 0) return res.status(400).json({msg: "You saved this post already"})

            const save  = await Users.findOneAndUpdate({_id: req.user._id}, {
                $push: {saved: req.params.id}
            }, {new: true})

            if(!save) return res.status(400).json({msg: "This user does not exist!"})

            res.json({msg: 'Posts saved!'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    unSavePost:  async (req, res) => {
        try {
            const unsave  = await Users.findOneAndUpdate({_id: req.user._id}, {
                $pull: {saved: req.params.id}
            }, {new: true})

            if(!unsave) return res.status(400).json({msg: "This user does not exist!"})

            res.json({msg: 'Posts unsaved!'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getSavedPosts:  async (req, res) => {
        try {
            const features = new APIfeatures(Posts.find({
                _id: {$in : req.user.saved}
            }), req.query).paginating()

            const savedPosts = await features.query.sort("-createdAt")

            res.json({
                savedPosts,
                result: savedPosts.length
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = post 