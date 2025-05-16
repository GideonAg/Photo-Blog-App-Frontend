import { ReactNode } from "react";
// import side from '../../../assets/image.jpg';
import auth_image from '../../../assets/auth.svg';

export default function AuthLayout({ children, heading }: { children:ReactNode, heading:string }) {
    return (
        <>
            <div className="flex flex-row w-full h-screen items-center justify-center">
                <div className="flex w-1/2 bg-gray-300 h-screen">
                    <img src={auth_image} alt="Image" />
                </div>
                <div className="flex flex-col gap-y-5 w-1/2 p-5 justify-center items-center">
                    <div className="w-4/5 flex flex-col gap-y-2">
                        <h1 className='text-center font-semibold'>{heading}</h1>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
