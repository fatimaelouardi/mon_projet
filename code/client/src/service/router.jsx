import { createBrowserRouter } from "react-router-dom/dist";
import HomePage from '../pages/HomePage'
import BaseLayout from "../layout/BaseLayout";
import ContactPage from "../pages/ContactPage";
import LogoutPage from "../pages/LogoutPage";
import ConnexionPage from "../pages/ConnecxionPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminProduitPage from "../pages/admin/AdminProduitPage";
import AdminProduitFormPage from "../pages/admin/AdminProduitFormPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Guard from "../Components/common/Guard";


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
                path: 'logout',
                element: <LogoutPage/> 
            },
            {
                path: 'zena',
                element: <Login/>  
            },
            {
                path: '/admin/',
                element: <Guard roles={[1]}>
                    <BaseLayout/>
                </Guard>,
                children: [
                    {
                        path: '',
                        element: <AdminHomePage/>
                    },
                    {
                        path: 'produit/:id?',
                        element: <AdminProduitPage/>
                    },
        
                    {
                        //  créer une variable de route : utiliser :<nom de lla variable > 
                        //  '?' : variable optionnel 
                        path: 'produit/form/:id?',  
                        element: <AdminProduitFormPage/>
                    }
                ]
            }
        ]

    },
    {
        path: 'login',  
        element: <ConnexionPage/>
    },

    // {
    //     path: 'login',
    //     element: <Login/>  // Route pour Login (si nécessaire)
    // },


   
])

export default router;




