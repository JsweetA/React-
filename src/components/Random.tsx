export const Random = () => {
  return <span className='ml-8 w-[100px]'>random: {Math.random().toLocaleString().substring(0, 5)}</span>;
};
