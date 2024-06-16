export const Card = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className='mb-8'>
      <div >{title}</div>
      <div className='p-4 border border-gray-300 rounded-md shadow-md'>{children}</div>
    </div>
  );
};
