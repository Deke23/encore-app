/**
 * Vite Configuration for Encore - Habit Tracker PWA
 *
 * This file configures the Vite build system, Progressive Web App (PWA) capabilities,
 * service worker caching strategies, development server proxies, and production build
 * optimization.
 *
 * @overview
 * Encore is built as an offline-first PWA to support habit tracking even without
 * network connectivity. This configuration file is critical for:
 *
 * 1. **PWA Setup** - Enables app installation and offline functionality
 * 2. **Caching Strategy** - Defines how different resources are cached for offline use
 * 3. **Build Optimization** - Splits bundles for better initial load performance
 * 4. **Development Experience** - Proxies API requests to backend services
 *
 * @see https://vitejs.dev/config/ - Vite Configuration Reference
 * @see https://vite-pwa-org.netlify.app/ - Vite PWA Plugin Documentation
 * @see https://developer.chrome.com/docs/workbox/ - Workbox Documentation
 *
 * @module vite.config
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  /**
   * Vite Plugins Configuration
   *
   * Plugins extend Vite's functionality. Order matters - plugins are applied
   * in the order they appear in this array.
   */
  plugins: [
    /**
     * React Plugin
     *
     * Enables React Fast Refresh for instant feedback during development
     * and handles JSX/TSX transformation for production builds.
     *
     * @see https://github.com/vitejs/vite-plugin-react
     */
    react(),

    /**
     * Progressive Web App (PWA) Plugin
     *
     * Transforms the React application into an installable PWA with offline
     * capabilities. This plugin:
     *
     * 1. Generates a web app manifest for installation
     * 2. Creates a service worker using Workbox for caching
     * 3. Handles automatic updates when new versions are deployed
     *
     * @see https://vite-pwa-org.netlify.app/guide/
     */
    VitePWA({
      /**
       * Service Worker Registration Type
       *
       * 'autoUpdate' - The service worker automatically updates when a new
       * version is detected. Users get the latest version on next page load
       * without requiring manual intervention.
       *
       * Alternatives:
       * - 'prompt': Shows a prompt to users asking them to update
       * - 'autoUpdate': (current) Silent updates on next visit
       *
       * For a habit tracker, autoUpdate ensures users always have bug fixes
       * and new features without friction.
       */
      registerType: 'autoUpdate',

      /**
       * Static Assets to Include in Service Worker Cache
       *
       * These files are pre-cached during service worker installation,
       * making them available offline immediately after first visit.
       *
       * - favicon.ico: Browser tab icon
       * - icons/*.png: PWA icons for home screen/app launcher
       * - robots.txt: SEO directives (cached for completeness)
       */
      includeAssets: ['favicon.ico', 'icons/*.png', 'robots.txt'],

      /**
       * Web App Manifest Configuration
       *
       * The manifest tells browsers how to display the app when installed
       * on a user's device. This is what makes the app "installable".
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/Manifest
       */
      manifest: {
        /**
         * Full application name displayed during installation prompts
         * and in the device's app listing.
         */
        name: 'Encore - Habit Tracker',

        /**
         * Short name used when space is limited, such as on home screens
         * where only 12 characters may be visible.
         */
        short_name: 'Encore',

        /**
         * Description shown in app stores and installation prompts.
         * Matches the brand tagline for consistency.
         */
        description: 'Build core habits. Again and again.',

        /**
         * Theme Color (Orange-500: #f97316)
         *
         * Customizes the browser UI (address bar, status bar) when the
         * app is running. Uses Encore's primary brand orange color.
         *
         * This must match the Tailwind 'brand-500' color defined in
         * tailwind.config.js for visual consistency.
         */
        theme_color: '#f97316',

        /**
         * Background Color
         *
         * Shown as a splash screen background while the app loads.
         * White provides a clean, neutral loading experience.
         */
        background_color: '#ffffff',

        /**
         * Display Mode
         *
         * 'standalone' - Opens like a native app without browser UI
         * (no address bar, bookmarks, etc.). This provides the most
         * app-like experience for habit tracking.
         *
         * Alternatives:
         * - 'fullscreen': Hides even the status bar
         * - 'minimal-ui': Shows minimal browser controls
         * - 'browser': Opens in regular browser tab
         */
        display: 'standalone',

        /**
         * Screen Orientation
         *
         * 'portrait' - Locks the app to portrait mode. Habit tracking
         * UI is optimized for vertical scrolling through daily habits.
         */
        orientation: 'portrait',

        /**
         * Start URL
         *
         * The URL that loads when the app is launched from home screen.
         * Root path ensures users always start at the main habits view.
         */
        start_url: '/',

        /**
         * App Icons
         *
         * Icons displayed on home screens, app launchers, and task switchers.
         * Multiple sizes ensure crisp rendering on different devices.
         *
         * Icon Specifications:
         * - 192x192: Standard home screen icon
         * - 512x512: High-resolution for splash screens and app stores
         *
         * Purpose values:
         * - 'any': Standard icon usage
         * - 'maskable': Can be cropped to different shapes (circles, squircles)
         *   on Android. The icon should have safe area padding.
         *
         * @see https://web.dev/maskable-icon/
         */
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },

      /**
       * Workbox Configuration
       *
       * Workbox is Google's library for service worker caching strategies.
       * This configuration defines how different types of resources are
       * cached and served, enabling offline functionality.
       *
       * @see https://developer.chrome.com/docs/workbox/
       */
      workbox: {
        /**
         * Runtime Caching Configuration
         *
         * Defines caching strategies for requests made during app runtime
         * (as opposed to pre-cached static assets). Each entry specifies:
         *
         * - urlPattern: Regex matching URLs to cache
         * - handler: Caching strategy to use
         * - options: Strategy-specific settings
         *
         * Available Caching Strategies:
         *
         * | Strategy      | Description                                    | Best For              |
         * |---------------|------------------------------------------------|-----------------------|
         * | CacheFirst    | Serve from cache, fetch only if not cached    | Static assets, fonts  |
         * | NetworkFirst  | Try network, fall back to cache if offline    | API data, dynamic     |
         * | StaleWhileRevalidate | Serve cached, update in background     | Semi-dynamic content  |
         * | NetworkOnly   | Never cache, always fetch                      | Sensitive data        |
         * | CacheOnly     | Only serve from cache                          | Pre-cached assets     |
         */
        runtimeCaching: [
          /**
           * Google Fonts CSS Caching
           *
           * Strategy: CacheFirst
           *
           * Google Fonts CSS files contain @font-face declarations that
           * rarely change. Caching aggressively improves load performance
           * and enables offline font rendering.
           *
           * Why CacheFirst:
           * - Font CSS is versioned via URL (changes get new URLs)
           * - Eliminates network roundtrip for fonts on repeat visits
           * - Critical for offline support (fonts needed for text)
           *
           * Cache Settings:
           * - maxEntries: 10 - Limits stored font variations
           * - maxAgeSeconds: 1 year - Long cache since URLs are versioned
           * - statuses: [0, 200] - Cache opaque responses (CORS) and successes
           */
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                /**
                 * Cacheable Response Statuses
                 *
                 * - 0: Opaque responses from cross-origin requests (CORS)
                 *      Google Fonts returns opaque responses that must be cached
                 * - 200: Successful responses
                 */
                statuses: [0, 200]
              }
            }
          },

          /**
           * Google Fonts File Caching (gstatic.com)
           *
           * Strategy: CacheFirst
           *
           * The actual font files (WOFF2, TTF) are served from gstatic.com.
           * These are immutable - the same URL always returns the same file.
           *
           * Why CacheFirst:
           * - Font files are immutable (content-addressed URLs)
           * - Large files benefit most from caching
           * - Essential for offline text rendering
           */
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },

          /**
           * API Response Caching
           *
           * Strategy: NetworkFirst
           *
           * API requests for habit data, user info, and other dynamic content
           * should prefer fresh data but fall back to cached data when offline.
           *
           * Why NetworkFirst:
           * - Habit data changes frequently (completions, new habits)
           * - Users expect to see their latest data when online
           * - Cached data provides offline access to last-known state
           *
           * Network Timeout:
           * - 10 seconds before falling back to cache
           * - Balances freshness with user experience on slow networks
           *
           * Use Case - Offline Habit Tracking:
           * When a user opens the app offline, they'll see their cached
           * habits and completions. New completions are stored locally
           * (via separate offline-first logic) and synced when online.
           */
          {
            urlPattern: /^.*\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              /**
               * Network Timeout (seconds)
               *
               * If the network doesn't respond within 10 seconds, serve
               * the cached response instead. This prevents users from
               * waiting indefinitely on slow/failing networks.
               *
               * 10 seconds balances:
               * - Giving slow networks a chance to respond
               * - Not frustrating users with long waits
               */
              networkTimeoutSeconds: 10,
              expiration: {
                /**
                 * Maximum Cached API Responses
                 *
                 * Limits cache size by number of entries. When exceeded,
                 * least recently used entries are removed first.
                 *
                 * 100 entries accommodates typical usage patterns:
                 * - User habits list
                 * - Completion history (last 30 days)
                 * - User profile
                 * - Various metadata endpoints
                 */
                maxEntries: 100,
                /**
                 * Maximum Cache Age: 1 Day
                 *
                 * API data expires after 24 hours. This ensures:
                 * - Stale data doesn't persist indefinitely
                 * - Users get fresh data after extended offline periods
                 * - Cache doesn't grow unbounded with old responses
                 */
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],

  /**
   * Module Resolution Configuration
   *
   * Customizes how modules are resolved during bundling.
   */
  resolve: {
    /**
     * Path Aliases
     *
     * Defines import shortcuts to avoid relative path hell.
     * Instead of: import { Button } from '../../../components/Button'
     * Use:        import { Button } from '@/components/Button'
     *
     * The '@' alias points to the src/ directory, keeping imports
     * clean and making file moves less disruptive.
     *
     * Note: This alias must also be configured in tsconfig.json
     * for TypeScript to understand the paths.
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  /**
   * Development Server Configuration
   *
   * Settings for the Vite dev server used during local development.
   * These settings do NOT affect production builds.
   */
  server: {
    /**
     * Development Server Port
     *
     * Default port for the frontend dev server.
     * Access the app at http://localhost:5173
     */
    port: 5173,

    /**
     * Strict Port Mode
     *
     * When false, Vite will try the next available port if 5173 is busy.
     * This prevents "port in use" errors when running multiple projects.
     *
     * When true, Vite would fail if the port is unavailable.
     */
    strictPort: false,

    /**
     * Host Binding
     *
     * When true, the server binds to 0.0.0.0 instead of localhost,
     * making it accessible from other devices on the network.
     *
     * Useful for:
     * - Testing on mobile devices during development
     * - Accessing from Docker containers
     * - Team members on the same network
     */
    host: true,

    /**
     * API Proxy Configuration
     *
     * Proxies route requests from the frontend dev server to backend
     * services, avoiding CORS issues during development.
     *
     * In production, these routes are handled by Nginx reverse proxy.
     * This proxy config simulates that setup locally.
     *
     * How it works:
     * 1. Frontend makes request to http://localhost:5173/api/habits
     * 2. Vite proxy intercepts requests matching '/api'
     * 3. Request is forwarded to http://localhost:8000/api/habits
     * 4. Response is passed back to the frontend
     */
    proxy: {
      /**
       * Backend API Proxy
       *
       * Routes all /api/* requests to the FastAPI backend server
       * running on port 8000.
       *
       * Example:
       * - Request:  GET http://localhost:5173/api/v1/habits
       * - Proxied:  GET http://localhost:8000/api/v1/habits
       */
      '/api': {
        target: 'http://localhost:8000',
        /**
         * Change Origin
         *
         * When true, the proxy changes the request's Host header
         * to match the target URL. This is required when the backend
         * validates the Host header or uses it for routing.
         */
        changeOrigin: true,
      },

      /**
       * Authentication (Keycloak) Proxy
       *
       * Routes all /auth/* requests to Keycloak running on port 8080.
       * Keycloak handles OAuth2/OIDC authentication flows.
       *
       * Example:
       * - Request:  GET http://localhost:5173/auth/realms/encore/protocol/openid-connect/token
       * - Proxied:  GET http://localhost:8080/auth/realms/encore/protocol/openid-connect/token
       */
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },

  /**
   * Production Build Configuration
   *
   * Settings that control how the application is bundled for production.
   */
  build: {
    /**
     * Output Directory
     *
     * Where production build files are written.
     * The 'dist' folder is served by Nginx in production.
     */
    outDir: 'dist',

    /**
     * Source Maps
     *
     * Disabled in production for:
     * - Smaller bundle sizes (source maps can be large)
     * - Security (don't expose source code structure)
     * - Faster builds
     *
     * For debugging production issues, temporarily enable this
     * or use a separate source map upload to error tracking services.
     */
    sourcemap: false,

    /**
     * Rollup Bundle Configuration
     *
     * Vite uses Rollup for production builds. These options
     * customize how code is split and optimized.
     */
    rollupOptions: {
      output: {
        /**
         * Manual Chunk Splitting
         *
         * Defines how modules are grouped into separate JavaScript files.
         * This improves caching and initial load performance.
         *
         * Why split chunks:
         * 1. **Better Caching**: Vendor code changes less often than app code.
         *    Users only re-download chunks that changed.
         * 2. **Parallel Loading**: Multiple smaller files can load in parallel.
         * 3. **Lazy Loading Ready**: Chunks can be loaded on-demand.
         *
         * Chunk Strategy:
         *
         * | Chunk Name    | Contents                     | Change Frequency |
         * |---------------|------------------------------|------------------|
         * | react-vendor  | React core libraries         | Rare (quarterly) |
         * | ui-vendor     | Animation & icon libraries   | Occasional       |
         * | data-vendor   | State & data fetching        | Occasional       |
         * | (main)        | Application code             | Frequent         |
         */
        manualChunks: {
          /**
           * React Vendor Chunk
           *
           * Core React libraries that power the application.
           * These rarely change between deploys.
           *
           * - react: Core React library
           * - react-dom: DOM rendering
           * - react-router-dom: Client-side routing
           */
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          /**
           * UI Vendor Chunk
           *
           * Libraries for animations, visual effects, and icons.
           *
           * - framer-motion: Animation library for smooth transitions
           * - lottie-react: Lottie animation player for complex animations
           * - lucide-react: Icon library (Feather-style icons)
           */
          'ui-vendor': ['framer-motion', 'lottie-react', 'lucide-react'],

          /**
           * Data Vendor Chunk
           *
           * Libraries for data fetching and state management.
           *
           * - @tanstack/react-query: Server state management & caching
           * - axios: HTTP client for API requests
           * - zustand: Lightweight client state management
           */
          'data-vendor': ['@tanstack/react-query', 'axios', 'zustand'],
        }
      }
    }
  }
})
