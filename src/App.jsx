import ClickGUI from "./components/clickGUI";
import '@fontsource/inter'; // Defaults to weight 400
import '@fontsource/inter/500.css'; // Weight 500
import '@fontsource/inter/600.css'; // Weight 600
import '@fontsource/inter/700.css';
import {useState} from "react";
import {schemaToDefault} from "./utils/schemaParser";
import clsx from "clsx"; // Weight 700

export default function App() {
    const [showRaw, setShowRaw] = useState(false);
    const schema = {
        "section 1": {
            "feature": {
                "description": "this is a description",
                "string field": {
                    "type": "text",
                    "tooltip": "enter a string",
                    "default": "default value"
                },
                "number slider": {
                    "type": "number",
                    "tooltip": "slide to select a number",
                    "min": 0,
                    "max": 100,
                    "step": 1,
                    "default": 50
                },
                "boolean field": {
                    "type": "boolean",
                    "tooltip": "check to disable/enable",
                    "default": true
                },
                "array field": {
                    "type": "array",
                    "tooltip": "modify the array",
                    "default": [
                        "one",
                        "two",
                        "three"
                    ]
                },
                "object field": {
                    "type": "object",
                    "tooltip": "modify the object",
                    "keysImmutable": true,
                    "default": {
                        "key1": "value1",
                        "key2": "value2"
                    }
                },
                "dropdown field": {
                    "type": "enum",
                    "tooltip": "select an option",
                    "values": [
                        "option1",
                        "option2",
                        "option3"
                    ],
                    "default": "option1"
                },
                "nested fields": {
                    "tooltip": "nested fields",
                    "nested boolean": {
                        "type": "boolean",
                        "tooltip": "check to enable/disable",
                        "default": false
                    }
                }
            }
        }
    };
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
