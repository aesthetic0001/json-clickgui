export default function Feature({name, description, section}) {
    return (
        <div
            className="bg-sidebar-bg p-3 mx-3 h-fit rounded-2xl hover:scale-[102%] hover:text-text-active text-text-primary transition-all ease-in-out select-none"
            tabIndex={0}>
            <h1 className="text-2xl">{name} <span className="text-xl text-gray-600">({section})</span></h1>
            <p className="text-lg text-gray-500">{description}</p>
        </div>
    );
}
