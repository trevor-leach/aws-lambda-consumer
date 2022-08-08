# aws-lambda-consumer

Utility types that convert the handler functions found in [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) into the asynchronous and synchronous signatures that are intended to be implemented.

## The Problem

The AWS services that use the handler functions we write expect us to either use a provided callback method and return nothing, or ignore the callback and return a Promise.  Therefore, [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) defines the Handler type as
```typescript
export type Handler<TEvent = any, TResult = any> = (
    event: TEvent,
    context: Context,
    callback: Callback<TResult>,
) => void | Promise<TResult>;
```

This is technically correct, but as users of the library, it doesn't represent the functions we are supposed to write:

* If we use the callback approach, we should never return a Promise, and
* If we write an async handler, then
    * The callback parameter shouldn't even exist and
	* The return type should only be a Promise, and not void | Promise

As an example, let's write a lambda handler function.  We will declare its type, so future maintainers will know what we intended, and so that the IDE can help us out:
```typescript
// main.ts
export const myHandler: Handler<MyEvent, MyResult> = async ...
```

Writing tests is now difficult.  We get the following types of errors:
```typescript
// main.test.ts
it.('should work', async (done) => {

	let actual: MyResult = await myHandler(myEvent, myContext);
	// 1. Expected 3 arguments, but got 2.
	// 2. Type 'MyResult | void' is not assignable to type 'MyResult'.
});
```

----

## The Solution

This module exports 2 utility types, `SyncHandler` and `AsyncHandler`, that transform the handlers from [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) into the types that are intended to be implemented. It also reexports everything from [@types/aws-lambda](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda) for convenience.

### Example
```typescript
import {AsyncHandler, SyncHandler, APIGatewayProxyHandler} from "aws-lambda-consumer"

// (event: APIGatewayProxyEvent, context: Context, callback: Callback<APIGatewayProxyResult>) => void
type SyncAPIGatewayProxyHandler  = SyncHandler<APIGatewayProxyHandler>

// (event: APIGatewayProxyEvent, context: Context) => Promise<APIGatewayProxyResult>
type AsyncAPIGatewayProxyHandler = AsyncHandler<APIGatewayProxyHandler>
```
