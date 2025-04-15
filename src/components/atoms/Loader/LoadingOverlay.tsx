// components/LoadingOverlay.tsx
export default function LoadingOverlay() {
    return (
      <div className="absolute inset-0 z-50 bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  