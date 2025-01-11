import githubLogo from "../../assets/github.svg";

const Logo = () => {
    return (
        <div>
            <a href="https://github.com/dheeyi/desarrollo-frontend-react-2025" target="_blank">
                <img src={githubLogo} className="logo" alt="Vite logo"/>
            </a>
        </div>
    );
};

export default Logo;
