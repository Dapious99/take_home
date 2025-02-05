import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export interface ComingTodos {
  title: string;
  category: string;
  priority: string;
  status: string;
}
function App() {
  const [todos, setTodos] = useState<ComingTodos[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const categories = Array.from(new Set(todos.map((todo) => todo.category)));

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  return (
    <div className="space-y-4 py-3">
      <h1 className="text-lg md:text-2xl font-semibold text-yellow-600 text-center mb-2">
        Todo List
      </h1>

      <div className="px-4 md:px-0 flex flex-col md:items-center gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="p-2 border rounded-md outline-none w-full md:w-64"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded-md outline-none w-full md:w-64"
          >
            <option value="all">All Status</option>
            <option value="complete">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md outline-none w-full md:w-[33rem]"
        />
      </div>

      <TodoList
        todos={todos}
        setTodos={setTodos}
        filterCategory={filterCategory}
        filterStatus={filterStatus}
        searchTerm={searchTerm}
      />
      <h1 className="text-lg md:text-2xl font-semibold text-yellow-600 text-center mb-2">
        Add New Todo
      </h1>
      <TodoForm setTodos={setTodos} />
    </div>
  );
}

export default App;
