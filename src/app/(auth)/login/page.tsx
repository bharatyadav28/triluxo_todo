"use client";

import { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

import { auth } from "../../firebase/config";
import AuthForm from "@/components/AuthForm";
import { errorToast } from "@/helpers/toasts";

const Login = () => {
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      return router.push("/");
    }
  }, [user]);

  if (error) {
    errorToast(error.message);
  }

  const handleLogin = async (submittedData: any) => {
    const { email, password } = submittedData;

    await signInWithEmailAndPassword(email, password);
  };

  return (
    <>
      <AuthForm onSubmition={handleLogin} typeForm="login" loading={loading} />
    </>
  );
};

export default Login;
