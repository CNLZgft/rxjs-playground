import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  Subscriber,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  filter,
  forkJoin,
  from,
  fromEvent,
  interval,
  map,
  of,
  subscribeOn,
  tap,
  timer,
  withLatestFrom,
} from "rxjs";
import { AjaxResponse, ajax } from "rxjs/ajax";

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

// console.log("started");

// const subscription = interval(500).subscribe({
//   next: (value) => console.log(value),
//   complete: () => console.log("completado"),
// });

// setTimeout(() => {
//   console.log("unsubscribe");

//   subscription.unsubscribe();
// }, 5000);

/////-----/////
//Creation Function
//forkJoin --> Source: other Observables

// const randomName$ = ajax<any>(
//   "https://random-data-api.com/api/name/random_name"
// );

// const randomNation$ = ajax<any>(
//   "https://random-data-api.com/api/nation/random_nation"
// );

// const randomFood$ = ajax<any>(
//   "https://random-data-api.com/api/food/random_food"
// );

// randomName$.subscribe((ajaxResponse) =>
//   console.log("name: " + ajaxResponse.response.name)
// );
// randomNation$.subscribe((ajaxResponse) =>
//   console.log("capital: " + ajaxResponse.response.capital)
// );
// randomFood$.subscribe((ajaxResponse) =>
//   console.log("food: " + ajaxResponse.response.dish)
// );

// //con el forkJoin podemos obtener los valores de la subscripcion con el mismo orden

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameResponse, nationResponse, foodResponse]) =>
//     console.log(
//       `name: ${nameResponse.response.name} -- nation: ${nationResponse.response.capital} -- food: ${foodResponse.response.dish}`
//     )
// );

//error
// const a$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.next("A");
//     subscriber.complete();
//   }, 3000);

//   return () => {
//     console.log("A TearDown");
//   };
// });

// const b$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.error("ERROR!");
//   }, 5000);

//   return () => {
//     console.log("B TearDown");
//   };
// });

// forkJoin([a$, b$]).subscribe({
//   next: (value) => console.log(value),
//   error: (error) => console.log("error: ", error),
// });

/////-----/////
//Creation Function
//combineLatest --> same as forJoin but will emit a value anytime that an Observable emits something new

// const temperatureInput = document.getElementById("temperature-input");
// const conversionDropdown = document.getElementById("conversion-dropdown");
// const resultText = document.getElementById("result-text");

// const temperatureInputEvent$ = fromEvent<any>(temperatureInput, "input");
// const conversionInputEvent$ = fromEvent<any>(conversionDropdown, "input");

// combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
//   ([temperatureInputEvent, conversionInputEvent]) => {
//     const temperature = Number(temperatureInputEvent.target.value);
//     const conversion = conversionInputEvent.target.value;

//     let temperatureResult: number;
//     if (conversion === "f-to-c") {
//       temperatureResult = ((temperature - 32) * 5) / 9;
//     } else if (conversion === "c-to-f") {
//       temperatureResult = (temperature * 9) / 5 + 32;
//     }

//     resultText.innerText = temperatureResult.toString();

//     console.log(
//       temperatureInputEvent.target.value,
//       conversionInputEvent.target.value
//     );
//   }
// );

/////-----/////
//Piepeable Operator
//filter

// interface NewsItem {
//   category: "Business" | "Sports";
//   content: string;
// }

// const newsFeed$ = new Observable<NewsItem>((Subscriber) => {
//   setTimeout(() => {
//     Subscriber.next({ category: "Business", content: "A" });
//   }, 1000);
//   setTimeout(() => {
//     Subscriber.next({ category: "Sports", content: "B" });
//   }, 3000);
//   setTimeout(() => {
//     Subscriber.next({ category: "Business", content: "C" });
//   }, 5000);
//   setTimeout(() => {
//     Subscriber.next({ category: "Sports", content: "D" });
//   }, 6000);
//   setTimeout(() => {
//     Subscriber.next({ category: "Business", content: "E" });
//   }, 7000);
// });

// //pipe para poder usar los operadores + subscribe
// //filter para filtrar la respuesta
// const sportsNewsFeed$ = newsFeed$.pipe(
//   filter((item) => item.category === "Sports")
// );

// sportsNewsFeed$.subscribe((item) => console.log(item));

/////-----/////
//Piepeable Operator
//map

// const randomName$ = ajax<any>(
//   "https://random-data-api.com/api/name/random_name"
// ).pipe(map((ajaxResponse) => ajaxResponse.response.name));

// const randomNation$ = ajax<any>(
//   "https://random-data-api.com/api/nation/random_nation"
// ).pipe(map((ajaxResponse) => ajaxResponse.response.capital));

// const randomFood$ = ajax<any>(
//   "https://random-data-api.com/api/food/random_food"
// ).pipe(map((ajaxResponse) => ajaxResponse.response.dish));

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameResponse, nationResponse, foodResponse]) =>
//     console.log(
//       `name: ${nameResponse} -- nation: ${nationResponse} -- food: ${foodResponse}`
//     )
// );

/////-----/////
//Piepeable Operator
//tap --> para debuggar

// of(1, 3, 4, 56, 7, 2, 5)
//   .pipe(
//     filter((value) => value > 5),
//     tap({
//       next: (value) => console.log("spy: ", value),
//       complete: () => console.log("completado"),
//     }),
//     map((value) => value * 2)
//   )
//   .subscribe((value) => console.log(value));

/////-----/////
//Piepeable Operator
//debounceTime

// const sliderInput = document.querySelector("input#slider");

