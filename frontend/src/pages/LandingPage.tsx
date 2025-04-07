import ButtonWithIcon from "../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

export default function LandingPage() {

    const navigate = useNavigate()

    // button handler
    const handleGoToRegisterButtonClick = () => {
        navigate("/register")
    }

    const handleGoToLoginButtonClick = () => {
        navigate("/login")
    }

    return (
        <>
            <h2>Welcome to GainMate!</h2>
            <div>
                <h3>Let`s go to Login</h3>
                <ButtonWithIcon icon={"Login"} type={"button"} onClick={handleGoToLoginButtonClick} />
            </div>
            <div>
                <h3>Let's go to Register</h3>
                <ButtonWithIcon icon={"Register"} type={"button"} onClick={handleGoToRegisterButtonClick} />
            </div>
        </>
    )
}
