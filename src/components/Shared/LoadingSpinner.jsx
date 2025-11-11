const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-200px)]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-xl font-medium ml-3">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;