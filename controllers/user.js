const userService = require('../service/user');
const error = require('../utils/error');
const authService = require('../service/auth')
exports.getUsers = async (_req, res, next) => {
    /**
     * TODO: filter,sort,pagination,select
     */
    try{
        const user = await userService.findUsers()
        if(!user){
            throw error(400,"users not found")
        }
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
};

exports.getUserById = async (req, res, next) => {
    const {userId} = req.params
    try{
        const user = await userService.findUserByProperty('_id',userId)
        if(!user){
            throw error(400,"User Not Found")
        }
        res.status(200).json(user)
    }catch(err){
        next(err)
    }
};

exports.createUser = async (req,res,next) => {
    const {name,email,password,roles,accountStatus} = req.body
    try{
        const user = await authService.registerService({name,email,password,roles,accountStatus})
        if(!user){
            throw error(404,"User Not created")
        }
        res.status(201).json(user)
    }catch(err){
        next(err)
    }
}

exports.PutUserById = async (req,res,next) => {
    const {name,email,roles,accountStatus} = req.body
    const {userId} = req.params
    try{
        const user = await userService.updateUserById(userId,{name,email,roles,accountStatus})
        if(!user){
            throw error(404,"User Not Found")
        }
        res.status(203).json(user)
    }catch(err){
        next(err)
    }
}

exports.updateUserById = async (req,res,next) => {
    const {name,roles,accountStatus} = req.body
    const {userId} = req.params
    try{
        const user = await userService.findUserByProperty("_id",userId)
        if(!user){
            throw error(404,"User Not Found")
        }
        user.name = name ?? user.name
        user.roles = roles ?? user.roles
        user.accountStatus = accountStatus ?? user.accountStatus
        await user.save()
        return res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

exports.deleteUserById = async (req,res,next) => {
    // find user by id
    // if user not found
    // return an error msg (user not found) → status code is = 400
    // else
    // Delete user in DB
    // delete all associated data
    // status code = 203
    const {userId} = req.params
    try{
        const user = await userService.findUserByProperty("_id",userId)
        if(!user){
            throw error(404,"User Not find")
        }
        // console.log(await user.save())
        await user.remove()
        res.status(203).json()
    }catch(err){
        next(err)
    }
}