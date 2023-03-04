import { type Handler } from 'aws-lambda';

export type SyncHandler<T extends Handler> = (
	event: Parameters<T>[0],
	context: Parameters<T>[1],
	callback: Parameters<T>[2],
) => void;

export type AsyncHandler<T extends Handler> = (
	event: Parameters<T>[0],
	context: Parameters<T>[1],
) => Promise<Parameters<Parameters<T>[2]>[1] extends void ? void : NonNullable<Parameters<Parameters<T>[2]>[1]>>;
