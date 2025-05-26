import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy } from 'react';

// layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(() => import("@layouts/ProfileLayout/ProfileLayout"));

// pages
const Home = lazy(() => import('@pages/Home'))
const Products = lazy(() => import('@pages/Products'))
const Categories = lazy(() => import('@pages/Categories'))
const AboutUs = lazy(() => import('@pages/AboutUs'))
const Login = lazy(() => import('@pages/Login'))
const SignUp = lazy(() => import('@pages/SignUp'))
const Cart = lazy(() => import('@pages/Cart'))
const WishList = lazy(() => import('@pages/WishList'))
const Account = lazy(() => import('@pages/Account'))
const Orders = lazy(() => import('@pages/Orders'))

import Error from '@pages/Error';
import PageSuspenseFallback from '@components/feedback/PageSuspenseFallback/PageSuspenseFallback';
import ProtectedRoute from '@components/Auth/ProtectedRoutes';


const router = createBrowserRouter([{
   path: '/',
   element: (
    <PageSuspenseFallback >
      <MainLayout />
   </PageSuspenseFallback>
  ),
   errorElement: <Error />,
   children: [
     {
       index: true,
       element: 
       <PageSuspenseFallback >
        <Home />
       </PageSuspenseFallback> 
        
     },
     {
       path: 'categories',
       element: 
        <PageSuspenseFallback >
          <Categories />
        </PageSuspenseFallback> 
     },
     {
       path: 'categories/products/:prefix',
       element: <PageSuspenseFallback ><Products /></PageSuspenseFallback>,
       loader: ({ params }) => {
        if (
          typeof params.prefix !== 'string' || 
          !/^[a-z]+$/i.test(params.prefix) ){
          throw new Response('Bad Request', {
            status: 404,
            statusText: 'Category Not Found'
          }
        )
       }
       return true;
      }
     },
     {
      path: 'cart',
      element: 
        <PageSuspenseFallback >
          <Cart />
        </PageSuspenseFallback>
     },
     {
      path: 'wishlist',
      element:
        <PageSuspenseFallback >
          <WishList />
        </PageSuspenseFallback>
     },
     {
       path: 'about-us',
       element: 
       <PageSuspenseFallback >
        <AboutUs />
       </PageSuspenseFallback>
     },
     {
       path: 'login',
       element: 
        <PageSuspenseFallback >
          <Login />
        </PageSuspenseFallback>
     },
     {
       path: 'signup',
       element: 
        <PageSuspenseFallback >
          <SignUp />
        </PageSuspenseFallback>
     },
     {
       path: 'profile',
       element: 
        (<ProtectedRoute>
          <PageSuspenseFallback>
            <ProfileLayout />
          </PageSuspenseFallback>
        </ProtectedRoute>),
        children: [
          {
            index: true,
            element:
            (<PageSuspenseFallback>
              <Account />
            </PageSuspenseFallback>)
          },
          {
            path: 'orders',
            element: (
              <PageSuspenseFallback>
                <Orders />
              </PageSuspenseFallback>
            )
          }
        ]
     }
   ]
 }])
const AppRouter = () => {
  return (
   <RouterProvider router={router}  />

  )
}

export default AppRouter