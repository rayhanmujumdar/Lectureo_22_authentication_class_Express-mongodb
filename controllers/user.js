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
    const userId = req.params.userId
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

exports.updateUserById = (req,res,next) => {}

exports.deleteUserById = (req,res,next) => {}