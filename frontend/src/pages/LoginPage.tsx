import {useState} from "react";
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
    const handleLoginButtonClick = () => {
        axios.post("api/auth/login", {}, {
            auth: {
                username: username,
                password: password
            }
            })
            .then(() => {
                navigate("/welcome");
                fetchUser();
            })
            .catch(() => {
                console.error("Invalid credentials")
            })
    }

    return (
        <>
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
            </div>
        </>
    )
}
