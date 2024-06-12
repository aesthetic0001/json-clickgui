import {useState} from "react";
import clsx from "clsx";

export default function SectionHeader({ title }) {
    const [active, setActive] = useState(false);

    return (
        <button className={
            clsx(
                "font-semibold select-none rounded-md text-white bg-opacity-15 hover:bg-opacity-15 w-full p-1 transition-all ease-in-out",
                active ? "bg-blue-500" : "bg-gray-200 hover:bg-gray-400"
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