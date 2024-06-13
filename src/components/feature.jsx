export default function Feature({name, description, section, children}) {
    return (
        <div
            className="bg-sidebar-bg p-3 mx-3 h-fit rounded-2xl group transition-all ease-in-out select-none"
            tabIndex={0}>
            <h1 className="text-2xl group-hover:text-text-active text-text-primary transition-all ease-in-out">{name} <span className="text-xl text-gray-600">({section})</span></h1>
            <p className="text-lg text-gray-500">{description}</p>
            {children}
        </div>
    );
}
