import {
	AsyncHandler,
	SyncHandler,
	Handler,
	Context,
	Callback
} from ".."
import {expectType} from "tsd"

type Event  = "Event"
type Result = "Result"

let SH!: SyncHandler<Handler<Event, Result>>;
let AH!: AsyncHandler<Handler<Event, Result>>;

expectType<(event: Event, context: Context, callback: Callback<Result>) => void>(SH);
expectType<(event: Event, context: Context) => Promise<Result>>(AH)
