/* eslint-disable react/prop-types */
import style from './Table.module.css';
import { UserRoleSelect } from './UserRoleSelect';
import defaultUserImage from '../../assets/userDefaultProfile.svg';
import { useState } from 'react';
import { API_RESPONSE_STATUS } from '../../lib/enums';

export function UserTableRow({ userData }) {
    const [canDelete, setCanDelete] = useState(true);
    let statusText = '';
    let statusStyle = '';

    switch (userData.status) {
        case 1:
            statusText = 'initial';
            statusStyle = 'bg-warning';
            break;
        case 2:
            statusText = 'active';
            statusStyle = 'bg-success';
            break;
        case 3:
            statusText = 'blocked';
            statusStyle = 'bg-danger';
            break;

        default:
            statusText = 'initial';
            statusStyle = 'bg-info';
            break;
    }

    function handleDelete() {
        fetch('http://localhost:5114/api/admin/accounts/' + userData.id, {
            method: 'DELETE',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === API_RESPONSE_STATUS.SUCCESS) {
                    setCanDelete(false);
                }
            })
            .catch(console.error);
    }

    return (
        <tr>
            <td>{userData.id}</td>
            <td>
                <img className={style.profileImage} src={userData.profile_image || defaultUserImage} alt={userData.username} />
            </td>
            <td>{userData.username}</td>
            <td>{userData.email}</td>
            <td>
                <UserRoleSelect userId={userData.id} currentRole={userData.role} />
            </td>
            <td>{userData.registered_at}</td>
            <td>
                <span className={`badge rounded-pill ${statusStyle}`}>{statusText}</span>
            </td>
            <td>
                {canDelete && <button onClick={handleDelete} className='btn btn-danger btn-sm' type='button'>Delete</button>}
            </td>
        </tr>
    )
}