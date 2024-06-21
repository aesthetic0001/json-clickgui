import clsx from "clsx";
import {useActiveSectionContext} from "../context/sectionContext";

export default function SectionHeader({title}) {
// use the context to get the active section and the function to set the active section
    const {activeSection, setActiveSection} = useActiveSectionContext();

    return (<button
        className={clsx("select-none rounded-xl w-full p-2 transition-all ease-in-out", activeSection === title ? "font-semibold bg-button-active shadow-purple-glow" : "bg-content-bg hover:bg-button-hover")}
        onFocus={() => setActiveSection(title)}
    >
        {title}
    </button>)
}
