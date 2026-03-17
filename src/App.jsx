import { useState } from "react";

const App = () => {
  const [Title, setTitle] = useState("");
  const [Notes, setNotes] = useState("");
  const [Tasks, setTasks] = useState([]);

  function SubmitForm() {
    console.log("Task Added", { Heading: Title, List: Notes });

    let newtask = [...Tasks];
    newtask.push({ Heading: Title, List: Notes });
    setTasks(newtask);
    console.log(newtask);
    setTitle("");
    setNotes("");
  }
  return (
    <>
      <section className="lg:flex items-center justify-center">
        {/* Submit Form UI */}
        <div className="lg:w-1/2 bg-sky-300 w-full  h-screen flex items-center justify-center p-4">
          <div className="bg-black/70 max-w-sm w-full p-2 rounded-3xl shadow-2xl">
            <form
              className="bg-black text-white w-full max-w-sm rounded-2xl p-6"
              onSubmit={(e) => {
                e.preventDefault();
                SubmitForm();
              }}
            >
              <h1 className="text-center text-white rounded-2xl p-6  w-full max-w-sm">
                Add Your Task
              </h1>
              <input
                type="text"
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-full px-4 py-2 bg-[#222] rounded-md my-2 text-white font-semibold outline-none focus:ring-2 focus:ring-white"
                placeholder="Heading"
              />
              <textarea
                rows={8}
                className="w-full px-4 py-2 bg-[#222] rounded-md my-2 outline-none focus:ring-2 focus:ring-white"
                placeholder="Notes..."
                value={Notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              ></textarea>
              <input
                type="submit"
                value="Add task"
                className="w-full bg-white text-black rounded-md font-semibold px-4 py-2 my-2 active:scale-95 active:bg-white/50 active:text-white "
              />
            </form>
          </div>
        </div>

        {/* UI for notes */}
        <div className="lg:w-1/2 w-full bg-blue-400 h-screen  max-lg:border-t-4 lg:border-l-3  border-dashed flex flex-wrap items-center justify-center p-6 gap-6 overflow-auto">
          {Tasks.map((task, id) => {
            return (
              <div
                className="w-full max-w-78 h-78 bg-white rounded-4xl relative shadow-2xl flex items-end justify-center p-4"
                key={id}
              >
                <img
                  src="../public/pin.png"
                  className="h-15 w-20 absolute z-10 top-3 me-5"
                  alt=""
                />
                <div className="w-full  h-58 bg-orange-200 rounded-4xl p-4 ">
                  <h1 className="test-3xl font-bold">{id+ 1}</h1>
                  <h1 className="text-5xl font-semibold text-center my-1">
                    {task.Heading}
                  </h1>
                  {task.List}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default App;
