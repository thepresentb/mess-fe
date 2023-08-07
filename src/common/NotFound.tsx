import notFoundSvg from "../assets/svg/404.svg"
import backIcon from "../assets/svg/back-icon.svg";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <img className="w-1/2 md:1/3 lg:w-1/4 text-blue-600" src={notFoundSvg} />
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Page Not Found
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Sorry, the page you are looking for could not be found.
        </p>
        <a
          href="/"
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
          title="Return Home"
        >
          <img src={backIcon} className="h-5 w-5" />
          <span>Return Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
