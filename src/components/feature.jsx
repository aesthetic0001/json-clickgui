import {useState} from "react";
import clsx from "clsx";

export default function Feature({ name, description, section }) {
    const [active, setActive] = useState(false);

    return (
        <div className="flex-grow bg-sidebar-bg p-3 mx-3 rounded-2xl hover:scale-[102%] transition-all ease-in-out shadow-2xl select-none"
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                tabIndex={0}>
            <h1 className={
                clsx(
                    "text-2xl transition-all ease-in-out",
                    active ? "text-text-active" : "text-text-primary"
                )
            }>{name} <span className="text-xl text-gray-600">({section})</span></h1>
            <p className="text-lg text-gray-500">{description}</p>
        </div>
    );
}
