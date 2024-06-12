export default function ClickGUI({ title }) {
  return (
    <div className="relative flex flex-col gap-x-5 gap-y-2 w-[60%] h-[50%] p-5 bg-teal-500 text-white rounded-3xl shadow-2xl z-0">
      <div className="flex flex-row gap-x-5 h-full items-center">
        <div className="flex flex-col basis-1/3 h-full w-full max-w-[100px]">
          <h1 className="justify-self-center self-center text-2xl font-bold">
            {title}
          </h1>
          <div className="flex flex-col items-center gap-y-1 basis-1/3">
            {/* todo: put icon next to each section */}
            <h1 className="text-xl">section 1</h1>
            <h1 className="text-xl">section 2</h1>
            <h1 className="text-xl">section 3</h1>
          </div>
        </div>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-teal-400 bg-opacity-50 rounded-3xl -z-10"></div>
          <div className="relative flex flex-col gap-y-2 w-full h-full">
            <input
              type="text"
              className="mt-3 p-2 bg-teal-300 bg-opacity-50 text-white placeholder-gray-100 placeholder: text-center rounded-3xl w-1/2 self-center"
              placeholder="Search..."
            />
            <div className="flex flex-col gap-y-2 items-center overflow-y-scroll">
              <h1 className="text-xl">feature 1</h1>
              <h1 className="text-xl">feature 2</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
              <h1 className="text-xl">feature 3</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
