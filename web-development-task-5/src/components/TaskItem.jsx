import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toggleTask, deleteTask } from "../store/tasksSlice";

export default function TaskItem({ task, userId }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
      transition={{ type: "spring", stiffness: 500, damping: 38 }}
      className="group flex items-center gap-3 px-4 py-3 border-b border-[#F1EEE4] last:border-b-0 hover:bg-[#FBFAF6] transition-colors"
    >
      {/* Custom animated checkbox */}
      <button
        onClick={() => dispatch(toggleTask({ userId, id: task.id }))}
        className="shrink-0 w-5 h-5 rounded-full border-2 border-[#CFC9B8] flex items-center justify-center"
        style={{
          borderColor: task.completed ? "#0F6B5C" : "#CFC9B8",
          backgroundColor: task.completed ? "#0F6B5C" : "transparent",
        }}
      >
        <motion.svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          initial={false}
          animate={{ opacity: task.completed ? 1 : 0, scale: task.completed ? 1 : 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      {/* Task text */}
      <span
        onClick={() => dispatch(toggleTask({ userId, id: task.id }))}
        className="flex-1 text-[14px] text-[#1B1B1D] cursor-pointer select-none relative"
      >
        {task.text}
        <motion.span
          className="absolute left-0 top-1/2 h-[1.5px] bg-[#B3AE9F]"
          initial={false}
          animate={{ width: task.completed ? "100%" : "0%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </span>
      <motion.span
        animate={{ opacity: task.completed ? 0.45 : 1 }}
        className="sr-only"
      >
        {task.completed ? "completed" : "active"}
      </motion.span>

      {/* Delete */}
      <button
        onClick={() => dispatch(deleteTask({ userId, id: task.id }))}
        className="shrink-0 opacity-0 group-hover:opacity-100 text-[#C0392B]/70 hover:text-[#C0392B] transition-opacity text-[12.5px]"
      >
        Delete
      </button>
    </motion.div>
  );
}
