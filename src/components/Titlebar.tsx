import { AnimatePresence, motion } from "framer-motion";
import { useHiddeBar } from "../contexts/HiddeBar";
import ShowItems from "./ShowItems.Titlebar";
import ShowMenu from "./ShowMenu.Titlebar";

export default function Titlebar() {
  const { hidden } = useHiddeBar();

  return (
    <div className="relative w-full h-7 overflow-hidden">
      <AnimatePresence mode="wait">
        {hidden ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ShowMenu />
          </motion.div>
        ) : (
          <motion.div
            key="items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ShowItems />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
