import Link from "next/link";
import { useSignOut } from "react-firebase-hooks/auth";

import { auth } from "@/app/firebase/config";
import { TodoContext } from "@/store/TodoContext";
import { useContext } from "react";

interface propsType {
  userId: string | undefined;
  email: string | undefined | null;
}

const NavOption: React.FC<propsType> = ({ userId, email }) => {
  const [signOut, loading, error] = useSignOut(auth);
  const { getTodos } = useContext(TodoContext);

  const handleLogout = async () => {
    const success = await signOut();
    if (userId) {
      getTodos(userId);
    }
  };

  const isLoggedIn = userId ? true : false;

  return (
    <div className="flex justify-end mt-5 mr-7">
      {isLoggedIn ? (
        <p className="text-white  text-lg italic mt-2 pb-1  mr-5">
          Hi {email},
        </p>
      ) : (
        ""
      )}
      {!isLoggedIn && (
        <Link href="/login" className="logged">
          Login
        </Link>
      )}

      {isLoggedIn && (
        <button className="logged" onClick={handleLogout}>
          {true ? "Logout" : "Logging out.."}
        </button>
      )}
    </div>
  );
};

export default NavOption;
