import {
	type AsyncHandler,
	type SyncHandler
} from "..";
import {
	type Handler,
	type Context,
	type Callback
} from 'aws-lambda';
import { expectType } from "tsd";

type Event  = "Event";
type Result = "Result";

let SH!: SyncHandler<Handler<Event, Result>>;
let AH!: AsyncHandler<Handler<Event, Result>>;

expectType<(event: Event, context: Context, callback: Callback<Result>) => void>(SH);
expectType<(event: Event, context: Context) => Promise<Result>>(AH);
