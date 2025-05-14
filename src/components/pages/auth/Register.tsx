import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import Button from "../../Button";
import Input from "../../Input";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";


const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(1, "First name is required")
			.max(50, "First name must be 50 characters or less"),
		lastName: z
			.string()
			.min(1, "Last name is required")
			.max(50, "Last name must be 50 characters or less"),
		email: z.string().email("Invalid email address").min(1, "Email is required"),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(50, "Password must be 50 characters or less")
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
				"Password must contain at least one uppercase letter, one lowercase letter, and one number"
			),
		confirmPassword: z.string().min(1, "Please confirm your password"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<RegisterForm>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	// Validation errors
	const [errors, setErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({});
	// Submission status
	const [isSubmitting, setIsSubmitting] = useState(false);
	// Server-side error
	const [serverError, setServerError] = useState<string | null>(null);

	// Handle input changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error for the field being edited
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

		// Validate form data with Zod
		const result = registerSchema.safeParse(formData);

		if (!result.success) {
			// Map Zod errors to field-specific errors
			const fieldErrors = result.error.flatten().fieldErrors;
			const formattedErrors: Partial<Record<keyof RegisterForm, string>> = {};
			for (const [key, value] of Object.entries(fieldErrors)) {
				formattedErrors[key as keyof RegisterForm] = value?.[0];
			}
			setErrors(formattedErrors);
			setIsSubmitting(false);

			return;
		}
		console.log("Validation success");

		// If validation passes, send data to your API
		try {
			const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"; // Fallback for development
			const { firstName, lastName, email, password } = result.data;
			await axios.post(`${API_URL}/register`, {
				firstName,
				lastName,
				email,
				password,
			}, { headers: {
					'Content-Type': 'application/json',
					'Origin': 'https://mscv2group1.link'
				}});

			// On success, clear form and show success message
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});

			navigate('/login');
		}
		catch (error: any) {
			console.log(error);

			const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
			setServerError(errorMessage);
		}
		finally {
			setIsSubmitting(false);
		}
	};

	return (
		<AuthLayout heading="Register">
			<form onSubmit={handleSubmit} noValidate>
				<Input
					onChange={handleChange}
					name="firstName"
					type="text"
					label="First Name"
					value={formData.firstName}
					error={errors.firstName}
				/>
				<Input
					onChange={handleChange}
					name="lastName"
					type="text"
					label="Last Name"
					value={formData.lastName}
					error={errors.lastName}
				/>
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
				<Input
					onChange={handleChange}
					name="confirmPassword"
					type="password"
					label="Confirm Password"
					value={formData.confirmPassword}
					error={errors.confirmPassword}
				/>
				{serverError && <p className="text-red-500 text-sm">{serverError}</p>}
				<Button
					className="w-full"
					type="submit"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</form>
		</AuthLayout>
	);
}