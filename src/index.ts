import {
  Observable,
  from,
  fromEvent,
  interval,
  of,
  subscribeOn,
  timer,
} from "rxjs";
import { ajax } from "rxjs/ajax";

// const someObservable$ = new Observable<string>((subscriber) => {
//   subscriber.next("Alice");
//   subscriber.next("Ben");
//   subscriber.next("Charlie");
//   subscriber.complete();
// });

// someObservable$.subscribe((value) => console.log(value));

/////-----/////

// const observable$ = new Observable<string>((subscriber) => {
//   console.log("observable ejecutado");

//   subscriber.next("Alice");
//   setTimeout(() => subscriber.next("Ben"), 2000);
//   setTimeout(() => subscriber.next("Charlie"), 4000);
// });

// //metodo1//si solo se usa el next method se puede....
// const observer = {
//   next: (value: string) => console.log("metodo1: " + value),
// };

// observable$.subscribe(observer);

// //metodo2//... simplificar el código
// const subscription = observable$.subscribe((value: string) =>
//   console.log("metodo2: " + value)
// );

// setTimeout(() => {
//   //unsubscribe
//   console.log("método2 --> Unsubscribe");
//   subscription.unsubscribe();
// }, 3000);

/////-----/////
//se pueden crear varias subscripciones bajo un mismo observable
// observable$.subscribe((value: string) =>
//   console.log("Subscription1: " + value)
// );

// setTimeout(() => {
//   observable$.subscribe((value: string) =>
//     console.log("Subscription2: " + value)
//   );
// }, 5000);

/////-----/////

// const observable$ = new Observable<string>((subscriber) => {
//   console.log("observable ejecutado");
//   subscriber.next("Alice");
//   setTimeout(() => subscriber.next("Pedro"), 2000);
//   //setTimeout(() => subscriber.complete(), 2000);
//   setTimeout(() => subscriber.error(new Error("error")), 4000);
//   return () => {
//     console.log("observable completado <Teardown>");
//   };
// });

// const observer = {
//   next: (value: string) => console.log(value),
//   //complete: () => console.log("Subscripcion completada"),
//   error: (error: Error) => console.log(error.message),
// };

// console.log("Antes del subscribe");
// observable$.subscribe(observer);
// console.log("Después del subscribe");

/////-----/////

// const observable$ = new Observable((subscriber) => {
//   let incrementNumber = 0;

//   const interval = setInterval(() => {
//     console.log("emmited: " + incrementNumber);
//     subscriber.next(incrementNumber++);
//   }, 1000);

//   setTimeout(() => subscriber.complete(), 5000);

//   return () => {
//     console.log("observable completado");
//     clearInterval(interval);
//   };
// });

// const observer = {
//   next: (value: number) => console.log(value),
//   complete: () => console.log("completado"),
// };

// observable$.subscribe(observer);

// setTimeout(() => {
//   console.log("han pasado 5 segundos");
// }, 5000);

/////-----/////
//COLD Observable

// const ajax$ = ajax<any>("https://random-data-api.com/api/v2/users");

// ajax$.subscribe((data) => {
//   console.log("Sub1: " + data.response.first_name);
// });
// ajax$.subscribe((data) => {
//   console.log("Sub2: " + data.response.first_name);
// });

// ajax$.subscribe((data) => {
//   console.log("Sub3: " + data.response.first_name);
// });

/////-----/////
//HOT Observable --> all Subscriptions will in fact have the same source of emissions

// const helloButton = document.querySelector("button#hello");

// const helloClick$ = new Observable<PointerEvent>((subscriber) => {
//   helloButton.addEventListener("click", (event: PointerEvent) => {
//     subscriber.next(event);
//   });
// });

// helloClick$.subscribe((event) =>
//   console.log("Sub1: " + event.type, event.x, event.y)
// );

// setTimeout(() => {
//   console.log("Sub2: EMPieza");

//   helloClick$.subscribe((event) =>
//     console.log("Sub2: " + event.type, event.x, event.y)
//   );
// }, 3000);

/////-----/////
//Creation Function
//of

// of("Alice", "Ben", "Charlie").subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("completado"),
// });

// //esta funcion es lo mismo que hacer "of"
// function ourOwnOf(...args: string[]): Observable<string> {
//   return new Observable<string>((subscriber) => {
//     for (let i = 0; i < args.length; i++) {
//       subscriber.next(args[i]);
//     }
//     subscriber.complete();
//   });
// }

/////-----/////
//Creation Function
//from

// from(["Alice", "Ben", "Charlie"]).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("Completado"),
// });

// const somePromise = new Promise((resolve, reject) => {
//   //resolve("Resolved");
//   reject("Rejected");
// });

// const observableFromPromise$ = from(somePromise);

// observableFromPromise$.subscribe({
//   next: (value) => console.log(value),
//   error: (error) => console.log("err: " + error),
//   complete: () => console.log("Comppletado"),
// });

/////-----/////
//Creation Function
//fromEvent --> Source: DOM EventTarget, Node.js EventEmitter, jQuery Event
//needs to unsubscribe

// const triggerButton = document.querySelector("button#trigger");

// const subscription = fromEvent(triggerButton, "click").subscribe({
//   next: (event) => console.log(event.timeStamp),
// });

// setTimeout(() => {
//   console.log("Unsubscribe");

//   subscription.unsubscribe();
// }, 5000);

// // //esta funcion es lo mismo que hacer "fromEvent"
// // const triggerClick$ = new Observable<Event>((subscriber) => {
// //   triggerButton.addEventListener("click", (event) => {
// //     subscriber.next(event);
// //   });
// //   return () => {
// //     triggerButton.removeEventListener("click", (event) => {
// //       subscriber.next(event);
// //     });
// //   };
// // });

// // const subscription = triggerClick$.subscribe({
// //   next: (event) => console.log(event.timeStamp),
// // });

/////-----/////
//Creation Function
//Timer

// console.log("started");

// const subscription = timer(2000).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("completado"),
// });

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 1000);

// //esta funcion es lo mismo que hacer "timer"
// // const timer$ = new Observable<number>((subscribe) => {
// //   const timeoutId = setTimeout(() => {
// //     subscribe.next(0);
// //     subscribe.complete();
// //   }, 2000);

// //   return () => clearTimeout(timeoutId);
// // });

// // const subscription = timer$.subscribe({
// //   next: (value) => console.log(value),
// //   complete: () => console.log("completado"),
// // });

// // setTimeout(() => {
// //   subscription.unsubscribe();
// //   console.log("unsubscribe");
// // }, 1000);

/////-----/////
//Creation Function
//interval

console.log("started");

const subscription = interval(500).subscribe({
  next: (value) => console.log(value),
  complete: () => console.log("completado"),
});

setTimeout(() => {
  console.log("unsubscribe");

  subscription.unsubscribe();
}, 5000);

/////-----/////
//Creation Function
//forkJoin --> Source: other Observables
