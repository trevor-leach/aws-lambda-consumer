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
let SHV!: SyncHandler<Handler<Event, void>>;
let AH!: AsyncHandler<Handler<Event, Result>>;
let AHV!: AsyncHandler<Handler<Event, void>>;

expectType<(event: Event, context: Context, callback: Callback<Result>) => void>(SH);
expectType<(event: Event, context: Context, callback: Callback<void>) => void>(SHV);
expectType<(event: Event, context: Context) => Promise<Result>>(AH);
expectType<(event: Event, context: Context) => Promise<void>>(AHV);
