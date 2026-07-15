import { supabaseConfig } from "@/lib/supabase/supabase";

interface IAuthServices {
  email: string;
  password: string;
  otp?: string | number;
}

class AuthServices {
  private email: string;
  private password: string;
  private otp?: string | number;

  constructor({ email, password, otp }: IAuthServices) {
    this.email = email;
    this.password = password;
    this.otp = otp;
  }

  async signUp() {
    const { data, error } = await supabaseConfig.auth.signUp({
      email: this.email,
      password: this.password,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Account created successfully.",
      data,
    };
  }

  async signIn() {
    const { data, error } =
      await supabaseConfig.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Login successful.",
      data,
    };
  }

  async signOut() {
    const { error } = await supabaseConfig.auth.signOut();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Logged out successfully.",
    };
  }

  async sendResetPasswordEmail() {
    const { error } = await supabaseConfig.auth.resetPasswordForEmail(
      this.email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Password reset email sent.",
    };
  }

  async updatePassword(newPassword: string) {
    const { data, error } = await supabaseConfig.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Password updated successfully.",
      data,
    };
  }
}

export default AuthServices;