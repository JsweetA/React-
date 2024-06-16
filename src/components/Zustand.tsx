import { create } from "zustand";
import { Random } from "./Random";

const useA = create((set) => ({
  A: 0,
  setA: () => set((state: { A: number }) => ({ A: state.A + 1 })),
}));
const ComponentA = () => {
  const A = useA((state: any) => state.A) as any;
  return (
    <>
      <div>
        val: {A} <Random />
      </div>
    </>
  );
};
const ComponentB = () => {
  const setA = useA((state: any) => state.setA) as any;
  return (
    <>
      <div>
        <span className='p-2' onClick={() => setA(1)}>
          set
        </span>
        <Random />
      </div>
    </>
  );
};

export function Zustand() {
  return (
    <>
      <div className='bg-[#0f0] p-[12px]'>
        <div>
          <ComponentA />
        </div>

        <div>
          <ComponentB />
        </div>
      </div>
    </>
  );
}
