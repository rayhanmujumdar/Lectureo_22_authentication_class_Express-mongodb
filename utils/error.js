const error = (status = 400,message) => {
    const err = new Error(message)
    err.status = status
    return err
}

module.exports = error