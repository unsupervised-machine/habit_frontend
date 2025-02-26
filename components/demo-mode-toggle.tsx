interface DemoModeToggleProps {
  isDemoMode: boolean
  toggleDemoMode: () => void
}

export function DemoModeToggle({ isDemoMode, toggleDemoMode }: DemoModeToggleProps) {
  return (
    <div className="fixed bottom-4 right-4 flex items-center space-x-2">
      <span className="text-xs">Demo Mode</span>
      <button
        onClick={toggleDemoMode}
        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${
          isDemoMode ? "bg-blue-600" : "bg-gray-600"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ease-in-out ${
            isDemoMode ? "transform translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  )
}

