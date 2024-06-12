export default function ClickGUI({ title }) {
  return (
    <div className="flex flex-col gap-x-5 gap-y-2 w-[66%] h-[50%] p-5 bg-gray-200 rounded-3xl">
      <div className="flex flex-row gap-x-5 h-fit items-center">
        <div className="basis-1/3">
          <h1 className="text-3xl font-bold">{title}</h1>
        </div>
        <div className="flex w-full justify-center">
          <input type="text" placeholder="Search" className="text-lg" />
        </div>
      </div>
      <div className="flex flex-row gap-x-10">
        <div className="flex flex-col items-end gap-y-1 basis-1/3">
          {/* todo: put icon next to each section */}
          <h1 className="text-xl">section 1</h1>
          <h1 className="text-xl">section 2</h1>
          <h1 className="text-xl">section 3</h1>
        </div>
        <div className="flex flex-col gap-y-2 w-full">
          <h1 className="text-xl">feature 1</h1>
          <h1 className="text-xl">feature 2</h1>
          <h1 className="text-xl">feature 3</h1>
        </div>
      </div>
    </div>
  );
}
