    import React from 'react';
    import type { RootState, AppDispatch } from '../store/index'; 
    import { useSelector, useDispatch } from 'react-redux';
    import { increment, decrement, incrementByAmount } from '../store/counterSlice';

    function Counter() {
      const count = useSelector((state: RootState) => state.counter.value);
        console.log('Counter value:', count);
      const dispatch = useDispatch<AppDispatch>();

      return (
        <div>
          <h2>Counter: {count}</h2>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
        </div>
      );
    }

    export default Counter;