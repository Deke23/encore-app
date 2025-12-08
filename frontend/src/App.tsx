import { useState } from 'react'
import { Flame } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          {/* Logo */}
          <div className="relative">
            <Flame className="w-24 h-24 text-brand-500 animate-pulse" />
          </div>

          {/* Welcome Text */}
          <div className="space-y-4">
            <h1 className="text-display font-bold text-gray-900 dark:text-white">
              Welcome to Encore
            </h1>
            <p className="text-h3 text-gray-600 dark:text-gray-300 max-w-2xl">
              Build core habits. Again and again.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-12">
            <div className="glass rounded-xl p-6 border border-brand-200 dark:border-gray-700">
              <h3 className="text-h3 font-semibold text-gray-900 dark:text-white mb-2">
                ✅ Frontend Ready
              </h3>
              <p className="text-small text-gray-600 dark:text-gray-400">
                React + Vite + TypeScript + Tailwind CSS
              </p>
            </div>

            <div className="glass rounded-xl p-6 border border-brand-200 dark:border-gray-700">
              <h3 className="text-h3 font-semibold text-gray-900 dark:text-white mb-2">
                ✅ Backend Ready
              </h3>
              <p className="text-small text-gray-600 dark:text-gray-400">
                FastAPI + PostgreSQL + Redis
              </p>
            </div>

            <div className="glass rounded-xl p-6 border border-brand-200 dark:border-gray-700">
              <h3 className="text-h3 font-semibold text-gray-900 dark:text-white mb-2">
                ✅ Auth Ready
              </h3>
              <p className="text-small text-gray-600 dark:text-gray-400">
                Keycloak + Casbin RBAC
              </p>
            </div>
          </div>

          {/* Interactive Counter */}
          <div className="mt-12">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="bg-brand-500 hover:bg-brand-600 active:scale-98 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Streak Counter: {count} 🔥
            </button>
          </div>

          {/* Next Steps */}
          <div className="mt-16 max-w-3xl">
            <h2 className="text-h2 font-bold text-gray-900 dark:text-white mb-6">
              🚀 Next Steps
            </h2>
            <div className="text-left space-y-3 text-small text-gray-700 dark:text-gray-300">
              <p>• <strong>Start services:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">docker-compose up -d</code></p>
              <p>• <strong>API docs:</strong> <a href="http://localhost:8000/docs" className="text-brand-500 hover:underline" target="_blank" rel="noopener noreferrer">http://localhost:8000/docs</a></p>
              <p>• <strong>Keycloak admin:</strong> <a href="http://localhost:8080/admin" className="text-brand-500 hover:underline" target="_blank" rel="noopener noreferrer">http://localhost:8080/admin</a></p>
              <p>• <strong>pgAdmin:</strong> <code className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">docker-compose --profile dev up pgadmin</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
