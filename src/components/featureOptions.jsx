import {useMemo, useState} from "react";
import clsx from "clsx";
import {FaPlus} from "react-icons/fa";
import useWindowSize from "../hooks/windowSize";

function Field({name, tooltip, children}) {
    const size = useWindowSize();

    return (
        <div className="flex items-center justify-between w-full p-2 gap-x-2">
            <div className="flex items-center self-start">
                <h1 className="text-md md:text-lg">{name}</h1>
                {
                    size.width > 1000 &&
                    <span className="text-gray-500 ml-2">{tooltip}</span>
                }
            </div>
            {children}
        </div>
    );
}

export default function BooleanField({name, tooltip, defaultValue}) {
    const [active, setActive] = useState(defaultValue);

    return (
        <Field name={name} tooltip={tooltip}>
            <button
                className="w-10 h-5 bg-gray-600 rounded-full p-1 transition-all ease-in-out"
                onClick={() => setActive(!active)}
            >
                <div
                    className={
                        clsx("w-3 h-3 rounded-full transition-all ease-in-out",
                            active ? "bg-violet-400 translate-x-5" : "bg-gray-400"
                        )
                    }
                />
            </button>
        </Field>
    );
}

export function SliderField({name, tooltip, defaultValue, min, max, step}) {
    const [value, setValue] = useState(defaultValue);

    return (
        <Field name={name} tooltip={tooltip}>
            <div className="flex flex-row align-text-top">
                <span className="text-gray-500">{min}</span>
                <div className="flex flex-col gap-y-2 items-center">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full max-w-fit h-2 bg-gray-600 accent-violet-400 rounded-full"
                        onDrag={(e) => e.preventDefault()}
                    />
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)}
                           className="w-full max-w-[50%] h-5 bg-gray-600 rounded-full p-1 text-center text-gray-500 outline-none"/>
                </div>
                <span className="text-gray-500">{max}</span>
            </div>
        </Field>
    );
}

export function DropdownField({name, tooltip, defaultValue, options}) {
    const [value, setValue] = useState(defaultValue);

    return (
        <Field name={name} tooltip={tooltip}>
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-1/2 h-10 bg-gray-600 rounded-full p-1 text-center text-gray-500 self-end outline-none"
            >
                {options.map((option, index) => {
                    return <option value={option} key={index}>{option}</option>
                })}
            </select>
        </Field>
    );
}

export function ArrayField({name, tooltip, defaultValue}) {
    const [value, setValue] = useState(defaultValue);
    const id = useMemo(() => Math.random().toString(36).substring(7), []);

    return (
        <Field name={name} tooltip={tooltip}>
            <div className="flex flex-row gap-x-2 align-text-top">
                <div className="flex flex-col gap-y-2" id={id}>
                    {/*    render the array items */}
                    {value.map((item, index) => {
                        return <input
                            type="text"
                            value={item}
                            key={index}
                            onChange={(e) => {
                                let temp = [...value];
                                temp[index] = e.target.value;
                                setValue(temp);
                            }}
                            onKeyUp={(e) => {
                                if (e.key === "Backspace" && value[index].length === 0) {
                                    if (index > 0) document.getElementById(id).children[index - 1].focus();
                                    let temp = [...value];
                                    temp.splice(index, 1);
                                    setValue(temp);
                                } else if (e.key === "Enter") {
                                    let temp = [...value];
                                    temp.splice(index + 2, 0, "");
                                    setValue(temp);
                                    // set focus when the value is rendered
                                    setTimeout(() => {
                                        document.getElementById(id).children[index + 1].focus();
                                    }, 0);
                                } else if (e.key === "ArrowDown" && index < value.length - 1) {
                                    document.getElementById(id).children[index + 1].focus();
                                } else if (e.key === "ArrowUp" && index > 0) {
                                    document.getElementById(id).children[index - 1].focus();
                                }
                            }}
                            className="w-full max-w-20 h-5 bg-gray-600 rounded-full p-1 text-center text-gray-500 self-end outline-none"
                        />
                    })}
                    <FaPlus
                        className="w-5 h-5 bg-gray-600 rounded-full p-1 text-center text-gray-500 self-end cursor-pointer"
                        onClick={() => {
                            setValue([...value, ""])
                        }}/>
                </div>
            </div>
        </Field>
    );
}

export function NestedFeatures({name, tooltip, children}) {
    // todo: collapse children when parent is collapsed
    const [collapsed, setCollapsed] = useState(true);
    const size = useWindowSize();

    return (
        <div className="flex flex-col justify-start items-start">
            <div className="flex flex-row items-center w-full group" onClick={() => {
                setCollapsed(!collapsed)
            }}>
                <div className="flex items-center self-start">
                    <h1 className="text-lg md:text-xl group-hover:text-text-active transition-all ease-in-out">{name}</h1>
                    {
                        size.width > 1000 &&
                        <span className="text-md md:text-lg text-gray-500 ml-2">{tooltip}</span>
                    }
                </div>
                <svg className={
                    clsx("h-0 md:w-5 md:h-5 shrink-0 transition-all ease-in-out ml-auto", collapsed ? "rotate-180" : "rotate-0")
                } aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                          d="M9 5 5 1 1 5"/>
                </svg>
            </div>
            <div className={
                clsx("flex flex-col transition-all ease-in-out w-full", collapsed ? "h-0 overflow-hidden" : "h-fit")
            }>
                {children}
            </div>
        </div>
    );
}