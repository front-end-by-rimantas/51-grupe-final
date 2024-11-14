/* eslint-disable react/prop-types */
import { UserTableRow } from './UserTableRow.jsx';

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
                        <UserTableRow key={item.id} userData={item} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}