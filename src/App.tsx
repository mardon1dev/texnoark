import AuthRoutes from "./routes/AuthRoutes";
import { Main } from "./pages";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  const token = localStorage.getItem("access_token");
  return token ? <MainRoutes /> : <AuthRoutes />;
};

export default App;
