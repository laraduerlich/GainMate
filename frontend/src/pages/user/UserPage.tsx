import {AppUser, AppUserDTO} from "../../types/AppUser.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

type UserPageProps = {
    appUser: AppUser | undefined | null
    fetchUser: () => void
    logout: () => void
}

export default function UserPage({appUser, fetchUser,logout}:UserPageProps) {

    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [editAppUser, setEditAppUser] = useState<AppUser>(appUser ? appUser : {username: "", password: "", name: ""})

    const handleChange = (event: any) => {
        setEditAppUser({
            ...editAppUser,
            // key (name) of the input is dynamically set
            [event.target.name]: event.target.value,
        })
    }

    // button handler
    const handleDeleteButtonClick = () => {
        axios.delete("/api/account")
            .then(() => {
                logout()
                navigate("/goodbye")})
            .catch(error => {
                console.error("Error delete User: " + error)
            })
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleSaveButtonClick = (event: any) => {
        event.preventDefault()

        const dto: AppUserDTO = {
            username: editAppUser.username,
            name: editAppUser.name,
            password: editAppUser.password
        }

        axios.put("/api/account/update", dto)
            .then(() => {
                fetchUser()
            })
        setIsEditing(false)
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Account from {appUser?.name}
            </h2>
            {isEditing ? (
                <form onSubmit={handleSaveButtonClick}>
                    <div>
                        <input
                            id={"name"}
                            name={"name"}
                            type={"text"}
                            value={editAppUser.name}
                            onChange={handleChange}
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                        />
                        <input
                            id={"username"}
                            name={"username"}
                            type={"text"}
                            value={editAppUser.username}
                            onChange={handleChange}
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                        />
                        <input
                            id={"password"}
                            name={"password"}
                            type={"text"}
                            value={editAppUser.password}
                            onChange={handleChange}
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                        />
                    </div>
                    <div className="mt-5 flex justify-center gap-4">
                        <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={() => setIsEditing(false)} />
                        <ButtonWithIcon icon={"/save-icon.png"} type={"submit"} />
                    </div>
                </form>
            ) : (
                <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                    {/* Info Card */}
                    <div className="bg-zinc-700 rounded-lg p-4 shadow-inner">
                        <h3 className="text-zinc-100 text-sm font-semibold mb-3">Your Statistics</h3>
                        <table className="w-full text-sm text-left text-zinc-200">
                            <tbody>
                            <tr className="border-b border-zinc-600">
                                <td className="py-2">Saved Exercises</td>
                                <td className="py-2 text-right font-medium">
                                    {appUser?.exerciseIdList?.length ?? 0}
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2">Saved Workouts</td>
                                <td className="py-2 text-right font-medium">
                                    {appUser?.workoutIdList?.length ?? 0}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4">
                        <ButtonWithIcon
                            icon="/edit-icon.png"
                            type="button"
                            onClick={handleEditButtonClick}
                        />
                        <ButtonWithIcon
                            icon="/delete-icon.png"
                            type="button"
                            onClick={() => setShowConfirm(true)}
                        />
                    </div>
                </div>
            )}

            {/* safety check for delete*/}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-zinc-800 bg-opacity-50 p-4">
                    <div className="bg-zinc-700 rounded-2xl w-full sm:w-96 p-6 shadow-xl">
                        <p className="text-lg font-medium text-white">
                            Are you sure you want to delete your account?
                        </p>
                        <div className="mt-6 flex justify-center gap-2">
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    handleDeleteButtonClick()
                                }}
                                className="px-4 py-3 bg-zinc-400 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                                Yes, please delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-3 bg-zinc-400 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
