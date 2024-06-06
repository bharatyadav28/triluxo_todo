"use client";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect } from "react";

import AuthForm from "@/components/AuthForm";
import { errorToast } from "@/helpers/toasts";
import { auth } from "../../firebase/config";

const Signup = () => {
  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  }, [user]);

  if (error) {
    errorToast(error.message);
  }

  const handleSignup = async (submittedData: any) => {
    const { email, password } = submittedData;
    const res = await createUserWithEmailAndPassword(email, password);
  };

  return (
    <AuthForm onSubmition={handleSignup} typeForm="signup" loading={loading} />
  );
};

export default Signup;
