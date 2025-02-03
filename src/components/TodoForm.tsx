import { ChangeEvent, FormEvent, useState } from "react";

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: "",
    category: "",
    priority: "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={todo.title}
              onChange={handleChange}
              placeholder="Type in your Todo..."
              className=""
            />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={todo.category}
              onChange={handleChange}
              id="category"
              className=""
            ></select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
