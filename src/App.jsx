import ClickGUI from "./components/clickGUI";
import '@fontsource/inter'; // Defaults to weight 400
import '@fontsource/inter/500.css'; // Weight 500
import '@fontsource/inter/600.css'; // Weight 600
import '@fontsource/inter/700.css';
import {useState} from "react";
import {schemaToDefault} from "./utils/schemaParser";
import clsx from "clsx"; // Weight 700
import schema from "./data/schema.json";

export default function App() {
    const [showRaw, setShowRaw] = useState(false);
    const [data, setData] = useState(schemaToDefault(schema));

    return (
        <div className="flex items-center justify-center w-dvw h-dvh font-inter">
            <ClickGUI title="config" schema={schema} data={data} setData={setData}/>
            <p className={clsx(
                showRaw ? "text-wrap m-5 max-w-[25%]" : "hidden"
            )}>
                {
                    JSON.stringify(data, null, 2)
                }
            </p>
            <button onClick={() => setShowRaw(!showRaw)}
                    className="absolute bottom-5 right-5 p-2 bg-button-active rounded-xl">
                {showRaw ? "Hide Raw" : "Show Raw"}
            </button>
        </div>
    );
}
