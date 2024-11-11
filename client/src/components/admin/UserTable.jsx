/* eslint-disable react/prop-types */
export function UserTable({ data }) {
    return (
        <div className="table-responsive small">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Vardas</th>
                        <th scope="col">Amžius</th>
                        <th scope="col">Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>EDIT + DELETE</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}