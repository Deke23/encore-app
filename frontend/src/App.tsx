import { useState } from 'react'
import { Flame, Check, Settings, BarChart3 } from 'lucide-react'
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Spinner,
} from '@/components/ui'

function App() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.length > 0 && value.length < 3) {
      setInputError('Habit name must be at least 3 characters')
    } else {
      setInputError('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-12">
          <div className="relative">
            <Flame className="w-20 h-20 text-brand-500 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-display font-bold text-gray-900 dark:text-white">
              Encore Design System
            </h1>
            <p className="text-h3 text-gray-600 dark:text-gray-300">
              Sprint 1: Component Library Showcase
            </p>
          </div>
        </div>

        {/* Component Showcase */}
        <div className="grid gap-8">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                All button variants with different sizes and states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button>Default Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Flame className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button>
                  <Check className="w-4 h-4 mr-2" />
                  With Icon
                </Button>
                <Button onClick={() => setCount(count + 1)}>
                  Clicked {count} times 🔥
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>
                Text inputs with validation states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter habit name..."
                value={inputValue}
                onChange={handleInputChange}
                error={inputError}
              />
              <Input placeholder="Disabled input" disabled />
              <Input type="password" placeholder="Password input" />
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>
                Labels and status indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="freeze">Freeze</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Spinners */}
          <Card>
            <CardHeader>
              <CardTitle>Spinners</CardTitle>
              <CardDescription>
                Loading indicators in different sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-8">
                <Spinner size="sm" />
                <Spinner size="default" />
                <Spinner size="lg" />
              </div>
            </CardContent>
          </Card>

          {/* Cards Demo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Flame className="w-8 h-8 text-brand-500" />
                  <Badge variant="success">Active</Badge>
                </div>
                <CardTitle>Morning Run</CardTitle>
                <CardDescription>7 day streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-display font-bold text-brand-500">7</span>
                  <Button size="sm">
                    <Check className="w-4 h-4 mr-1" />
                    Complete
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Settings className="w-8 h-8 text-gray-400" />
                  <Badge variant="secondary">Free</Badge>
                </div>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Open Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <BarChart3 className="w-8 h-8 text-brand-500" />
                  <Badge variant="freeze">Premium</Badge>
                </div>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-small text-gray-600">
                  <div className="flex justify-between">
                    <span>Completion Rate:</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Best Streak:</span>
                    <span className="font-semibold">21 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="bg-brand-50 dark:bg-gray-800 border-brand-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-brand-500" />
                Sprint 1 Progress
              </CardTitle>
              <CardDescription>
                Foundation components are ready!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="success">✓</Badge>
                <span className="text-sm">Button component with all variants</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">✓</Badge>
                <span className="text-sm">Input component with validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">✓</Badge>
                <span className="text-sm">Card component system</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="success">✓</Badge>
                <span className="text-sm">Badge and Spinner components</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">⏳</Badge>
                <span className="text-sm">Backend models (User, Habit, Completion)</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">⏳</Badge>
                <span className="text-sm">Keycloak authentication integration</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App
