export class ErrorWithHTTPCode extends Error {
	code: number
	public constructor(message: string, code: number) {
		super(message)
		this.code = code
	}
}

export class UnauthorizedException extends ErrorWithHTTPCode {
	public constructor() {
		super("You are not authorized to perform this action", 403)
	}
}

export class BadRequestException extends ErrorWithHTTPCode {
	public constructor(message: string) {
		super(message, 400)
	}
}
