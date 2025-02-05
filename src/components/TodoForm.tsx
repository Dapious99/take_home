import { ChangeEvent, FormEvent, useState } from "react";
import { categories, priorities } from "../constants";
import Button from "../Shared/Button";
import { ComingTodos } from "../App";

interface TodoFormProps {
  setTodos: React.Dispatch<React.SetStateAction<ComingTodos[]>>;
}

const TodoForm = ({ setTodos }: TodoFormProps) => {
  const [todo, setTodo] = useState({
    title: "",
    category: "",
    priority: "",
    status: "incomplete",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.title || !todo.category || !todo.priority) {
      alert("All fields are required");
      return;
    }

    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, todo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });

    setTodo({ title: "", category: "", priority: "", status: "incomplete" });
  };
  return (
    <div className="px-4 md:px-0 md:flex md:justify-center">
      <form onSubmit={handleSubmit} className="md:w-2/4">
        <div className="space-y-4 w-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={todo.title}
              onChange={handleChange}
              placeholder="Type in your Todo..."
              className="border rounded-md p-2 outline-none"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="category" className="font-medium">
              Category
            </label>
            <select
              name="category"
              value={todo.category}
              onChange={handleChange}
              id="category"
              className="border rounded-md p-2 outline-none"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="priority" className="font-medium">
              Priority
            </label>
            <select
              name="priority"
              value={todo.priority}
              onChange={handleChange}
              id="priority"
              className="border rounded-md p-2 outline-none"
              required
            >
              <option value="">Select Priority</option>
              {priorities.map((priority) => (
                <option value={priority.value}>{priority.label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <Button className="px-4 py-2" type="submit">
              Add Todo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
