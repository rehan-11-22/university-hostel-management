
// This is API Error file use for api error shown

class ApiError extends Error {
    constructor(
        statusCode,
        message = "Somthing went wrong",
        errors = [],
        statck = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success=false
        this.errors = errors

        if(statck){
            this.stack = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


module.exports = ApiError