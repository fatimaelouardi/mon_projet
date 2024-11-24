import { RouterProvider } from "react-router-dom/dist";
import router from "./service/router";
import { UserProvider } from "./provider/User_provider";

const App = () => {

  return  <UserProvider>
    <RouterProvider router={router}/>
  </UserProvider>
}

export default App;