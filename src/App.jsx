import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  // Add or Update Task
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !notes.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      // Update Task
      const updatedTasks = tasks.map((task) =>
        task.id === editId
          ? { ...task, heading: title, list: notes }
          : task
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      // Add Task
      const newTask = {
        id: Date.now(),
        heading: title,
        list: notes,
      };
      setTasks([newTask, ...tasks]);
    }

    setTitle("");
    setNotes("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit Task
  const editTask = (task) => {
    setTitle(task.heading);
    setNotes(task.list);
    setEditId(task.id);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col lg:flex-row">

      {/* FORM */}
      <div className="lg:w-1/2 w-full flex items-center justify-center p-6">
        <div className="backdrop-blur-lg bg-white/20 p-6 rounded-3xl shadow-2xl w-full max-w-md">

          <form onSubmit={handleSubmit}>
            <h1 className="text-white text-2xl font-bold text-center mb-6">
              {editId ? "Edit Task" : "Add New Task"}
            </h1>

            <input
              type="text"
              placeholder="Task Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/80 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Write your notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mb-4 px-4 py-2 rounded-lg bg-white/80 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {editId ? "Update Task" : "Add Task"}
            </button>
          </form>

        </div>
      </div>

      {/* TASK LIST */}
      <div className="lg:w-1/2 w-full p-6 overflow-auto flex flex-wrap gap-6 justify-center">

        {tasks.length === 0 ? (
          <div className="text-center text-white mt-20">
            <h2 className="text-2xl font-bold">No Tasks Yet 😴</h2>
            <p className="opacity-80">Start adding your tasks!</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div
              key={task.id}
              className="w-full max-w-xs bg-white rounded-3xl p-4 shadow-xl relative hover:scale-105 transition"
            >
              {/* Pin */}
              <div className="absolute -top-3 right-4 text-2xl">📌</div>

              <h2 className="text-sm text-gray-500">#{index + 1}</h2>

              <h3 className="text-xl font-bold text-center mb-2">
                {task.heading}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {task.list}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => editTask(task)}
                  className="w-1/2 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="w-1/2 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
};

export default App;