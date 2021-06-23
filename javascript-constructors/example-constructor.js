function ExampleConstructor() {

}

console.log('value of ExampleConstructor:', ExampleConstructor.prototype);
console.log('typeof ExampleConstructor:', typeof ExampleConstructor.prototype);

var newExample1 = new ExampleConstructor();
console.log('value of newExample1:', newExample1);

var result = newExample1 instanceof ExampleConstructor;
console.log('value of result:', result);
