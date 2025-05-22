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
            <div className="text-3xl font-semibold text-zinc-300 px-4 pt-4 pb-2">
                <h2>Welcome</h2>
                <h2>to</h2>
                <h2>GainMate</h2>
            </div>
            <br></br>
            <p>Your App to track your fitness progress</p>
            <br></br>
            <div className="mt-5 flex justify-center gap-4">
                <h3>Already register?</h3>
                <ButtonWithIcon icon={"/login-icon.png"} type={"button"} onClick={handleGoToLoginButtonClick} />
            </div>
            <br></br>
            <div className="mt-5 flex justify-center gap-4">
                <h3>Let's go to Register</h3>
                <ButtonWithIcon icon={"/register-icon.png"} type={"button"} onClick={handleGoToRegisterButtonClick} />
            </div>
        </>
    )
}
