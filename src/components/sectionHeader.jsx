import clsx from "clsx";
import {useActiveSectionContext} from "../context/sectionContext";

export default function SectionHeader({title}) {
// use the context to get the active section and the function to set the active section
    const {activeSection, setActiveSection} = useActiveSectionContext();

    return (<button
        className={clsx("select-none rounded-md w-full p-2 transition-all ease-in-out", activeSection === title ? "font-semibold bg-violet-400 shadow-purple-glow" : "bg-content-bg hover:bg-gray-700")}
        onFocus={() => setActiveSection(title)}
    >
        {title}
    </button>)
}
