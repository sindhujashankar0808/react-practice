import { Route, Routes } from "react-router-dom";

import HomePage from "../pages/Students/HomePage";
import CreatePage from "../pages/Students/CreatePage";
import EditPage from "../pages/Students/EditPage";
import PageNotFound from "../pages/Students/PageNotFound";
import { ROUTERS } from "../utils/constants/students/router.constants";

export const CustomRouters = () => {
  return (
    <div>
      <Routes>
        <Route path={ROUTERS.landing} element={<HomePage />} />
        <Route path={ROUTERS.home} element={<HomePage />} />
        <Route path={ROUTERS.create} element={<CreatePage />} />
        <Route path={ROUTERS.edit} element={<EditPage />} />
        <Route path={ROUTERS.pageNotFound} element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
