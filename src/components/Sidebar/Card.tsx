import { ReactNode, Ref } from 'react';

// renderiza un popover posicionado respecto a un punto y recibe su contenido
export default function Card({ top, left, id, children, ref }: { top: number; left: number; id: number; children: ReactNode; ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      key={id}
      ref={ref}
      style={{
        top: top + 30,
        left: left + 100,
      }}
      className="fixed flex flex-col items-stretch p-1 rounded-xl border border-neutral-200 bg-white shadow-lg shadow-black/5 z-50"
    >
      {children}
    </div>
  );
}
