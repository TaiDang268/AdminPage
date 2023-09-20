import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import CreateAuthor from '~/components/create/CreateAuthor'
import CreatePosts from '~/components/create/CreatePosts'
import CreateTag from '~/components/create/CreateTag'
import CreateTopic from '~/components/create/CreateTopic'
import { Theme } from '~/hooks/useContext'

import routesPath from './routesPath'
import Author from '../components/Author'
import Layout from '../components/common/Layout'
import Login from '../components/Login'
import Posts from '../components/Posts'
import Tag from '../components/Tag'
import Topic from '../components/Topic'
export const Routes = () => {
  const { isLoggedIn } = useContext(Theme)
  const IsProtectedRouter = () => {
    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
  }
  const IsNotProtectedRouter = () => {
    return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
  }

  const element = useRoutes([
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
      path: routesPath.write,
      children: [
        { index: true, path: '', element: <Tag /> },

        {
          path: routesPath.posts,
          children: [
            { index: true, path: '', element: <Posts /> },
            {
              path: 'create_posts',
              element: (
                <Layout>
                  <CreatePosts />
                </Layout>
              )
            }
          ]
        },
        {
          path: routesPath.topic,
          children: [
            { index: true, path: '', element: <Topic /> },
            {
              path: 'create_topic',
              element: (
                <Layout>
                  <CreateTopic />
                </Layout>
              )
            }
          ]
        },
        {
          path: routesPath.author,
          children: [
            { index: true, path: '', element: <Author /> },
            {
              path: 'create_author',
              element: (
                <Layout>
                  <CreateAuthor />
                </Layout>
              )
            }
          ]
        },
        {
          path: routesPath.tag,
          children: [
            { index: true, path: '', element: <Tag /> },
            {
              path: 'create_tag',
              element: (
                <Layout>
                  <CreateTag />
                </Layout>
              )
            }
          ]
        }
      ]
    }
  ])
  return element
}
