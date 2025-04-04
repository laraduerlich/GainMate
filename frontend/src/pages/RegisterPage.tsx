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

    return (
        <>
            <div>
                <form onSubmit={handleRegisterButtonClick}>
                    <input
                        id={"name"}
                        type={"text"}
                        placeholder={"Name..."}
                        value={newAppUser.name}
                        onChange={handleChange}
                    />
                    <input
                        id={"username"}
                        type={"text"}
                        placeholder={"Username..."}
                        value={newAppUser.username}
                        onChange={handleChange}
                    />
                    <input
                        id={"password"}
                        type={"password"}
                        placeholder={"Password..."}
                        value={newAppUser.password}
                        onChange={handleChange}
                    />
                    <ButtonWithIcon icon={"register"} type={"submit"} />
                </form>
            </div>
        </>
    )
}
