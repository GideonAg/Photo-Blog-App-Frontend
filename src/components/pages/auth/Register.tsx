import Button from "../../Button";
import Input from "../../Input";
import AuthLayout from "./AuthLayout";

export default function Register() {
    return (
        <>
            <AuthLayout heading="Register">
                <form action="">
                    <Input name={"firstName"} type={"text"} label="First Name"></Input>
                    <Input name={"lastName"} type={"text"} label="Last Name"></Input>
                    <Input name={"email"} type={"email"} label="Email"></Input>
                    <Input name={"password"} type={"password"} label="Password"></Input>
                    <Input name={"confirm_password"} type={"password"} label="Confirm Password"></Input>
                    <Button className="w-full" type="submit" disabled>Submit</Button>
                </form>
            </AuthLayout>
        </>
    )
}
