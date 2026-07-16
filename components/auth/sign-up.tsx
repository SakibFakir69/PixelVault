"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Zod validation schema
const signUpSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password is too long"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  // Simple live password strength calculations
  const hasMinLength = passwordValue.length >= 6;
  const hasUpper = /[A-Z]/.test(passwordValue);
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);
  
  const strengthScore = [hasMinLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  const onSubmit = async (values: SignUpFormValues) => {
    setStatus({ type: null, message: "" });
    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Something went wrong during sign up.");
      }

      setStatus({
        type: "success",
        message: "Account created successfully! Please check your email inbox to verify your account.",
      });
      
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0817] text-[#F3F1FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-violet-500/30">
      
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] bg-gradient-to-br from-violet-600/20 to-fuchsia-500/20 pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 via-fuchsia-400 to-cyan-400 shadow-md" />
          <span className="font-bold text-2xl tracking-tight">PixelVault</span>
        </div>
        <h2 className="text-center text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-white/40">
          Or{" "}
          <Link href="/auth/sign-in" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white/[0.02] backdrop-blur-xl py-8 px-6 shadow-2xl rounded-2xl border border-white/10 sm:px-10">
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Status Alert Messages */}
            <AnimatePresence mode="wait">
              {status.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-xl border text-sm flex gap-3 items-start ${
                    status.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono tracking-wider text-white/50 uppercase">
                Email Address
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className={`block w-full pl-10 pr-4 py-3 bg-[#110F24] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all ${
                    errors.email 
                      ? "border-rose-500/50 focus:border-rose-500" 
                      : "border-white/10 focus:border-violet-500/50"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-mono tracking-wider text-white/50 uppercase">
                Password
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-10 py-3 bg-[#110F24] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all ${
                    errors.password 
                      ? "border-rose-500/50 focus:border-rose-500" 
                      : "border-white/10 focus:border-violet-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.password.message}
                </p>
              )}

              {/* Password Strength Indicator */}
              {passwordValue.length > 0 && (
                <div className="mt-3 space-y-2 bg-white/[0.01] p-3 rounded-lg border border-white/[0.04]">
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-white/40">
                    <span>STRENGTH INDICATOR</span>
                    <span className={
                      strengthScore <= 1 ? "text-rose-400" : strengthScore <= 3 ? "text-amber-400" : "text-emerald-400"
                    }>
                      {strengthScore <= 1 ? "Weak" : strengthScore <= 3 ? "Medium" : "Strong"}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`rounded-full transition-all duration-300 ${
                          step <= strengthScore
                            ? strengthScore <= 1
                              ? "bg-rose-500"
                              : strengthScore <= 3
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-mono tracking-wider text-white/50 uppercase">
                Confirm Password
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`block w-full pl-10 pr-10 py-3 bg-[#110F24] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all ${
                    errors.confirmPassword 
                      ? "border-rose-500/50 focus:border-rose-500" 
                      : "border-white/10 focus:border-violet-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>

      {/* Footer Security Badge */}
      <div className="mt-8 text-center text-xs text-white/30 flex items-center justify-center gap-1.5 relative z-10">
        <ShieldCheck className="w-4 h-4 text-white/20" />
        <span>SECURE END-TO-END RECIPIENT REGISTRY</span>
      </div>
    </div>
  );
}