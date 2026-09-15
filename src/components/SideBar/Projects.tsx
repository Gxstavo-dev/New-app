import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Layers, Plus } from 'lucide-react';
import { useState } from 'react';

const listVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.32, 0.72, 0, 1],
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0 },
};

export default function Projects() {
  const [hidde, setHidde] = useState(false);

  return (
    <article className="w-full max-h-65 flex gap-4 flex-col p-4 overflow-scroll">
      <div className="w-full h-5 flex items-center justify-between">
        <p className="text-white text-[12px] font-medium cursor-pointer" onClick={() => setHidde(!hidde)}>
          Proyectos
        </p>
        <button className="cursor-pointer text-whit flex items-center justify-center h-full w-4">
          <Plus width={13} height={13} strokeWidth="1.5" color="white" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {!hidde && (
          <motion.div
            key="projects-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full overflow-hidden"
          >
            <div className="w-full flex flex-col gap-2">
              <motion.button
                variants={itemVariants}
                className="w-full p-2 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer"
              >
                <Layers width={14} height={14} strokeWidth="1.4" />
                Nueva nota
              </motion.button>
              <motion.button
                variants={itemVariants}
                className="w-full p-2 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer"
              >
                <Layers width={14} height={14} strokeWidth="1.4" />
                Nueva nota
              </motion.button>
              <motion.button
                variants={itemVariants}
                className="w-full p-2 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer"
              >
                <Layers width={14} height={14} strokeWidth="1.4" />
                Nueva nota
              </motion.button>
              <motion.button
                variants={itemVariants}
                className="w-full p-2 text-[12px] text-white flex items-center gap-2 pl-2 rounded-md hover:bg-neutral-800/40 cursor-pointer"
              >
                <Layers width={14} height={14} strokeWidth="1.4" />
                Nueva nota
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}