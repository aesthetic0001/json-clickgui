import {useState} from "react";
import clsx from "clsx";

export default function BooleanField({name, tooltip, defaultValue}) {
    const [active, setActive] = useState(defaultValue);

    return (
        <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center">
                <h1 className="text-lg">{name}</h1>
                <span className="text-gray-500 ml-2">{tooltip}</span>
            </div>
            <div className="flex items-center">
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
            </div>
        </div>
    );
}

export function SliderField({name, tooltip, defaultValue, min, max, step}) {
    const [value, setValue] = useState(defaultValue);

    return (
        <div className="flex items-center justify-between w-full p-2">
            <div className="flex items-center">
                <h1 className="text-lg">{name}</h1>
                <span className="text-gray-500 ml-2">{tooltip}</span>
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row gap-x-4 items-center">
                    <span className="text-gray-500">{min}</span>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-20 h-2 bg-gray-600 accent-violet-400 rounded-full"
                        onDrag={(e) => e.preventDefault()}
                    />
                    <span className="text-gray-500">{max}</span>
                </div>
                <span className="self-center text-gray-500">{value}</span>
            </div>
        </div>
    );
}