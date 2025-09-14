export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="glass-effect rounded-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-sm">Loading CreatorDAO Share...</p>
      </div>
    </div>
  );
}
