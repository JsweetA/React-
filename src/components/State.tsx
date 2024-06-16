import { memo, useCallback, useState } from "react";
import { Random } from "./Random";

const ComponentA = ({ state }: { state: number }) => {
  return (
    <>
      val: {state}
      <Random />
    </>
  );
};

const ComponentB = memo(({ set }: { set: () => void }) => {
  return (
    <>
      <div>
        <span className='p-2' onClick={set}>
          set
        </span>
        <Random />
      </div>
    </>
  );
});

export const State = () => {
  const [count, setCount] = useState(0);
  const set = useCallback(() => {
    setCount((state) => state + 1);
  }, []);
  return (
    <div className='bg-[#0f0] p-[12px]'>
      <div>
        <ComponentA state={count} />
      </div>

      <div>
        <ComponentB set={set} />
      </div>
    </div>
  );
};
