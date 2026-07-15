import type { SupabaseClient, EmailOtpType, User, Session } from "@supabase/supabase-js";

interface AuthResult<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

type AuthData = { user: User | null; session: Session | null };
type UserData = { user: User | null };

class AuthServices {
  async signUp(client: SupabaseClient, email: string, password: string): 
  Promise<AuthResult<AuthData>> {
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Account created successfully.", data };
  }

  async signIn(client: SupabaseClient, email: string, password: string): Promise<AuthResult<AuthData>> {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Login successful.", data };
  }

  async signOut(client: SupabaseClient): Promise<AuthResult> {
    const { error } = await client.auth.signOut();
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Logged out successfully." };
  }

  async sendResetPasswordEmail(client: SupabaseClient, email: string, redirectTo: string): Promise<AuthResult> {
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Password reset email sent." };
  }

  async updatePassword(client: SupabaseClient, newPassword: string): Promise<AuthResult<UserData>> {
    const { data, error } = await client.auth.updateUser({ password: newPassword });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "Password updated successfully.", data };
  }

  async verifyOtp(client: SupabaseClient, email: string, token: string, type: EmailOtpType = "email"): Promise<AuthResult<AuthData>> {
    const { data, error } = await client.auth.verifyOtp({ email, token, type });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "OTP verified successfully.", data };
  }

  async resendOtp(client: SupabaseClient, email: string, type: "signup" | "email_change" = "signup"): Promise<AuthResult<AuthData>> {
    const { data, error } = await client.auth.resend({ type, email });
    if (error) return { success: false, message: error.message };
    return { success: true, message: "OTP resent successfully.", data };
  }

  async getUser(client: SupabaseClient): Promise<AuthResult<UserData>> {
    const { data, error } = await client.auth.getUser();
    if (error) return { success: false, message: error.message };
    return { success: true, message: "User fetched.", data };
  }
}

export default new AuthServices();