import { atom, Atom } from "jotai";
import { useEffect } from "react";

type TAtom<T> = {
  [K in keyof T]: Atom<T[K]>;
};


export const createAtomByKeys = <T extends object>(keys: (number | string)[], atomObj: Atom<T>) => {
  return keys.reduce((pre, cur) => {
    pre[cur] = atom((get) => get(atomObj)[cur]);
    return pre;
  }, {} as TAtom<T>);
};
export const createAtomByObject = <T extends object>(obj: T, atomObj: Atom<T>) => {
  return Object.keys(obj).reduce((pre, cur) => {
    pre[cur as keyof T] = atom((get) => get(atomObj)[cur as keyof T]);
    return pre;
  }, {} as TAtom<T>);
};
export const createGetterAtom = <T extends object>(param: (number | string)[] | T, atomObj: Atom<T>): TAtom<T> => {
  if (Array.isArray(param)) {
    return createAtomByKeys(param as (number | string)[], atomObj);
  } else {
    return createAtomByObject(param, atomObj);
  }
};

export const createSharedComposable = <Fn extends (...args: any[]) => any>(composable: Fn) => {
  let subscribers = 0;
  let state: ReturnType<Fn> | null = null;

  const dispose = () => {
    useEffect(() => {
      return () => {
        subscribers -= 1;
        if (subscribers <= 0) {
          subscribers = 0;
          state = null;
        }
      };
    }, []);
  };

  return (...args: Parameters<Fn>) => {
    subscribers += 1;
    if (state === null) {
      state = composable(...args);
    }
    dispose();
    return state!;
  };
};
