import useWindowSize from "../hooks/windowSize";
import {useState} from "react";
import clsx from "clsx";

export default function Feature({name, description, section, children}) {
    const [collapsed, setCollapsed] = useState(true);

    const size = useWindowSize();

    return (
        <div
            className="relative bg-sidebar-bg p-3 mx-3 h-fit rounded-2xl select-none"
            tabIndex={0}>
            <div onClick={
                () => setCollapsed(!collapsed)
            } className="group">
                <h1 className="text-xl md:text-2xl group-hover:text-text-active text-text-primary transition-all ease-in-out">{name} {size.width > 768 &&
                    <span className="text-xl text-gray-600">({section})</span>}</h1>
                <p className="text-md md:text-lg text-gray-500">{description}</p>
                <svg className={
                    clsx("absolute top-0 right-0 m-5 h-0 md:w-5 md:h-5 shrink-0 transition-all ease-in-out", collapsed ? "rotate-180" : "rotate-0")
                } aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M9 5 5 1 1 5"/>
                </svg>
            </div>
            <div className={
                clsx("flex flex-col transition-all ease-in-out", collapsed ? "h-0 overflow-hidden" : "h-fit")
            }>
                {children}
            </div>
        </div>
    );
}
