/* eslint-disable react/prop-types */
import { ROLE } from '../../lib/enums.js';
import style from './Table.module.css';
import defaultUserImage from '../../assets/userDefaultProfile.svg';
import { useState } from 'react';

function Select({ userId, currentRole }) {
    const [newRole, setNewRole] = useState(currentRole);

    function handleChange(e) {
        setNewRole(e.target.value);

        fetch('http://localhost:5114/api/admin/change-account-role', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                userId: userId,
                newRole: e.target.value
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(console.error);
    }

    return (
        <select name="role" value={newRole} onChange={handleChange}>
            {Object
                .values(ROLE)
                .filter(role => role !== ROLE.PUBLIC)
                .map(role =>
                    <option key={role} value={role}>{role}</option>
                )}
        </select>
    )
}

export function UserTable({ data }) {
    return (
        <div className="table-responsive small">
            <table className="table table-striped table-md">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nuotrauka</th>
                        <th scope="col">Vardas</th>
                        <th scope="col">El. paštas</th>
                        <th scope="col">Rolė</th>
                        <th scope="col">Registracijos data</th>
                        <th scope="col">Statusas</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <img className={style.profileImage} src={item.profile_image || defaultUserImage} alt={item.username} />
                            </td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                <Select userId={item.id} currentRole={item.role} />
                            </td>
                            <td>{item.registered_at}</td>
                            <td>{item.status}</td>
                            <td>
                                <button className='btn btn-danger btn-sm' type='button'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}