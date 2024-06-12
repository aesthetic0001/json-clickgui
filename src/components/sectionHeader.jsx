import {useState} from "react";
import clsx from "clsx";

export default function SectionHeader({title}) {
    const [active, setActive] = useState(false);

    return (
        <button className={
            clsx(
                "font-semibold select-none rounded-md w-full p-2 transition-all ease-in-out",
                active ? "bg-violet-400 shadow-purple-glow" : "bg-content-bg hover:bg-gray-700"
            )
        }
            // on focus, set active to true
                onFocus={() => setActive(true)}
            // on blur, set active to false
                onBlur={() => setActive(false)}
        >
            {title}
        </button>
    )
}
