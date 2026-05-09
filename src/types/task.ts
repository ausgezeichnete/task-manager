export interface Task {
  //define interface for Task object.
  id: number;
  title: string;
  userID: number;
  completed: boolean;
}
export type FilterStatus = "all" | "completed" | "incomplete"; //for filtering tasks based on their completion status.

// API response state (generic — works for any API call)
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Pagination info
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}
