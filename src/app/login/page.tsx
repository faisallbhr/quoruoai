"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { login } from "@/store/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z.string().nonempty({ message: "Password is required" }),
});

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(login());
    router.push("/");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="max-w-xl w-full rounded-md p-8">
        <h1 className="font-bold text-3xl text-center">Let's Authenticate!</h1>
        <h3 className="text-sm pt-2 pb-8 text-center">
          Start your session by providing valid credentials
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="johndoe@mail.com"
            register={register}
            error={errors.email?.message}
          />
          <FormInput
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            register={register}
            error={errors.password?.message}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full font-semibold">
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
        {/* <p className="text-sm pt-8 text-center">
          Don not have any account yet?{" "}
          <Link
            href="/register"
            prefetch={false}
            className="underline text-blue-500">
            Come join us!
          </Link>
        </p> */}
        <p className="text-sm pt-8 text-center">
          This is just to implement the login process, use fake credentials
        </p>
      </div>
    </div>
  );
};

export default Login;
