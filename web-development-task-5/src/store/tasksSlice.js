import { createSlice, nanoid } from "@reduxjs/toolkit";

// Tasks are keyed by userId so each account has its own private list,
// all living under one persisted slice in localStorage.
const initialState = {
  itemsByUser: {}, // { [userId]: Task[] }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        const { userId, text } = action.payload;
        if (!state.itemsByUser[userId]) state.itemsByUser[userId] = [];
        state.itemsByUser[userId].unshift({
          id: nanoid(),
          text,
          completed: false,
          createdAt: Date.now(),
        });
      },
      prepare({ userId, text }) {
        return { payload: { userId, text: text.trim() } };
      },
    },
    toggleTask(state, action) {
      const { userId, id } = action.payload;
      const list = state.itemsByUser[userId];
      const task = list?.find((t) => t.id === id);
      if (task) task.completed = !task.completed;
    },
    deleteTask(state, action) {
      const { userId, id } = action.payload;
      const list = state.itemsByUser[userId];
      if (list) state.itemsByUser[userId] = list.filter((t) => t.id !== id);
    },
    clearCompleted(state, action) {
      const { userId } = action.payload;
      const list = state.itemsByUser[userId];
      if (list) state.itemsByUser[userId] = list.filter((t) => !t.completed);
    },
  },
});

export const { addTask, toggleTask, deleteTask, clearCompleted } =
  tasksSlice.actions;

export const selectTasksForUser = (userId) => (state) =>
  state.tasks.itemsByUser[userId] || [];

export default tasksSlice.reducer;
