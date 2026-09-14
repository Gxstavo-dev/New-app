import { Sidebar } from 'lucide-react';

export default function Head() {
  return (
    <article className="w-full h-9 flex items-center pl-2">
      <button className="p-1 cursor-pointer rounded-md">
        <Sidebar color="white" width={15} height={15} />
      </button>
    </article>
  );
}
