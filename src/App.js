import './App.css';
import { events } from './utils/events';
import { getAge, getName } from './utils/getNameandAge';

function App() {

  const handleCurrying = () => {
    console.log(sum(1)(2)(3)());
  };

  const sum = (firstNumber) => {
    let accumulator = firstNumber;
    return function adder(nextNumber) {
      if (nextNumber === undefined) {
        return accumulator;
      }

      accumulator += nextNumber;
      return adder;
    }
  };

  const polyfillPromise = () => {
    const firsrPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolved First after 1 second");
      }, 1000);
    });

    const secondPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Resolved First after 2 seconds");
      }, 2000);
    });

    const thirdPromise = 'Resolved directly';

    try {
      let endPromise = Promise.all([firsrPromise, secondPromise, thirdPromise]);
      endPromise
        .then((res) => {
          console.log(res);
        })
    } catch (error) {
      console.log(error);
    }
  }

  const main = () => {
    try {
      getName()
        .then((name) => {
          console.log(`Hello ${name}!`);

          getAge(name)
            .then((age) => {
              const drink = age < 10 ? "milk" : "coke";
              console.log(`Have a ${drink}.`);
              const child = age < 10;
              return child;
            })
        })
    } catch (error) {
      console.log('Error')
    }

    return null;
  }

  const flatterArray = () => {
    const arr = [1, 2, [3, 4], [5, [6, 7, [8, [9]]]]];
    let flatArray = [];
    let main = arr, first;

    while (main.length > 0) {
      first = main[0];
      if (Array.isArray(first)) {
        Array.prototype.splice.apply(main, [0, 1].concat(first));
      } else {
        flatArray.push(first);
        main.splice(0, 1);
      }
    }

    console.log(flatArray);
    return flatArray;
  }

  const pubSub = () => {
    events.subscribe("event1", function (data) {
      console.log("subscriber1 subscribe to event1 -> " + data);
    });

    events.subscribe("event1", function (data) {
      console.log("subscriber2 subscribe to event1 -> " + data);
    });

    events.subscribe("event1", function (data) {
      console.log("subscriber3 subscribe to event1 -> " + data);
    });

    events.subscribe("event1", function (data) {
      console.log("subscriber4 subscribe to event1 -> " + data);
    });

    // publish some data to all subscribers whose were registered to event1
    events.publish("event1", "some data");
  }

  return (
    <div className="App">
      <button
        onClick={handleCurrying}
      >
        Curry Function sum(1)(2)(3)()
      </button>

      <button
        onClick={polyfillPromise}
      >
        Try Polyfill for Promise
      </button>

      <button
        onClick={main}
      >
        Main function call
      </button>
      <button
        onClick={flatterArray}
      >
        flatten Array
      </button>
      <button
        onClick={pubSub}
      >
        PubSub Implementation
      </button>
    </div>
  );
}

export default App;
