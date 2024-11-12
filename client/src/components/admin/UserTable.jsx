/* eslint-disable react/prop-types */
import style from './Table.module.css';
import defaultUserImage from '../../assets/userDefaultProfile.svg';

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
                            <td>{item.role}</td>
                            <td>{item.registered_at}</td>
                            <td>EDIT + DELETE</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}