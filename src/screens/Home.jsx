import OpenLink from "../Components/Core/OpenLink.jsx";
import Body from '../Components/Home/Body.jsx';
import Footer from '../Components/Home/Footer.jsx';

import viteLogo from "../assets/vite.svg";
import reactLogo from "../assets/react.svg";
import githubLogo from "../assets/github.svg";

import { useSelector } from "react-redux";
import FilteralbleProductTable from "../Components/FilterableProductTable/FilterableProductTable.jsx";

const Home = () => {
    const count = useSelector((state) => state.counter.value)
  return (
      <div>
          <span>{count}</span>
          <div>
              <OpenLink
                  redirectURL="https://vite.dev"
                  logoImage={viteLogo}
              />
              <OpenLink
                  redirectURL="https://react.dev"
                  logoImage={reactLogo}
              />
              <OpenLink
                  redirectURL="https://github.com/dheeyi/desarrollo-frontend-react-2025"
                  logoImage={githubLogo}
              />
          </div>
          <FilteralbleProductTable/>
          <Body/>
          <Footer/>
      </div>
  );
};

export default Home;
