import { UserContext } from "../App";
import AnimationWrapper from "../common/page-animation";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {
  const {
    userAuth: { username, isAdmin },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ access_token: null });
  };

  return (
    <AnimationWrapper
      transition={{ duration: 0.2 }}
      className="absolute right-0 z-50"
    >
      <div
        className="absolute bg-white right-0 border border-grey w-60
     duration-200"
      >
        {isAdmin ? (
          <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
            <i className="fi fi-rr-edit"></i>
            <span>Write</span>
          </Link>
        ) : ""}

        <Link to={`/user/${username}`} className=" link pl-8 py-4">
          Profile
        </Link>
        <Link to="/dashboard/blogs" className=" link pl-8 py-4">
          Dashboard
        </Link>
        <Link to="/settings/edit-profile" className=" link pl-8 py-4">
          Settings
        </Link>
        <span className="absolute border-t border-grey w-[100%]"></span>
        <button
          className="text-left w-full pl-8 py-4 p-4 hover:bg-grey"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-gray">@{username}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
