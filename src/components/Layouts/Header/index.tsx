import { Link, useLocation } from "react-router-dom";
import { ROUTERS } from "../../../utils/constants/students/router.constants";

export const Header = () => {
  const location = useLocation();
  const isCreatePage = location.pathname.includes("/create");
  return (
    <div>
      <article className="article-header">
        <Link to={ROUTERS.home}>
          <button>Home</button>
        </Link>
      </article>

      <article className="article-header-create">
        {isCreatePage ? (
          <p>student from</p>
        ) : (
          <Link to={ROUTERS.create}>
            <button>Create</button>
          </Link>
        )}
      </article>
    </div>
  );
};
