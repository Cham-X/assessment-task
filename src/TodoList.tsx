import React, { useState, useEffect } from 'react'
import { useFormContext } from './context/FormContext'
import CustomButton from './components/custom-button/CustomButton'
import TextInput from './components/form/TextInput'
import Modal from './components/Modal'
import { useNavigate } from 'react-router-dom'

const TodoList = () => {
  const { username } = useFormContext()

  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);

  const navigate = useNavigate()

  //Add items to tasklist
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks, newTask.trim()];
    setTasks(updatedTasks);
    setNewTask("");
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  //Search task in the list
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter tasks based on the search query (case-sensitive)
  const filteredTasks = tasks.filter((task) =>
    task.includes(searchQuery)
  );

  // Open the modal for editing or deleting
  const openModal = (type: "edit" | "delete", task: string, index: number) => {
    setModalType(type);
    setCurrentTask(task);
    setCurrentTaskIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
    setCurrentTask(null);
    setCurrentTaskIndex(null);
  };
  // Handle task editing
  const handleEditTask = () => {
    if (currentTask === null || currentTaskIndex === null) return;
    const updatedTasks = [...tasks];
    updatedTasks[currentTaskIndex] = currentTask.trim();
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    closeModal();
  };

  // Handle task deletion
  const handleDeleteTask = () => {
    if (currentTaskIndex === null) return;
    const updatedTasks = tasks.filter((_, index) => index !== currentTaskIndex);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    closeModal();
  };

  //handle next task button
  const handleNextTask = () => {
    console.log("next")
    navigate("/datafetching");
  }

  return (
    <div>
      <h1>Hello {username}</h1>
      <div className="todolist-container p-4 max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-4">{username} kindly add todo List</h3>

        {/* Add Task Section */}
        <div className="mb-4 flex gap-2">
          <TextInput
            inputLabel="Add Task"
            placeholder="Enter a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            errors={{}}
          />
          <CustomButton color="primary" onClick={handleAddTask}>
            Add Task
          </CustomButton>

          {/* Search Section */}
          <div className="search-section mb-4">
            <TextInput
              inputLabel="Search"
              placeholder="Search tasks"
              value={searchQuery}
              onChange={handleSearch}
              errors={{}}
            />
          </div>

          {/* Task List */}
          <ul className="task-list">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <li
                  key={index}
                  className="flex flex-row justify-between items-center bg-gray-100 "
                  style={{ listStyle: "none", display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%" }}
                >
                  <span className="todo-text">{task}</span>
                  <div className="btn-div">
                    <CustomButton
                      color="default"
                      onClick={() => openModal("edit", task, index)}
                    >
                      Edit
                    </CustomButton>
                    <CustomButton
                      color="danger"
                      onClick={() => openModal("delete", task, index)}
                    >
                      Delete
                    </CustomButton>
                  </div>
                </li>
              ))
            ) : (
              <p className="todo-text">No tasks found</p>
            )}
          </ul>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-4">
          {modalType === "edit" ? "Edit Task" : `${username}, are you sure to Delete Task`}
        </h2>
        {modalType === "edit" && (
          <>
            <TextInput
              inputLabel="Edit Task"
              placeholder="Edit your task"
              value={currentTask || ""}
              onChange={(e) => setCurrentTask(e.target.value)}
              errors={{}}
            />
            <div className="flex justify-end gap-2 mt-4">
              <CustomButton color="primary" onClick={handleEditTask}>
                Save
              </CustomButton>
            </div>
          </>
        )}
        {modalType === "delete" && (
          <div className="flex justify-end gap-2 mt-4">
            <CustomButton color="danger" onClick={handleDeleteTask}>
              Delete
            </CustomButton>
          </div>
        )}
      </Modal>

      <div>
        <CustomButton color="default" action={handleNextTask}>
          Next task
        </CustomButton>
      </div>
    </div>
  )
}

export default TodoList
