import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import style from './UserProfile.module.css';

export function UserProfile() {
    const { role, email, registeredAt, profileImage, updateProfileImage } = useContext(UserContext);
    const [image, setImage] = useState(profileImage);

    function handleImageUpdate(e) {
        const formData = new FormData();
        formData.append('user_profile_image', e.target.files[0]);

        fetch('http://localhost:5114/api/upload/profile', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setImage(data.path);
                    updateProfileImage(data.path);
                }
            })
            .catch(console.error);
    }

    return (
        <main>
            <div className="container px-4">
                <div className="row align-items-center mb-5">
                    <h1>Vartotojo profilis</h1>
                </div>
                <div className="row g-lg-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <img className={style.profileImage} src={image} alt="User" />
                        <form>
                            <input onChange={handleImageUpdate} type="file" />
                        </form>
                    </div>
                </div>
                <div className="row g-lg-5">
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <p className="fw-bold">Rolė</p>
                        <p>{role}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <p className="fw-bold">El. paštas</p>
                        <p>{email}</p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 mb-3">
                        <p className="fw-bold">Registracijos data</p>
                        <p>{registeredAt}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}