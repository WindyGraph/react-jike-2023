import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { AuthRoute } from '@/components/AuthRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'

const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={'加载中'}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/article',
        element: (
          <Suspense fallback={'加载中'}>
            <Article />
          </Suspense>
        ),
      },
      {
        path: '/publish',
        element: (
          <Suspense fallback={'加载中'}>
            <Publish />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
