import { atom, useAtom } from "jotai";

const modelValueAtom = atom(0);
const modelGetAndSetAtom = atom(
  (get) => get(modelValueAtom),
  (get, set, newVal: number) => {
    set(modelValueAtom, newVal);
  }
);
const Input = () => {
  const [modelValue, setModelValue] = useAtom(modelGetAndSetAtom);

  return (
    <div>
      <input
        value={modelValue}
        onChange={(e) => {
          setModelValue(+e.target.value);
        }}
      />
      <div className='pt-8'>modelValue: {modelValue}</div>
    </div>
  );
};
export default Input;
