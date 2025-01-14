import React, { useState } from "react";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editedTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="py-4 flex items-center justify-between">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="ml-3 flex-grow appearance-none bg-transparent border-b border-gray-300 w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
        ) : (
          <span
            className={`ml-3 ${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>
      <div>
        <button
          onClick={handleEdit}
          className="text-blue-500 hover:text-blue-700 mr-2"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
