class ExpressError extends Error{
    constructor(msg,status=500,) {
        super();
        this.status = status
        this.msg=msg
        if (process.env.NODE_ENV!=='test'){
            super.printStackTrace()
        }
    }
}
class BadRequestError extends ExpressError{
    constructor(message='Bad Request') {
        super(message,400);

    }
}