class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}


class ValidationError extends AppError {
    constructor(message = 'bad request') {
        super(message,400); 
    }
}


class UnauthorizedError extends AppError {
    constructor(message = 'access is denied') {
        super(message,401); 
    }
}

class NotFoundError extends AppError {
    constructor(message = 'notfound') {
        super(message , 404)

    }
}


module.exports = {
    ValidationError, 
    UnauthorizedError, 
    NotFoundError
}