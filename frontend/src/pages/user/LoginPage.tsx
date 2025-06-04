import {FormEvent, useState} from "react";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
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
                return fetchUser()
            })
            .then(() => {
                setTimeout(() => { // minimum delay so that React can take over the state
                    navigate("/welcome");
                }, 300);
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
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Login
            </h2>
            <div>
                <form onSubmit={handleLoginButtonClick}>
                    <input
                        id={"username"}
                        type={"text"}
                        placeholder={"Username"}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                    <input
                        id={"password"}
                        type={"password"}
                        placeholder={"password"}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                    <div className="mt-5 flex justify-center gap-4">
                        <ButtonWithIcon icon={"/login-icon.png"} type={"submit"} />
                    </div>
                </form>
                <div className="mt-5 flex justify-center gap-4">
                    <h3>No account yet?</h3>
                    <ButtonWithIcon icon={"/register-icon.png"} type={"button"} onClick={handleGoToRegisterButtonClick} />
                </div>
            </div>
        </>
    )
}
