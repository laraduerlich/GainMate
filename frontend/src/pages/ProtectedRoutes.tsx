import {AppUser} from "../types/AppUser.tsx";
import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    appUser: AppUser | undefined | null
}

export default function ProtectedRoutes({appUser}: ProtectedRoutesProps){

    if (appUser === undefined) {
        return <div>Loading ...</div>
    }

    return appUser ? <Outlet/> : <Navigate to="/"/>
}
