import { useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./counterSlice";
import styles from "./Counter.module.css";
import { Button, Input } from "@chakra-ui/react";
import { usePostsQuery } from "./counterAPI";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [skip, setSkip] = useState(true);
  const incrementValue = Number(incrementAmount) || 0;

  const { data, isFetching, isError } = usePostsQuery({
    skip,
  });

  return (
    <div>
      <div className={styles.row}>
        <Button
          colorScheme="teal"
          variant="outline"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </Button>
        <span className={styles.value}>{count}</span>
        <Button
          colorScheme="teal"
          variant="outline"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </Button>
      </div>
      <div className={styles.row}>
        <Input
          aria-label="Set increment amount"
          value={incrementAmount}
          size="lg"
          width="64px"
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <Button
          colorScheme="blue"
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </Button>
        <Button colorScheme="cyan" onClick={() => setSkip(!skip)}>
          Add Async
        </Button>
        <Button
          colorScheme="facebook"
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </Button>
      </div>
    </div>
  );
}
