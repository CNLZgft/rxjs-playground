import { Observable } from "rxjs";

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

const observable$ = new Observable((subscriber) => {
  let incrementNumber = 0;

  const interval = setInterval(() => {
    console.log("emmited: " + incrementNumber);
    subscriber.next(incrementNumber++);
  }, 1000);

  setTimeout(() => subscriber.complete(), 5000);

  return () => {
    console.log("observable completado");
    clearInterval(interval);
  };
});

const observer = {
  next: (value: number) => console.log(value),
  complete: () => console.log("completado"),
};

observable$.subscribe(observer);

setTimeout(() => {
  console.log("han pasado 5 segundos");
}, 5000);

/////-----//////

