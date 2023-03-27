export class ExpressError extends Error{
    constructor(message,status) {
        super();
        this.status = status||500
        this.message=message

    }
}
export class BadRequestError extends ExpressError{
    constructor(message='Bad Request') {
        super(message,400);

    }
}
export class ForbiddenError extends ExpressError{
    constructor(message='Forbidden') {
        super(message,401);

    }
}
export class UnauthorizedError extends ForbiddenError{
    constructor(message='Access Not Authorized') {
        super(message);

    }
}
export class NotFoundError extends ExpressError{
    constructor(message='Not Found') {
        super(message,404);

    }
}
export {NotFoundError as FourOhFourError}
export class ServerError extends ExpressError{
    constructor(message='Bad Request') {
        super(message,500);

    }
}