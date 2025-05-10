import Button from "../../Button";
import Input from "../../Input";
import AuthLayout from "./AuthLayout";

export default function Login() {
    return (
        <>
            <AuthLayout heading="Login">
                <form action="">
                    <Input name={"email"} type={"email"} label="Email"></Input>
                    <Input name={"password"} type={"password"} label="Password"></Input>
                    <Button className="w-full" variant="primary" type="submit" disabled>Submit</Button>
                </form>
            </AuthLayout>
        </>
    )
}
