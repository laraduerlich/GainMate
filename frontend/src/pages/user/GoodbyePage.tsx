import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

export default function GoodbyePage() {

    const navigate = useNavigate()

    const handleGoToRegisterButton = () => {
        navigate("/register")
    }

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Goodbye!
            </h2>
            <h3>😭</h3>
            <div className="mt-5 flex justify-center gap-4">
                <h3>Want to join us again?</h3>
                <ButtonWithIcon icon={"/register-icon.png"} type={"button"} onClick={handleGoToRegisterButton} />
            </div>
        </>
    )
}
