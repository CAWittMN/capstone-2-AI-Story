class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenError extends ExpressError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class UnprocessableEntityError extends ExpressError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422);
  }
}

class ElevenLabsAPIError extends ExpressError {
  constructor(
    message = "ElevenLabs API Error. Because of the cost of the API, and this being just a personal project, there is a character limit of 10,000 for the server that has most likely been used up. Please try again at a later time to see if my allowed character limit has been reset or create a new story with the audio feature turned off. Thank you for your understanding."
  ) {
    super(message, 500);
  }
}

module.exports = {
  ExpressError,
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  UnprocessableEntityError,
  ElevenLabsAPIError,
};
