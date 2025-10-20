import {FormEvent, useState} from "react";
import {AppUser} from "../../types/AppUser.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate()
    const [newAppUser, setNewAppUser] = useState<AppUser>({
        username: "",
        password: "",
        name: "",
    })

    const handleChange = (event: any) => {
        setNewAppUser({
            ...newAppUser,
            // key (name) of the input is dynamically set
            [event.target.name]: event.target.value,
        })
    }

    const handleRegisterButtonClick = (event: FormEvent) => {
        event.preventDefault()

        axios.post("/api/account/register", newAppUser)
            .then(() =>
                navigate("/login")
            )
            .catch(error => {
                console.error("User could not register", error)
            })
    }

    const handleGoToLoginButton = () => {
        navigate("/login")
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                {/* Login Card */}
                <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                    <h2 className="text-lg font-semibold text-zinc-100 text-center">
                        Start your fitness journey 🚀
                    </h2>

                    <form onSubmit={handleRegisterButtonClick} className="space-y-3">
                        <input
                            id={"name"}
                            name={"name"}
                            type={"text"}
                            placeholder={"Name..."}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            id={"username"}
                            name={"username"}
                            type={"text"}
                            placeholder={"Username..."}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Password..."}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex justify-center pt-2">
                            <ButtonWithIcon icon={"/add-icon.png"} type={"submit"} />
                        </div>
                    </form>
                </div>

                {/* Login Redirect */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-zinc-300">Already an account?</p>
                    <ButtonWithIcon
                        icon={"/icon/user/login-icon.png"}
                        type={"button"}
                        onClick={handleGoToLoginButton}
                    />
                </div>
            </div>
        </>
    )
}
