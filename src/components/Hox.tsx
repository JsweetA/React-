import { useState } from "react";
import { createStore } from "hox";
import { Random } from "./Random";

const [useTaskStore, TaskStoreProvider] = createStore(() => {
  const [state, setState] = useState(0);
  const add = (update: number = 1) => {
    setState((state: number) => state + update);
  };

  return {
    state,
    add,
  };
});
const ComponentStateA = () => {
  const { state } = useTaskStore((store) => [store.state]);
  return (
    <>
      <div>
        val: {state} <Random />
      </div>
    </>
  );
};
const ComponentStateB = () => {
  const { add } = useTaskStore(() => []);

  return (
    <>
      <div>
        <span className='p-2' onClick={() => add(1)}>
          set
        </span>
        <Random />
      </div>
    </>
  );
};
function Hox() {
  return (
    <>
      <div className='bg-[#0ff] rounded-md p-[12px]'>
        <TaskStoreProvider>
          <ComponentStateA />
          <ComponentStateB />
        </TaskStoreProvider>
      </div>
    </>
  );
}

export default Hox;
