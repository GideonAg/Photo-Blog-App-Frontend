import { z } from "zod";
import Button from "../../Button";
import Input from "../../Input";
import AuthLayout from "./AuthLayout";
import { useState } from "react";
import axios from "axios";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must be 50 characters or less"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {

    // Form state
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });


    const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: undefined,
        }));
        setServerError(null);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setServerError(null);


        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            const formattedErrors: Partial<Record<keyof LoginForm, string>> = {};
            for (const [key, value] of Object.entries(fieldErrors)) {
                formattedErrors[key as keyof LoginForm] = value?.[0];
            }
            setErrors(formattedErrors);
            setIsSubmitting(false);
            return;
        }


        try {
            const { email, password } = result.data;

            // Axios config with headers
            // const config = {
            //     headers: {
            //     "Content-Type": "application/json",
            //     "Origin": "http://localhost:5173",
            //     },
            // };

            const api_link = import.meta.env.VITE_API_URL;
            const response = await axios.post(api_link, { email, password, });

            if(response.data.status === "success") {
                // store the id token
                sessionStorage.setItem("idToken", response.data.idToken)
            }
            else {
                
            }
            
            setFormData({
                email: "",
                password: "",
            });
        } 
        catch (error: any) {
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Login failed. Please try again.";
            setServerError(errorMessage);
        } 
        finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <AuthLayout heading="Login">
            <div className="">
                <form onSubmit={handleSubmit} noValidate>
                    <Input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        label="Email"
                        value={formData.email}
                        error={errors.email}
                    />
                    <Input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        label="Password"
                        value={formData.password}
                        error={errors.password}
                    />
                    {serverError && <p className="text-red-500 text-sm">{serverError}</p>}
                    <Button
                        className="w-full"
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </div>
        </AuthLayout>
  );
}
