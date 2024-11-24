import { Outlet } from "react-router-dom/dist";
import Header from "../Components/common/Header";
import Footer from "../Components/common/Footer";

const BaseLayout = () => {
    return <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
}

export default BaseLayout;