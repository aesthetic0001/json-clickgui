import useWindowSize from "../hooks/windowSize";

export default function Feature({name, description, section, children}) {
    const size = useWindowSize();

    return (
        <div
            className="bg-sidebar-bg p-3 mx-3 h-fit rounded-2xl group transition-all ease-in-out select-none"
            tabIndex={0}>
            <h1 className="text-xl md:text-2xl group-hover:text-text-active text-text-primary transition-all ease-in-out">{name} {size > 768 &&
                <span className="text-xl text-gray-600">({section})</span>}</h1>
            <p className="text-md md:text-lg text-gray-500">{description}</p>
            <div className="flex flex-col">
                {children}
            </div>
        </div>
    );
}
