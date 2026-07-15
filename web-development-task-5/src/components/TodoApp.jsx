import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../store/authSlice";
import { addTask, clearCompleted, selectTasksForUser } from "../store/tasksSlice";
import TaskItem from "./TaskItem";

export default function TodoApp({ user }) {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasksForUser(user.id));
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const remainingCount = tasks.length - completedCount;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    dispatch(addTask({ userId: user.id, text: draft }));
    setDraft("");
  };

  return (
    <div className="min-h-screen px-6 py-10 flex justify-center">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div>
            <h1 className="text-xl font-semibold text-[#1B1B1D] tracking-tight">
              Hey, {user.username || user.email.split("@")[0]}
            </h1>
            <p className="text-[13px] text-[#8A8578] mt-0.5">
              {remainingCount === 0
                ? tasks.length === 0
                  ? "Nothing on the list yet."
                  : "All caught up."
                : `${remainingCount} task${remainingCount === 1 ? "" : "s"} left`}
            </p>
          </div>
          <button
            onClick={() => dispatch(logoutUser())}
            className="text-[12.5px] text-[#8A8578] hover:text-[#1B1B1D] border border-[#E7E2D4] hover:border-[#CFC9B8] rounded-full px-3.5 py-1.5 transition-colors"
          >
            Log out
          </button>
        </div>

        {/* Input */}
        <form onSubmit={handleAdd} className="flex gap-2 mb-5">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What needs doing?"
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E7E2D4] bg-white text-[14px] text-[#1B1B1D] placeholder:text-[#B3AE9F] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/30 focus:border-[#0F6B5C]"
          />
          <motion.button
            whileTap={{ scale: 0.94 }}
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0F6B5C] text-white text-[14px] font-medium hover:bg-[#0C5A4D] transition-colors"
          >
            Add task
          </motion.button>
        </form>

        {/* Filters + clear completed */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-[#F1EEE4] rounded-full p-1">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-3.5 py-1 text-[12.5px] rounded-full capitalize transition-colors ${
                  filter === f
                    ? "text-white"
                    : "text-[#8A8578] hover:text-[#1B1B1D]"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 bg-[#0F6B5C] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{f}</span>
              </button>
            ))}
          </div>

          {completedCount > 0 && (
            <button
              onClick={() => dispatch(clearCompleted({ userId: user.id }))}
              className="text-[12.5px] text-[#C0392B] hover:text-[#a5311f] transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>

        {/* Task list */}
        <div className="bg-white rounded-2xl border border-[#E7E2D4] shadow-[0_10px_30px_rgba(15,26,23,0.06)] overflow-hidden">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleTasks.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-14 text-center text-[13.5px] text-[#B3AE9F]"
              >
                {filter === "completed"
                  ? "No completed tasks yet."
                  : filter === "active"
                  ? "Nothing active — nice work."
                  : "Add your first task above."}
              </motion.div>
            ) : (
              visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} userId={user.id} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
