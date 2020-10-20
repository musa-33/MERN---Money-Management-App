module.exports = {
    serverError(res, error) {
        res.status(500).json({
            message: 'Server Error Occured',
            error
        })
    },

    resourceError(res, message){
        res.status(400).json({
            message
        })
    }
}