import { useState, useEffect, useMemo } from "react";
import type { Task, FilterStatus, PaginationInfo } from "../types/task";

const API_BASE = "https://jsonplaceholder.typicode.com";
const ITEMS_PER_PAGE = 10;

export function useTasks() {
  // === STATE ===
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // === FETCH on mount ===
  useEffect(() => {
    fetchTasks();
  }, []);

  function changeFilter(newFilter: FilterStatus) {
    setFilter(newFilter);
    setCurrentPage(1);
  }

  // === COMPUTED: filtered tasks ===
  const filteredTasks = useMemo<Task[]>(() => {
    switch (filter) {
      case "completed":
        return allTasks.filter((t) => t.completed);
      case "incomplete":
        return allTasks.filter((t) => !t.completed);
      default:
        return allTasks;
    }
  }, [allTasks, filter]);

  // === COMPUTED: pagination info ===
  const pagination = useMemo<PaginationInfo>(
    () => ({
      currentPage,
      totalPages: Math.ceil(filteredTasks.length / ITEMS_PER_PAGE),
      itemsPerPage: ITEMS_PER_PAGE,
      totalItems: filteredTasks.length,
    }),
    [filteredTasks, currentPage],
  );

  // === COMPUTED: tasks for current page ===
  const paginatedTasks = useMemo<Task[]>(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  // === API FETCH ===
  async function fetchTasks(): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/todos`);

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`,
        );
      }

      const data: Task[] = await response.json();
      setAllTasks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  // === TOGGLE TASK (PATCH request with optimistic update) ===
  async function toggleTask(taskId: number): Promise<void> {
    // Optimistic update — change UI immediately
    setAllTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );

    try {
      const task = allTasks.find((t) => t.id === taskId);
      const response = await fetch(`${API_BASE}/todos/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task?.completed }),
      });

      if (!response.ok) {
        // Rollback on failure
        setAllTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        );
        throw new Error("Failed to update task");
      }
    } catch (err) {
      console.error("Toggle failed:", err);
    }
  }

  return {
    loading,
    error,
    filter,
    currentPage,
    paginatedTasks,
    pagination,
    changeFilter,
    setCurrentPage,
    fetchTasks,
    toggleTask,
  };
}
