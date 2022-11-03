const userService = require('../service/user');
const error = require('../utils/error');
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

exports.createUser = (req,res,next) => {}

exports.updateUserById = (req,res,next) => {}

exports.deleteUserById = (req,res,next) => {}