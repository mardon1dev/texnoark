import { Route, Routes } from "react-router-dom";
import { Brand, Category, Dashboard, Main, Products } from "../pages/index";

const MainRoutes = () => {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="brands" element={<Brand />} />
          <Route path="categories" element={<Category />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRoutes;
