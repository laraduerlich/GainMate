import {FormEvent, useState} from "react";
import {AppUser} from "../types/AppUser.tsx";
import ButtonWithIcon from "../components/ButtonWithIcon.tsx";
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

        axios.post("/api/auth/register", newAppUser)
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
            <div>
                <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                    Start your fitness journey 🚀
                </h2>
                <form onSubmit={handleRegisterButtonClick}>
                    <input
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        placeholder={"Name..."}
                        onChange={handleChange}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                    <input
                        id={"username"}
                        name={"username"}
                        type={"text"}
                        placeholder={"Username..."}
                        onChange={handleChange}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                    <input
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Password..."}
                        onChange={handleChange}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                    <div className="mt-5 flex justify-center gap-4">
                        <ButtonWithIcon icon={"/add-icon.png"} type={"submit"} />
                    </div>
                </form>
            </div>
            <div className="mt-5 flex justify-center gap-4">
                <h3>Already register?</h3>
                <ButtonWithIcon icon={"/login-icon.png"} type={"button"} onClick={handleGoToLoginButton} />
            </div>
        </>
    )
}