// fromEvent(sliderInput, "input")
//   .pipe(
//     debounceTime(1500),
//     map((event) => (event.target as HTMLInputElement).value)
//   )
//   .subscribe((value) => console.log(value));

/////-----/////
//Piepeable Operator
//catchError

// const failingHttpRequest$ = new Observable((subscriber) => {
//   setTimeout(() => {
//     subscriber.error(new Error("Timeout"));
//   }, 3000);
// });

// console.log("app started");

// failingHttpRequest$
//   //para devolver un mensaje diferente al por defecto de 'error'
//   //.pipe(catchError((error) => of("fallback value")))
//   //se puede usar 'EMPTY' si no se quiere devolver ningún mensaje de error
//   .pipe(catchError((error) => EMPTY))
//   .subscribe({
//     next: (value) => console.log(value),
//     complete: () => console.log("completed"),
//   });

/////-----/////
//Flattening Operator example1

// const source$ = new Observable((subscriber) => {
//   setTimeout(() => subscriber.next("A"), 2000);
//   setTimeout(() => subscriber.next("B"), 3500);
// });

// console.log("app started");
// source$
//   .pipe(concatMap((value) => of(1, 2)))
//   .subscribe((value) => console.log(value));

/////-----/////
//Flattening Operator example2

// const endpointInput: HTMLInputElement =
//   document.querySelector("input#endpoint");
// const fetchButton = document.querySelector("button#fetch");

// fromEvent(fetchButton, "click")
//   .pipe(
//     map((event) => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     )
//   )
//   .subscribe((value) => console.log(value));

/////-----/////
//Flattening Operator error handling 1

// const endpointInput: HTMLInputElement =
//   document.querySelector("input#endpoint");
// const fetchButton = document.querySelector("button#fetch");

// //se trata el error y se emite un complete para que la subscripción
// //principal se acabe
// fromEvent(fetchButton, "click")
//   .pipe(
//     map((event) => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//     ),
//     catchError(() => EMPTY)
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log("error: " + error),
//     complete: () => console.log("completed"),
//   });

/////-----/////
//Flattening Operator error handling 2

// const endpointInput: HTMLInputElement =
//   document.querySelector("input#endpoint");
// const fetchButton = document.querySelector("button#fetch");

// fromEvent(fetchButton, "click")
//   .pipe(
//     map((event) => endpointInput.value),
//     concatMap((value) =>
//       ajax(`https://random-data-api.com/api/${value}/random_${value}`).pipe(
//         catchError((error) => of(`error: ${error}`))
//       )
//     )
//   )
//   .subscribe({
//     next: (value) => console.log(value),
//     error: (error) => console.log("error: " + error),
//     complete: () => console.log("completed"),
//   });

/////-----/////
//Flattening Operator
//concatMap --> espera a que la petición anterior se acabe antes de tratar la siguiente
//switchMap --> cancela la petición anterior y trata la siguiente directamente
//para guardar datos en el servidor, mejor concatMap
//para recibir datos del servidor, mejor switchMap
//mergeMap --> trata las peticiones en orden pero emite el output tan pronto como
//se reciban los datos, por lo que las respuestas pueden aparecer desordenadas si
//una petición es más larga que otra

/////-----/////
//Subjects --> Es un observable y a la vez un observer (permite múltiples subscripciones)
//Subject
//las subscripciones sólo recibirán los valores que se emitan a partir
//del inicio de la subscripción

// const emitButton = document.querySelector("button#emit");
// const inputElement: HTMLInputElement = document.querySelector("#value-input");
// const subscribeButton = document.querySelector("button#subscribe");

// const value$ = new Subject<string>();

// //ejemplo sencillo
// // value$.subscribe((value) => console.log("a :" + value));
// // value$.subscribe((value) => console.log("b :" + value));
// // value$.subscribe((value) => console.log("c :" + value));

// // value$.next("1");
// // value$.next("2");
// // value$.next("3");

// //ejemplo avanzado
// //esto
// // fromEvent(emitButton, "click")
// //   .pipe(map(() => inputElement.value))
// //   .subscribe(value$);

// //igual a esto
// fromEvent(emitButton, "click").subscribe(() => value$.next(inputElement.value));

// fromEvent(subscribeButton, "click").subscribe(() => {
//   console.log("new subscription");
//   value$.subscribe((value) => console.log(value));
// });

/////-----/////
//BehaviorSubject
//las subscripciones reciben el último valor emitido del observable al subscribirse
//y los valores emitidos posteriormente

const loggedInSpan: HTMLElement = document.querySelector("span#logged-in");
const loginButton: HTMLElement = document.querySelector("button#login");
const logoutButton: HTMLElement = document.querySelector("button#logout");
const printStateButton: HTMLElement =
  document.querySelector("button#print-state");

const isLoogedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, "click").subscribe(() => isLoogedIn$.next(true));
fromEvent(logoutButton, "click").subscribe(() => isLoogedIn$.next(false));

//Navigation bar
isLoogedIn$.subscribe(
  (isLoogedIn) => (loggedInSpan.innerText = isLoogedIn.toString())
);

//Buttons
isLoogedIn$.subscribe((isLoogedIn) => {
  logoutButton.style.display = isLoogedIn ? "block" : "none";
  loginButton.style.display = !isLoogedIn ? "block" : "none";
});

//PrintButton
//esto
// fromEvent(printStateButton, "click").subscribe(() =>
//   console.log(`User is logged????: ${isLoogedIn$.value}`)
// );

//igual a esto
fromEvent(printStateButton, "click")
  .pipe(withLatestFrom(isLoogedIn$))
  .subscribe(([event, isLoogedIn]) =>
    console.log(`User is logged????: ${isLoogedIn}`)
  );
