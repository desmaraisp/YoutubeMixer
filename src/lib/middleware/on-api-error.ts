import { ApiErrorModel } from "@/models/api-models/api-error-response";
import { ErrorWithHTTPCode } from "@/models/exceptions/custom-exceptions";
import { NextApiRequest, NextApiResponse } from "next";

export function onApiError(err: unknown, _req: NextApiRequest, res: NextApiResponse) {
	if (err instanceof ErrorWithHTTPCode) {
		res.status(err.code).json({ message: err.message } as ApiErrorModel);
		return
	}
	else if (err instanceof Error){
		res.status(500).json({ message: err.message } as ApiErrorModel);
		return
	}

	console.log(err)
	res.status(500).json({ message: "Unknown error" } as ApiErrorModel);
}
