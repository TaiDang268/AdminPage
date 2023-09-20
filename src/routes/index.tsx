import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import CreateAuthor from '~/components/create/CreateAuthor'
import CreatePosts from '~/components/create/CreatePosts'
import CreateTag from '~/components/create/CreateTag'
import CreateTopic from '~/components/create/CreateTopic'

import routesPath from './routesPath'
import Author from '../components/Author'
import Layout from '../components/common/Layout'
import Login from '../components/Login'
import Posts from '../components/Posts'
import Tag from '../components/Tag'
import Topic from '../components/Topic'

export default function Routers() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const IsProtectedRouter = () => {
    return isLoggedIn === 'true' ? <Outlet /> : <Navigate to='/login' />
  }
  const IsNotProtectedRouter = () => {
    return isLoggedIn === 'false' ? <Outlet /> : <Navigate to='/' />
  }
  const routers = [
    {
      path: '/login',

      element: <IsNotProtectedRouter />,
      children: [
        {
          path: '/login',
          element: <Login />
        }
      ]
    },
    {
      path: '',
      element: <IsProtectedRouter />,
      children: [
        {
          path: '',
          element: (
            <Layout>
              <Posts />
            </Layout>
          )
        },
        {
          path: routesPath.posts,
          children: [
            {
              index: true,
              path: '',
              element: (
                <Layout>
                  <Posts />
                </Layout>
              )
            },
            {
              path: 'create_posts',
              element: <CreatePosts />
            }
          ]
        },
        {
          path: routesPath.topic,
          children: [
            {
              index: true,
              path: '',
              element: (
                <Layout>
                  <Topic />
                </Layout>
              )
            },
            {
              path: 'create_topic',
              element: <CreateTopic />
            }
          ]
        },
        {
          path: routesPath.author,
          children: [
            {
              index: true,
              path: '',
              element: (
                <Layout>
                  <Author />
                </Layout>
              )
            },
            {
              path: 'create_author',
              element: <CreateAuthor />
            }
          ]
        },
        {
          path: routesPath.tag,
          children: [
            {
              index: true,
              path: '',
              element: (
                <Layout>
                  <Tag />
                </Layout>
              )
            },
            {
              path: 'create_tag',
              element: <CreateTag />
            }
          ]
        }
      ]
    }
  ]
  const routing = useRoutes(routers)
  return routing
}
