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
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                {/* Login Card */}
                <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                    <h2 className="text-lg font-semibold text-zinc-100 text-center">Login</h2>

                    <form onSubmit={handleLoginButtonClick} className="space-y-3">
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <div className="flex justify-center pt-2">
                            <ButtonWithIcon icon="/icon/user/login-icon.png" type="submit" />
                        </div>
                    </form>
                </div>

                {/* Registration Redirect */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-zinc-300">Not yet an account?</p>
                    <ButtonWithIcon
                        icon="/icon/user/register-icon.png"
                        type="button"
                        onClick={handleGoToRegisterButtonClick}
                    />
                </div>
            </div>

        </>
    )
}
