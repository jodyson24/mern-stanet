let users = []

const socketServer = (socket) => {
    // Connect - Disconnect
    socket.on('joinUser', id => {
        users.push({ id, socketId: socket.id })
        // console.log(users)
    })
    socket.on('disconnect', () => {
        users = users.filter(user => user.socketId !== socket.id)
    })


    // Likes
    socket.on('likePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        // console.log(clients)
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('likeToClient', newPost)
            })
        }
    })

    // Unlikes
    socket.on('unLikePost', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('unLikeToClient', newPost)
            })
        }
    })

    // Comments 
    socket.on('createComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createCommentToClient', newPost)
            })
        }
    })

    // Delete Comments
    socket.on('deleteComment', newPost => {
        const ids = [...newPost.user.followers, newPost.user._id]
        const clients = users.filter(user => ids.includes(user.id))
        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newPost)
            })
        }
    })

    // Follow 
    socket.on('follow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('followToClient', newUser)
    })

    // Unfollow
    socket.on('unFollow', newUser => {
        const user = users.find(user => user.id === newUser._id)
        user && socket.to(`${user.socketId}`).emit('unFollowToClient', newUser)
    })

    // // CreatePost
    // socket.on('createPost', newPost => {
    //     const ids = [...newPost.user.followers, newPost.user._id]
    //     const clients = users.filter(user =>user.id !== ids.includes(user.id))
    //     // console.log(clients)

    //     if (clients.length > 0) {
    //         clients.forEach(client => {
    //             socket.to(`${client.socketId}`).emit('createPostToClient', newPost)
    //         })
    //     }
    // })

    // // Delete Post
    // socket.on('deletePost', post => {
    //     const ids = [...newPost.user.followers, newPost.user._id]
    //     const clients = users.filter(user =>user.id !== ids.includes(user.id))
    //     // console.log(clients)

    //     if (clients.length > 0) {
    //         clients.forEach(client => {
    //             socket.to(`${client.socketId}`).emit('createPostToClient', post)
    //         })
    //     }
    // })

    //Notification
    socket.on('createNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
            })
        }
    })

    socket.on('removeNotify', msg => {
        const clients = users.filter(user => msg.recipients.includes(user.id))

        if (clients.length > 0) {
            clients.forEach(client => {
                socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
            })
        }
    })

}

module.exports = socketServer