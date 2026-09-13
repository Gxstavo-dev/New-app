import { ReactNode, Ref } from 'react';

export default function Card({ top, left, id, children, ref }: { top: number; left: number; id: number; children: ReactNode; ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      key={id}
      ref={ref}
      style={{
        top: top + 30,
        left: left + 100,
      }}
      className=" fixed flex gap-2 p-2 flex-col items-center justify-center rounded-2xl border-2 border-neutral-200 bg-white"
    >
      {children}
    </div>
  );
}
