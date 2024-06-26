import {useMemo, useState} from "react";
import clsx from "clsx";
import {FaPlus} from "react-icons/fa";
import useWindowSize from "../hooks/windowSize";
import {produce} from "immer";

function Fields({name, tooltip, children}) {
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

export function TextField({name, tooltip, defaultValue, onChange}) {
    const [value, setValue] = useState(defaultValue);

    useMemo(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <Fields name={name} tooltip={tooltip}>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-1/2 h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end outline-none"
            />
        </Fields>
    );
}

export function BooleanField({name, tooltip, defaultValue, onChange}) {
    const [active, setActive] = useState(defaultValue);

    useMemo(() => {
        onChange(active);
    }, [onChange, active]);

    return (
        <Fields name={name} tooltip={tooltip}>
            <button
                className="w-10 h-5 bg-field-bg rounded-full p-1 transition-all ease-in-out"
                onClick={() => setActive(!active)}
            >
                <div
                    className={
                        clsx("w-3 h-3 rounded-full transition-all ease-in-out",
                            active ? "bg-button-active translate-x-5" : "bg-button-inactive"
                        )
                    }
                />
            </button>
        </Fields>
    );
}

export function SliderField({name, tooltip, defaultValue, min, max, step, onChange}) {
    const [value, setValue] = useState(defaultValue);

    useMemo(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <Fields name={name} tooltip={tooltip}>
            <div className="flex flex-row align-text-top">
                <span className="text-gray-500">{min}</span>
                <div className="flex flex-col gap-y-2 items-center">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={(e) => setValue(parseInt(e.target.value))}
                        className="w-full max-w-fit h-2 bg-field-bg accent-button-active rounded-full"
                        onDrag={(e) => e.preventDefault()}
                    />
                    <input type="text" value={value} onChange={(e) => setValue(parseInt(e.target.value))}
                           className="w-full max-w-[50%] h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 outline-none"/>
                </div>
                <span className="text-gray-500">{max}</span>
            </div>
        </Fields>
    );
}

export function DropdownField({name, tooltip, defaultValue, options, onChange}) {
    const [value, setValue] = useState(defaultValue);

    useMemo(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <Fields name={name} tooltip={tooltip}>
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-1/2 h-10 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end outline-none"
            >
                {options.map((option, index) => {
                    return <option value={option} key={index}>{option}</option>
                })}
            </select>
        </Fields>
    );
}

export function ArrayField({name, tooltip, defaultValue, onChange}) {
    const [value, setValue] = useState(defaultValue);
    const id = useMemo(() => Math.random().toString(36).substring(7), []);

    useMemo(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <Fields name={name} tooltip={tooltip}>
            <div className="flex flex-col gap-y-2 overflow-y-scroll max-h-20 no-scrollbar ml-auto" id={id}>
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
                                setValue([...value.slice(0, index + 1), "", ...value.slice(index + 1)]);
                                setTimeout(() => {
                                    document.getElementById(id).children[index + 1].focus();
                                }, 0);
                            } else if (e.key === "ArrowDown" && index < value.length - 1) {
                                document.getElementById(id).children[index + 1].focus();
                            } else if (e.key === "ArrowUp" && index > 0) {
                                document.getElementById(id).children[index - 1].focus();
                            }
                        }}
                        className="w-full max-w-20 h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end outline-none"
                    />
                })}
            </div>
            <FaPlus
                className="shrink-0 w-5 h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end cursor-pointer"
                onClick={() => {
                    setValue([...value, ""])
                }}/>
        </Fields>
    );
}

function toArray(object) {
    return Object.keys(object).map((key) => {
        return {
            key: key,
            value: object[key]
        };
    })
}

function toObject(array) {
    const result = {};
    array.forEach((item) => {
        if (result[item.key]) return console.warn("Duplicate key found in object field")
        result[item.key] = item.value;
    });

    console.log(result)

    return result;
}

export function ObjectField({name, tooltip, defaultValue, onChange}) {
    const [value, setValue] = useState(defaultValue);
    const [tempArray, setTempArray] = useState(toArray(value));
    const id = useMemo(() => Math.random().toString(36).substring(7), []);

    useMemo(() => {
        onChange(value);
    }, [onChange, value]);

    return (
        <Fields name={name} tooltip={tooltip}>
            <div className="flex flex-col gap-y-2 max-h-20 overflow-y-scroll no-scrollbar ml-auto" id={id}>
                {/*    modify the array to change the object indirectly, then toObject when out of focus */}
                {
                    tempArray.map((item, index) => {
                        return (
                            <div className="flex flex-row gap-x-2" key={index}>
                                <input
                                    type="text"
                                    value={item.key}
                                    onChange={(e) => {
                                        const temp = produce(tempArray, draft => {
                                            draft[index].key = e.target.value;
                                        })
                                        setTempArray(temp);
                                    }}
                                    onBlur={() => {
                                        const res = toObject(tempArray)
                                        setValue(res);
                                        setTempArray(toArray(res));
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === "Backspace" && item.key.length === 0) {
                                            if (index > 0) document.getElementById(id).children[index - 1].children[1].focus();
                                            let temp = [...tempArray];
                                            temp.splice(index, 1);
                                            setTempArray(temp);
                                            // needed because onBlur doesn't trigger when the input is removed
                                            setValue(toObject(temp));
                                        }
                                        if (e.key === "Enter" && !value[""]) {
                                            setTempArray([...tempArray.slice(0, index + 1), {
                                                key: "",
                                                value: ""
                                            }, ...tempArray.slice(index + 1)]);
                                            setTimeout(() => {
                                                document.getElementById(id).children[index + 1].children[0].focus();
                                            }, 0);
                                        }
                                    }}
                                    className="w-full max-w-20 h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end outline-none"
                                />
                                <input
                                    type="text"
                                    value={item.value}
                                    onChange={(e) => {
                                        const temp = produce(tempArray, draft => {
                                            draft[index].value = e.target.value;
                                        })
                                        setTempArray(temp);
                                    }}
                                    onBlur={() => {
                                        const res = toObject(tempArray)
                                        setValue(res);
                                        setTempArray(toArray(res));
                                    }}
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter" && !value[""]) {
                                            setTempArray([...tempArray.slice(0, index + 1), {
                                                key: "",
                                                value: ""
                                            }, ...tempArray.slice(index + 1)]);
                                            setTimeout(() => {
                                                document.getElementById(id).children[index + 1].children[0].focus();
                                            }, 0);
                                        }
                                    }}
                                    className="w-full h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end outline-none"
                                />
                            </div>
                        );
                    })
                }
            </div>
            <FaPlus
                className="shrink-0 w-5 h-5 bg-field-bg rounded-full p-1 text-center text-gray-500 self-end cursor-pointer"
                onClick={() => {
                    const res = {...value, "": ""}
                    setValue(res)
                    setTempArray(toArray(res))
                }}/>
        </Fields>
    );
}

export function NestedFields({name, tooltip, children}) {
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