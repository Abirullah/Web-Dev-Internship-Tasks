import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { selectCurrentUser } from "./store/authSlice";
import AuthScreen from "./components/AuthScreen";
import TodoApp from "./components/TodoApp";

export default function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="min-h-screen bg-[#F6F4EE]">
      <AnimatePresence mode="wait">
        {currentUser ? (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <TodoApp user={currentUser} />
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <AuthScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
