import {FormEvent, useState} from "react";
import ButtonWithIcon from "../components/ButtonWithIcon.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    fetchUser: () => void;
}

export default function LoginPage({fetchUser}: LoginPageProps) {

    const navigate = useNavigate()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    // button handler
    const handleLoginButtonClick = (event: FormEvent) => {
        event.preventDefault()
        axios.post("/api/auth/login", {}, {
            auth: {
                username: username,
                password: password
            }
            })
            .then(() => {
                fetchUser();
                navigate("/welcome");
            })
            .catch(() => {
                console.error("Invalid credentials")
            })
    }

    const handleGoToRegisterButtonClick = () => {
        navigate("/register")
    }

    return (
        <>
            <h2>Login</h2>
            <div>
                <form onSubmit={handleLoginButtonClick}>
                    <input
                        id={"username"}
                        type={"text"}
                        placeholder={"Username"}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <input
                        id={"password"}
                        type={"password"}
                        placeholder={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <ButtonWithIcon icon={"login"} type={"submit"} />
                </form>
                <div>
                    <h3>No account yet?</h3>
                    <ButtonWithIcon icon={"register"} type={"button"} onClick={handleGoToRegisterButtonClick} />
                </div>
            </div>
        </>
    )
}
