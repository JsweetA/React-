import { atom, useAtom } from "jotai";
import { loadable } from "jotai/utils";

const request = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(123);
    }, 2000);
  });
};
const userAtom = atom(async (_get) => {
  const userData = await request(); // 执行异步API调用
  return userData;
});
const counter = atom(1);

const asyncAtom = atom(null, async (get, set) => {
    await request();
    set(counter, get(counter) + 1);
});

function AsyncComponent() {
  const [count] = useAtom(counter);
  const [, incCounter] = useAtom(asyncAtom);
  return (
    <div className="app">
      <h1>{count}</h1>
      <button onClick={incCounter}>inc</button>
    </div>
  )
}
const loadedAtom = loadable(userAtom);
// 在组件中使用
export const Async = () => {
  const [user] = useAtom(loadedAtom);
  const Show = ({ user }: any) => {
    if (user.state === "loading") {
      return <div>Loading...</div>;
    }

    if (user.state === "hasError") {
      return <div>Error: {}</div>;
    }

    return (
      <div>
        <div>Welcome, {user.data}!</div>
      </div>
    );
  };
  return (
    <div >
      <div>
        <Show user={user} />
      </div>
      <div>
        <AsyncComponent />
      </div>
    </div>
  );
};
