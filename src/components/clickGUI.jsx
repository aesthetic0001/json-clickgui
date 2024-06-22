import {AnimatePresence, motion} from "framer-motion";
import ActiveSectionContextProvider from "../context/sectionContext";
import {useState} from "react";
import {parseSchema} from "../utils/schemaParser";

export default function ClickGUI({title, schema, data, setData}) {
    const [search, setSearch] = useState("");

    const {sections, features} = parseSchema(schema, data, setData);

    return (
        <AnimatePresence>
            <motion.div
                key="modal"
                initial={{opacity: 0, scale: 0}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0}}
                className="relative flex flex-col gap-x-5 gap-y-2 w-[60%] h-[70%] p-5 bg-sidebar-bg text-text-primary rounded-3xl shadow-2xl z-0"
            >
                <ActiveSectionContextProvider initialSection="section 1">
                    <div className="flex flex-row gap-x-5 h-full items-center">
                        <div className="flex flex-col gap-y-3 h-full w-full max-w-[150px]">
                            <h1 className="justify-self-center self-center text-2xl">
                                {title}
                            </h1>
                            <div
                                className="flex flex-col items-center gap-y-2 overflow-y-scroll h-full p-2 no-scrollbar">
                                {
                                    sections
                                }
                            </div>
                        </div>
                        <div className="relative w-full h-full flex flex-col">
                            <div className="absolute inset-0 bg-content-bg bg-opacity-50 rounded-3xl -z-10"></div>
                            <div className="relative flex flex-col gap-y-2 w-full h-full">
                                <div
                                    className="mt-3 w-1/2 self-center bg-gradient-ring rounded-3xl p-[2px] transition-all ease-in-out">
                                    <input
                                        type="text"
                                        className="p-2 bg-search-bg bg-opacity-75 backdrop-blur-3xl text-text-primary placeholder-gray-100 text-center placeholder:text-center rounded-3xl w-full outline-none"
                                        placeholder="Search"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value)
                                        }}
                                    />
                                </div>
                                <div
                                    className="flex-grow flex flex-col w-full h-full gap-y-2 overflow-y-scroll no-scrollbar">
                                    {/*    todo: implement search again when fully ready */}
                                    {
                                        features
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </ActiveSectionContextProvider>
            </motion.div>
        </AnimatePresence>
    );
}
