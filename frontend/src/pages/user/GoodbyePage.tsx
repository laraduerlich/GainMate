import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

export default function GoodbyePage() {

    const navigate = useNavigate()

    const handleGoToRegisterButton = () => {
        navigate("/register")
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6 text-center">
                <div className="bg-zinc-700 rounded-lg p-6 shadow-inner space-y-4">
                    <h2 className="text-xl font-bold text-zinc-100">Goodbye!</h2>
                    <h3 className="text-3xl">😭</h3>
                    <p className="text-zinc-300 text-sm">We’re sad to see you go.</p>
                </div>

                <div className="flex justify-center items-center gap-4">
                    <h3 className="text-zinc-200 text-sm">Want to join us again?</h3>
                    <ButtonWithIcon
                        icon="/icon/user/register-icon.png"
                        type="button"
                        onClick={handleGoToRegisterButton}
                    />
                </div>
            </div>
        </>
    )
}
