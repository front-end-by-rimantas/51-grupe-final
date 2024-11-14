/* eslint-disable react/prop-types */
import { useState } from "react";
import { ROLE } from "../../lib/enums";

export function UserRoleSelect({ userId, currentRole }) {
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