import * as aws_lambda from 'aws-lambda'
export * from 'aws-lambda'

export type SyncHandler<T extends aws_lambda.Handler> = (
	event: Parameters<T>[0],
	context: Parameters<T>[1],
	callback: Parameters<T>[2],
) => void;

export type AsyncHandler<T extends aws_lambda.Handler> = (
	event: Parameters<T>[0],
	context: Parameters<T>[1],
) => Promise<NonNullable<Parameters<Parameters<T>[2]>[1]>>;
