import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout, updateUsernameFromUser, deleteUserFromProfile, updatePasswordFromUser } from "../utils/Auth";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import DashboardBar from "../components/dashboard/DashboardBar";
import ProfileMain from "../components/dashboard/profile/ProfileMain";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import Loading from "../components/loading/Loading";
// import ProfileUsernameModal from "../components/dashboard/profile/ProfileUsernameModal";
// import ProfileDeleteUserModal from "../components/dashboard/profile/ProfileDeleteUserModal";
// import ProfilePasswordModal from "../components/dashboard/profile/ProfilePasswordModal";
// import ProfileEditDetailsModal from "../components/dashboard/profile/ProfileEditDetailsModal";

function Profile() {
    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState("");
    const [usernameModal, setUsernameModal] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordModal, setPasswordModal] = useState(false);
    const [deleteUserModal, setDeleteUserModal] = useState(false);

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/login");
    }, [user, loading, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toogleUsernameModal = () => {
        setUsernameModal(!usernameModal);
    };

    const toogleDeleteUserModal = () => {
        setDeleteUserModal(!deleteUserModal);
    };

    const tooglePasswordModal = () => {
        setPasswordModal(!passwordModal);
    };

    const handleEmailUpdate = () => {
        console.log(email);
        try {
            updateEmailFromUser(email)
                .then(() => {
                    toogleEmailModal();
                    MySwal.fire({
                        title: "Email Updated",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        } catch (err) {
            MySwal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    const handleDeleteUser = () => {
        try {
            deleteUserFromProfile()
                .then(() => {
                    toogleDeleteUserModal();
                    MySwal.fire({
                        title: "Account Deleted",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/login");
                })
                .catch((err) => {
                    MySwal.fire({
                        title: "Error",
                        text: err.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        } catch (err) {
            MySwal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    const handlePasswordUpdate = () => {
        try {
            updatePasswordFromUser(password)
                .then(() => {
                    tooglePasswordModal();
                    MySwal.fire({
                        title: "Password Updated",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch((err) => {
                    MySwal.fire({
                        title: "Error",
                        text: err.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        } catch (err) {
            MySwal.fire({
                title: "Error",
                text: err.message,
                icon: "error",
                showConfirmButton: false,
                timer: 1500
            })
        }
    };

    return (
        <>
            {user ?
                <>
                    <DashboardBar logout={handleLogout} user={user} page="Profile" />
                    <ProfileMain user={user} toogleEmailModal={toogleEmailModal} toogleDeleteUserModal={toogleDeleteUserModal} tooglePasswordModal={tooglePasswordModal} />
                    <DashboardFooter />
                </>
                :
                <Loading />
            }
            {usernameModal ?
                <>
                    <ProfileUsernameModal toogleUsernameModal={toogleUsernameModal} handleEmailUpdate={handleUsernameUpdate} setEmail={setUsername} username={username} />
                </>
                :
                null
            }
            {passwordModal ?
                <>
                    <ProfilePasswordModal tooglePasswordModal={tooglePasswordModal} handlePasswordUpdate={handlePasswordUpdate} setPassword={setPassword} password={password} />
                </>
                :
                null
            }

        </>
    );
}

export default Profile;