import ClickGUI from "./components/ClickGUI";
import '@fontsource/inter'; // Defaults to weight 400
import '@fontsource/inter/500.css'; // Weight 500
import '@fontsource/inter/600.css'; // Weight 600
import '@fontsource/inter/700.css'; // Weight 700

export default function App() {
  return (
    <div className="flex items-center justify-center w-dvw h-dvh font-inter">
      <ClickGUI title="ClickGUI" />
    </div>
  );
}
