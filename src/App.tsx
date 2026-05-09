import { useTasks } from "./hooks/useTasks";
import TaskFilter from "./components/TaskFilter";
import TaskList from "./components/TaskList";
import Pagination from "./components/Pagination";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

export default function App() {
  const {
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
  } = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Task Manager
          </h1>
          <p className="text-gray-500 mt-1">
            {pagination.totalItems} tasks loaded via REST API
          </p>
        </header>

        {/* Filter */}
        <div className="mb-6">
          <TaskFilter filter={filter} onFilterChange={changeFilter} />
        </div>

        {/* States */}
        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={fetchTasks} />
        )}

        {!loading && !error && (
          <>
            <TaskList tasks={paginatedTasks} onToggle={toggleTask} />

            {pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  pagination={pagination}
                  onPrev={() => setCurrentPage(currentPage - 1)}
                  onNext={() => setCurrentPage(currentPage + 1)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
