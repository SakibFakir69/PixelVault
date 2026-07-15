import type { SupabaseClient, User, Session, UserResponse, AuthResponse } from "@supabase/supabase-js";

export interface UpdateUserInput {
  email?: string;
  password?: string;
  fullName?: string;
  avatar?: string;
}

interface ServiceResult<T = undefined> {
  success: boolean;
  message: string;
  data?: T;
}

class UserServices {
    
  async getUser(client: SupabaseClient): Promise<ServiceResult<User>> {
    try {
      const { data, error } = await client.auth.getUser();

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: "User retrieved successfully.",
        data: data.user,
      };
    } catch {
      return { success: false, message: "Internal Server Error" };
    }
  }

  async getSession(client: SupabaseClient): Promise<ServiceResult<Session | null>> {
    try {
      const { data, error } = await client.auth.getSession();

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: "Session retrieved successfully.",
        data: data.session,
      };
    } catch {
      return { success: false, message: "Internal Server Error" };
    }
  }

  async updateUser(
    client: SupabaseClient,
    input: UpdateUserInput
  ): Promise<ServiceResult<User>> {
    try {
      const attributes: {
        email?: string;
        password?: string;
        data?: Record<string, unknown>;
      } = {};

      if (input.email !== undefined) attributes.email = input.email;
      if (input.password !== undefined) attributes.password = input.password;

      const metadata: Record<string, unknown> = {};
      if (input.fullName !== undefined) metadata.full_name = input.fullName;
      if (input.avatar !== undefined) metadata.avatar = input.avatar;
      if (Object.keys(metadata).length > 0) attributes.data = metadata;

      const { data, error } = await client.auth.updateUser(attributes);

      if (error) {
        return { success: false, message: error.message };
      }

      return {
        success: true,
        message: "User updated successfully.",
        data: data.user,
      };
    } catch {
      return { success: false, message: "Internal Server Error" };
    }
  }

  async updatePassword(client: SupabaseClient, password: string): Promise<ServiceResult<User>> {
    return this.updateUser(client, { password });
  }

  async updateProfile(
    client: SupabaseClient,
    fullName: string,
    avatar?: string
  ): Promise<ServiceResult<User>> {
    return this.updateUser(client, { fullName, avatar });
  }

  async refreshSession(client: SupabaseClient): Promise<ServiceResult<Session>> {
    try {
      const { data, error } = await client.auth.refreshSession();

      if (error) {
        return { success: false, message: error.message };
      }

      if (!data.session) {
        return { success: false, message: "No session to refresh." };
      }

      return {
        success: true,
        message: "Session refreshed successfully.",
        data: data.session,
      };
    } catch {
      return { success: false, message: "Internal Server Error" };
    }
  }
}

export const userServices = new UserServices();