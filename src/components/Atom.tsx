import { atom, useAtom } from "jotai";
import { createGetterAtom, createSharedComposable } from "../utils/createSharedComposable";
import { Random } from "./Random";
import { memo, useEffect, useReducer, useState } from "react";
import type { Atom } from "jotai";
import { get, merge } from "lodash-es";

// Todo
// 1. 测试 getter 的 selector 是否会导致 rerender
// 2. 测试引用类型的 Atom 状态 done
const useAtomA = createSharedComposable((initialValue = 0) => {
  const atomA = atom(initialValue);
  const getAtomA = atom((get) => get(atomA));
  const setAtomA = atom(null, (get, set, update: number) => {
    set(atomA, get(atomA) + update);
  });

  return {
    getAtomA,
    setAtomA,
  };
});
type TPagenation = {
  page: number;
  pageSize: number;
  total: number;
  test: {
    a: number;
    b: number;
  };
  arr: number[];
  arrObj: {
    a: number;
  }[];
};

const usePagenation = createSharedComposable(
  (
    pagenation: TPagenation = { page: 1, pageSize: 10, total: 0, test: { a: 1, b: 2 }, arr: [1, 2, 3, 4], arrObj: [] }
  ) => {
    const pagenationAtom = atom(pagenation);
    const page = atom(
      (get) => get(pagenationAtom).page,
      (get, set, update: number) => set(pagenationAtom, { ...get(pagenationAtom), page: update })
    );

    // common
    const pagenationAllAtom = createGetterAtom(pagenation, pagenationAtom);

    // Object
    const test = createGetterAtom(pagenation.test, pagenationAllAtom.test);

    // Array
    const arr = createGetterAtom(Object.keys(pagenation.arr), pagenationAllAtom.arr);

    const setReducer = atom(null, (get, set, action: { type: keyof TPagenation; value: unknown | Function }) => {
      const value =
        typeof action.value !== "function" ? { [action.type]: action.value } : action.value(get(pagenationAtom));
      set(pagenationAtom, merge({}, get(pagenationAtom), value));
    });
    return {
      ...pagenationAllAtom,
      ...test,
      page,
      arr,
      setReducer,
    };
  }
);

const ComponentA = () => {
  const { getAtomA } = useAtomA();
  const [A] = useAtom(getAtomA);

  return (
    <>
      <div>
        val: {A} <Random />
        {/* <ComponentC setA={setA} /> */}
      </div>
    </>
  );
};
const ComponentB = () => {
  const { setAtomA } = useAtomA();
  const [_, setA] = useAtom(setAtomA);

  return (
    <>
      <div>
        <button className='p-2' onClick={() => setA(1)}>
          set
        </button>
        <Random />
      </div>
    </>
  );
};

const ComponentC = memo(({ setA }: any) => {
  return (
    <>
      <Random />
    </>
  );
});
const CompnentD = () => {
  const { getAtomA } = useAtomA({ a: 1 });
  const [A] = useAtom(getAtomA);
  const [state, setState] = useState({ a: 1 });
  const set = (val: number) => {
    setState(Object.assign(state, { a: val }));
  };

  useEffect(() => {
    console.log(A);
  }, [A]);
  return (
    <>
      <button onClick={() => set(1)}>123</button>
      <Random />
    </>
  );
};

const ComponentE = () => {
  //   const { getPagenation } = usePagenation();
  //   const [pagenation] = useAtom(getPagenation);

  return (
    <>
      {/* <Random /> */}
      {/* <div>page: {pagenation.page}</div>
      <div>pageSize: {pagenation.pageSize}</div>
      <div>total: {pagenation.total}</div> */}
      <Page />
      <PageSize />
      <Total />
    </>
  );
};
const Page = () => {
  const { page } = usePagenation();
  const [pageValue] = useAtom(page);

  return (
    <>
      <div>
        <Random />
        <span className='ml-8'>page: {pageValue}</span>
      </div>
    </>
  );
};
const PageSize = () => {
  const { pageSize } = usePagenation();
  const [pageSizeValue] = useAtom(pageSize);
  return (
    <>
      <div>
        <Random />
        <span className='ml-8'>pageSize: {pageSizeValue}</span>
      </div>
    </>
  );
};
const Total = () => {
  const { total } = usePagenation();
  const [totalValue] = useAtom(total);
  return (
    <>
      <div>
        <Random />
        <span className='ml-8'>total: {totalValue}</span>
      </div>
    </>
  );
};

const TestA = () => {
  const { setReducer, arr } = usePagenation();

  const [A] = useAtom(arr[0]);
  const [, set] = useAtom(setReducer);
  return (
    <>
      <div>
        <Random />
        <span className='ml-8'>test.a: {A}</span>
        <button
          onClick={() =>
            set({
              type: "arr",
              value: [, Date.now()],
            })
          }
        >
          {" "}
          setB
        </button>
      </div>
    </>
  );
};

const TestB = () => {
  const { arr, setReducer } = usePagenation();
  //   const { b } = createGetterAtomAtomByKeys(["b"], test);
  const [B] = useAtom(arr[1]);
  const [, set] = useAtom(setReducer);
  return (
    <>
      <div>
        <Random />
        <span className='ml-8'>test.b: {B}</span>
        <button
          onClick={() =>
            set({
              type: "arr",
              value: [Date.now()],
            })
          }
        >
          setA
        </button>
      </div>
    </>
  );
};
const ComponentF = () => {
  const { setReducer } = usePagenation();
  const [_, set] = useAtom(setReducer);

  return (
    <>
      <div>
        <button className='p-2' onClick={() => set({ type: "page", value: Date.now() })}>
          setPage
        </button>
        <button className='p-2' onClick={() => set({ type: "pageSize", value: Date.now() })}>
          setPageSize
        </button>
        <button className='p-2' onClick={() => set({ type: "total", value: Date.now() })}>
          setTotal
        </button>
        <Random />
      </div>
    </>
  );
};
function Atom() {
  const [_, rerender] = useReducer(
    (_pre: any) => {
      return [1];
    },
    undefined,
    () => [1]
  );
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
      <div className='bg-[#0f0] p-[12px]'>
        <div>
          <ComponentE />
        </div>

        <div>
          <ComponentF />
        </div>

        <TestA></TestA>
        <TestB></TestB>
      </div>
      <button onClick={rerender}> rerender </button>
    </>
  );
}

export default Atom;
