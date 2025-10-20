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
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-2xl shadow-xl space-y-8">
                {/* Headline */}
                <div className="text-center space-y-1">
                    <h1 className="text-4xl font-extrabold text-zinc-100 tracking-wide">GainMate</h1>
                    <p className="text-zinc-400 text-sm">Your app to track your fitness progress</p>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                    <div className="bg-zinc-700 p-4 rounded-lg shadow-inner flex items-center justify-between">
                        <span className="text-sm text-zinc-100">Already have an account?</span>
                        <ButtonWithIcon
                            icon="/icon/user/login-icon.png"
                            type="button"
                            onClick={handleGoToLoginButtonClick}
                        />
                    </div>

                    <div className="bg-zinc-700 p-4 rounded-lg shadow-inner flex items-center justify-between">
                        <span className="text-sm text-zinc-100">New here? Register now!</span>
                        <ButtonWithIcon
                            icon="/icon/user/register-icon.png"
                            type="button"
                            onClick={handleGoToRegisterButtonClick}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}
