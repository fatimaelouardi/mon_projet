import { createBrowserRouter } from "react-router-dom/dist";
import HomePage from '../pages/HomePage'
import BaseLayout from "../layout/BaseLayout";
import ContactPage from "../pages/ContactPage";
// import Register from "../pages/Register";
// import Login from "../pages/Login"
// import LogoutPage from "../pages/LogoutPage";
// import ConnexionPage from "../pages/ConnecxionPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminProduitPage from "../pages/admin/AdminProduitPage";
import AdminProduitFormPage from "../pages/admin/AdminProduitFormPage";
import Register from "../pages/Register";
import Login from "../pages/Login";


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
                element: <Register/>
            },
            {
                path: 'login',  
                element: <Login/>
            },
            {
                path: '/admin/',
                children: [
                    {
                        path: '',
                        element: <AdminHomePage/>
                    },
                    {
                        path: 'produit',
                        element: <AdminProduitPage/>
                    },
        
                    {
                        path: 'produit/form',  
                        element: <AdminProduitFormPage/>
                    }
                ]
            }
        ]

    },
   
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