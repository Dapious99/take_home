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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-center">Todo List</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-2 border rounded-md outline-none"
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
          className="p-2 border rounded-md outline-none"
        >
          <option value="all">All Status</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md outline-none"
        />
      </div>

      <TodoForm setTodos={setTodos} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filterCategory={filterCategory}
        filterStatus={filterStatus}
        searchTerm={searchTerm}
      />
    </div>
  );
}

export default App;
