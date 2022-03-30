Import { Interval } from 'rxjs';

ngOnInit() {
		interval(1000).subscribe( count => {
			console.log(count);
		});
} // interval ist das OBSERVABLE und SUBSCRIBE öffnet eine Funktion
  // die Funktion ist eine counter, welcher in der Konsole jede Sekunde(1000ms)
  // den Zähler um eins erhöht. 
  // ACHTUNG: Hier ist kein Stop des Zählers, OBSERVABLE müssen auch mit Code gestoppt werden
  
  // Um dies zu stoppen, ändern wir Code wie folgt:
  

Import { Component, OnDestroy, OnInit } from '@angular/core';
Import { Interval, Subscribtion } from 'rxjs';

.
.
.

export class ... implements OnInit, OnDestroy {
	private firstObsSubscription: Subscribtion;
	
	constructor(){}
	
	ngOnInit(){
	this.firstObsSubscription = interval(1000).subscribe( count => {
			console.log(count);
		});
		
	ngOnDestroy(): void {
	this.firstObsSubscription.unsubscribe();
	}
	// ngOnDestroy löscht die folgenden Funktion NACH verlassen des Komponents!

}


//CUSTOM WRITTEN OBSERVER WITH SAME EXAMPLE

private firstObsSubscription: Subscribtion;

ngOnInit() {
	const customIntervalObservable = Observable.create(observer => {
		let count = 0;
		setInterval( () => {
			observer.next(count); //next für das kommende, error zum arbeiten mit errors und complete zum abschließen
			count++;
		}, 1000);
	});
	
	this.firstObsSubscription = customIntervalObservable.subscribe(data => {
		console.log(data);
	});
}


// ERROR HANDLING WITH SAME EXAMPLE

private firstObsSubscription: Subscribtion;

ngOnInit() {
	const customIntervalObservable = Observable.create(observer => {
		let count = 0;
		setInterval( () => {
		if (count > 3) {
			observer.error(new Error(msg: 'Count ist greater 3! I stop.'));
		}
			observer.next(count);
			count++;
		}, 1000);
	});
	
	this.firstObsSubscription = customIntervalObservable.subscribe(data => {
		console.log(data);
	}, error => {
		console.log(error);
		alert(error.message);
	});
}


// COMPLETE HANDLING WITH SAME EXAMPLE

private firstObsSubscription: Subscribtion;

ngOnInit() {
	const customIntervalObservable = Observable.create(observer => {
		let count = 0;
		setInterval( () => {
		if(count === 2) {
			observer.complete();
		}
		if (count > 3) {
			observer.error(new Error(msg: 'Count ist greater 3! I stop.'));
		}
			observer.next(count);
			count++;
		}, 1000);
	});
	
	this.firstObsSubscription = customIntervalObservable.subscribe(data => {
		console.log(data);
	}, error => {
		console.log(error);
		alert(error.message);
	}, () => { // HERE IS THE COMPLETE HANDLING (immer ohne input)
		console.log('completed!');
	});
}
