import { supabaseConfig } from "@/lib/supabase/supabase";


interface IUserServices {
    email?: string;
    password?: string;
    otp?: string | number;
    getUsers: () => void;
}

class UserServceis {


    async getUser() {
        try {

            const { data, error } = await supabaseConfig.auth.getUser();



            if (error) {
                return {
                    success: false,
                    message: error.message,
                };
            }

            return {
                success: true,
                message: "User data retrieve successfully.",
                data,
            };

        } catch (error) {


        }
    }






}