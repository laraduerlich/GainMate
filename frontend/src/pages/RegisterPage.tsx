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
                <h2>Bitte register</h2>
                <form onSubmit={handleRegisterButtonClick}>
                    <input
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        placeholder={"Name..."}
                        onChange={handleChange}
                    />
                    <input
                        id={"username"}
                        name={"username"}
                        type={"text"}
                        placeholder={"Username..."}
                        onChange={handleChange}
                    />
                    <input
                        id={"password"}
                        name={"password"}
                        type={"password"}
                        placeholder={"Password..."}
                        onChange={handleChange}
                    />
                    <ButtonWithIcon icon={"register"} type={"submit"} />
                </form>
            </div>
            <div>
                <h3>Already register?</h3>
                <ButtonWithIcon icon={"Go to Login"} type={"button"} onClick={handleGoToLoginButton} />
            </div>
        </>
    )
}
