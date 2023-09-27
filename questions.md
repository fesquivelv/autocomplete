1. What is the difference between Component and PureComponent? Give
an example where it might break my app.


A PureComponent will do a shallow comparision to the previous state (it will compare primitive types) and only if this there is difference it will re render de component, a component will always render.

if you use only component you have the risk to do a lot of innecesary renders, it may cause a bad  performance of your app, in this case you can use a PureComponent to prevent innecesary rerenders.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?


3. Describe 3 ways to pass information from a component to its PARENT.

using callbacks: pass a callbact to a child component, the child can execute this callback and pass hinfo to their parent

using context: you can create a cotext, the child component use modify data in this context and the parent can read this data

using an state management library: using a library  like redux allow you have a general state of you app and like context the child can modify data and the parent can read it.


4. Give 2 ways to prevent components from re-rendering.

state in the correct component: prevent to  have state tha will render components that do not depend of this state, you can move this state to only the component that depends on this state

useMemo: if it is neccesary to have a state that render components that do not depend on this state, you can useMemo similar to PureComponent, to avoid re render this component when nothing has changed inside of it

useCallback: if you need to pass some callbacks to your children you can warp it with useCalback to avoid re create this callback and avoid re render the component 

5. What is a fragment and why do we need it? Give an example where it might
break my app.

Components must  return only one element to do this you can wrap your component with a div but this will increase your DOM tree, you can use a fragment to return only one element without adding extra elements to the DOM tree

6. Give 3 examples of the HOC pattern.

matbe if you want to show a modal and you do not want to write the modal component in each component you can create a HOC that has the logic to how the modal and the modl, so  you only need to wrap your components with this HOC.


7. What's the difference in handling exceptions in promises, callbacks
and async...await?

Promise: Pormise receive an callback and this callback receive to methods as a arguments, resolve and reject, you must call resolve when your flow is successful and reject to throw and exception

you can consume promises with callbacks, to ho this you can chain your promise (with dot notation)  using the then and catch methods, when the promise is resolve, then will be called, it recieve a callback with the value that was resolved, when the promise is rejected, catch will be called, it receive a callback with the value that was rejected

Another way to consume the promise is with async and await, you can wrap your code with try and catch, inside try con can wait until you promise is resolved with await, when the promise is rejected and exception will be thown and catch will be executed, async is to notify thtat your function will use await kwyword to wait primises.


8. How many arguments does setState take and why is it async.
I am more familiar with useSate, useState provides 2 elements, first one is the piece of state the second one is a method to update the state, this methd can recieve the value that will update the state or a callback, this callback receives the previous state if you want to work with that

I think setState can receive 2 arguments, the first one is the state you want to update and the second one is a callback that will be executed once the state is updated

9. List the steps needed to migrate a Class to Function Component.
Syntax: You need to write you component as a function, so you need to remove the class, extends words, use an arrow fuction or a normal function and the name of this function will be the name of your component.

remove all lifecicle methods and replace it with useEffec
replace  your state and use useState

remove the render method, and return the JSX you want to render

10. List a few ways styles can be used with components.

import te css file and use the class names

use css modules, import the module and use dot notation to access to classes

use a component style library like Bootstrap or Material UI

use tailwind


11. How to render an HTML string coming from the server.