import { ComingTodos } from "../App";
import Button from "../Shared/Button";

interface TodoListProps {
  todos: ComingTodos[];
  setTodos: React.Dispatch<React.SetStateAction<ComingTodos[]>>;
  filterCategory: string;
  filterStatus: string;
  searchTerm: string;
}

const TodoList = ({
  todos,
  setTodos,
  filterCategory,
  filterStatus,
  searchTerm,
}: TodoListProps) => {
  const handleDelete = (index: number) => {
    const updatedTodos = todos.filter((_, todo) => todo !== index);
    setTodos(() => {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleEdit = (index: number) => {
    const newTitle = prompt("Edit todo title:", todos[index].title);
    if (newTitle) {
      const updatedTodos = [...todos];
      updatedTodos[index].title = newTitle;
      setTodos(() => {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }
  };

  const handleToggleStatus = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].status =
      updatedTodos[index].status === "incomplete" ? "complete" : "incomplete";
    setTodos(() => {
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filterCategory === "all") return true;
      return todo.category === filterCategory;
    })
    .filter((todo) => {
      if (filterStatus === "all") return true;
      return todo.status === filterStatus;
    })
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="px-4 md:px-0 md:flex md:justify-center overflow-x-scroll hide-scrollbar">
      <table className="border md:w-2/4">
        <thead>
          <tr>
            <th className="border px-3 py-2">Title</th>
            <th className="border px-3 py-2">Category</th>
            <th className="border px-3 py-2">Priority</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredTodos.map((existingTodo, index) => (
            <tr className="border">
              <td className="capitalize border px-3 py-2 text-nowrap">
                {existingTodo.title}
              </td>
              <td className="capitalize border px-3 py-2">
                {existingTodo.category}
              </td>
              <td
                className={`font-medium border px-3 py-2 ${
                  existingTodo.priority === "high"
                    ? "capitalize text-red-500"
                    : existingTodo.priority === "moderate"
                    ? "text-yellow-500 capitalize"
                    : "text-green-500 capitalize"
                }`}
              >
                {existingTodo.priority}
              </td>
              <td
                className={`capitalize border px-3 py-2 font-medium ${
                  existingTodo.status === "incomplete"
                    ? "text-red-700"
                    : "text-green-700"
                }`}
              >
                {existingTodo.status}
              </td>
              <td className="border px-3 py-2 flex gap-1 items-center">
                <Button onClick={() => handleEdit(index)} className="px-2 py-1">
                  {/* ✏️ */}
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1"
                >
                  {/* 🗑️ */}
                  Delete{" "}
                </Button>
                <Button
                  onClick={() => handleToggleStatus(index)}
                  className="px-2 py-1"
                >
                  {/* {existingTodo.status === "incomplete" ? "✅" : "⏪"} */}
                  {existingTodo.status === "incomplete" ? "Complete" : "Undo"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
