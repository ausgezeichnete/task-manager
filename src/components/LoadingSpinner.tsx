export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <span className="ml-3 text-gray-500 text-sm">Loading tasks...</span>
    </div>
  );
}
