import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./sectionHeader";

export default function ClickGUI({ title }) {
  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="relative flex flex-col gap-x-5 gap-y-2 w-[60%] h-[50%] p-5 bg-sidebar-bg text-text-primary rounded-3xl shadow-2xl z-0"
      >
        <div className="flex flex-row gap-x-5 h-full items-center">
          <div className="flex flex-col gap-y-3 h-full w-full max-w-[150px]">
            <h1 className="justify-self-center self-center text-2xl font-bold">
              {title}
            </h1>
            <div className="flex flex-col items-center gap-y-2 overflow-y-scroll h-full p-2">
              {/* todo: put icon next to each section */}
              {
                Array.from(Array(10).keys()).map((i) => {
                  return <SectionHeader title={`section ${i + 1}`}/>
                })
              }
            </div>
          </div>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-content-bg bg-opacity-50 rounded-3xl -z-10"></div>
            <div className="relative flex flex-col gap-y-2 w-full h-full">
              <div className="mt-3 w-1/2 self-center gradient-ring bg-gradient-ring rounded-3xl p-[1px]">
                <input
                    type="text"
                    className="p-2 bg-search-bg bg-opacity-75 backdrop-blur-3xl text-text-primary placeholder-gray-100 placeholder:text-center rounded-3xl w-full outline-none"
                    placeholder="Search..."
                />
              </div>
              <div className="flex flex-col gap-y-2 items-center overflow-y-scroll">
                <h1 className="text-xl">feature 1</h1>
                <h1 className="text-xl">feature 2</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
                <h1 className="text-xl">feature 3</h1>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
