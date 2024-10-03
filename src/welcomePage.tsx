import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * To show nav footer on main pages
 * (value: boolean): This part indicates that the function takes a single argument named value, which must be of type boolean.
 * => void: This indicates that the function does not return any value (void means no return).
 */
interface WelcomePageProps {
  setShowNavFooter: (value: boolean) => void;
}

export default function WelcomePage({ setShowNavFooter }: WelcomePageProps) {
  // const [openLogin, setOpenLogin] = useState(false);
  // const [openRegister, setOpenRegister] = useState(false);
  // const [LoginUsername, setLoginUsername] = useState("");
  // const [LoginPassword, setLoginPassword] = useState("");
  // const [RegisterUsername, setRegisterUsername] = useState("");
  // const [RegisterPassword, setRegisterPassword] = useState("");
  // const [RegisterEmail, setRegisterEmail] = useState("");
  // const [RegisterPhoto, setRegisterPhoto] = useState("");
  // const [loginError, setLoginError] = useState("");
  // const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate(); //redirect to another page

  //trigger showNavFooter asap, so nav and footer dont show up in 404
  useEffect(() => {
    setShowNavFooter(false);
  }, []);
  // const toggleLogin = () => {
  //   setOpenLogin(!openLogin);
  //   setOpenRegister(false);
  // };

  // const toggleRegister = () => {
  //   setOpenRegister(!openRegister);
  //   setOpenLogin(false);
  // };

  // //Need to specify the event type
  // const handleLoginUsernameChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setLoginUsername(event.target.value);
  // };

  // const handleLoginPasswordChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setLoginPassword(event.target.value);
  // };

  // //check if username and password are empty, else navigate to home
  // const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   if (!LoginUsername || !LoginPassword) {
  //     setLoginError("Username and password cannot be empty.");
  //   } else {
  //     setLoginError("");
  //     navigate("/home");
  //     setShowNavFooter(true);
  //   }
  // };

  // const handleRergisterUsernameChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRegisterUsername(event.target.value);
  // };

  // const handleRegisterPasswordChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRegisterPassword(event.target.value);
  // };

  // const handleRegisterEmailChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRegisterEmail(event.target.value);
  // };

  // const handleRegisterRegisterChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   //take file
  //   if (event.target.files !== null)
  //     setRegisterPhoto(URL.createObjectURL(event.target.files[0]));
  // };
  // //check if username and password are empty, else navigate to home
  // const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();

  //   if (
  //     !RegisterUsername ||
  //     !RegisterPassword ||
  //     !RegisterEmail ||
  //     !RegisterPhoto
  //   ) {
  //     setRegisterError("Username, password,email and photo cannot be empty.");
  //   } else {
  //     setRegisterError("");
  //     navigate("/home");
  //     setShowNavFooter(true);
  //   }
  // };

  const navigateLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("/login");
  };

  const navigateRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("/register");
  };

  return (
    <div>
      <h4 className="flex flex-row justify-center pt-24 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        Welcome to
      </h4>
      <h1 className="flex flex-row justify-center pt-5 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Linked In
        </span>
      </h1>
      <p className="flex flex-row justify-center text-lg font-normal lg:text-xl dark:text-gray-300">
        Welcome to your professional community
      </p>

      <div className="flex justify-center mt-20">
        <div className="flex justify-center mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* First Section */}
            <div className="flex flex-col justify-between items-center h-full max-w-xs">
              <div>
                <p className="text-xl font-normal text-gray-100 text-center">
                  Discover the best software tools
                </p>
                <p className="text-md font-normal text-gray-100 text-center dark:text-gray-400">
                  Connect with buyers who have first-hand experience to find the
                  best products for you.
                </p>
              </div>
              <button
                onClick={navigateLogin}
                className="mt-4 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 transition-transform transform active:scale-95"
              >
                Login
              </button>
            </div>

            {/* Second Section */}
            <div className="flex flex-col justify-between items-center h-full max-w-xs">
              <div>
                <p className="text-xl font-normal text-gray-100 text-center">
                  Let the appropriate people know that you are available for
                  work
                </p>
                <p className="text-md font-normal text-gray-100 text-center dark:text-gray-400">
                  With Job Availability, you can let recruiters know privately
                  or share publicly with the LinkedIn community that youre
                  looking for new job opportunities.
                </p>
              </div>
              <button
                onClick={navigateRegister}
                className="mt-4 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2 transition-transform transform active:scale-95"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
