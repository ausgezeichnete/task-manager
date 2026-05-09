import type { PaginationInfo } from "../types/task";

interface Props {
  pagination: PaginationInfo;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ pagination, onPrev, onNext }: Props) {
  const startItem = (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  const endItem = Math.min(
    pagination.currentPage * pagination.itemsPerPage,
    pagination.totalItems,
  );

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Showing {startItem}–{endItem} of {pagination.totalItems} tasks
      </p>

      <div className="flex gap-2">
        <button
          onClick={onPrev}
          disabled={pagination.currentPage === 1}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:enabled:bg-indigo-50 hover:enabled:border-indigo-300 transition-colors"
        >
          ← Prev
        </button>

        <span className="px-3 py-1.5 text-sm font-medium text-indigo-600">
          {pagination.currentPage} / {pagination.totalPages}
        </span>

        <button
          onClick={onNext}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-3 py-1.5 rounded-lg text-sm border border-gray-200
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:enabled:bg-indigo-50 hover:enabled:border-indigo-300 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
