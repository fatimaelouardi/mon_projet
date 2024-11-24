import { createBrowserRouter } from "react-router-dom/dist";
import HomePage from '../pages/HomePage'
import BaseLayout from "../layout/BaseLayout";
import ContactPage from "../pages/ContactPage";
// import Register from "../pages/Register";
// import Login from "../pages/Login"
// import LogoutPage from "../pages/LogoutPage";
import ConnexionPage from "../pages/ConnecxionPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: 'contact',
                element: <ContactPage/>
            },

            {
                path: 'register',  
                element: <ConnexionPage/>
            }
        ]
    }
])

export default router;


// {
//     path: 'zena',
//     element: <Register/>  // Route pour Register (si nécessaire)
// },
// {
//     path: 'login',
//     element: <Login/>  // Route pour Login (si nécessaire)
// },
// {
//     path: 'logout',
//     element: <LogoutPage/>  // Logout
// },