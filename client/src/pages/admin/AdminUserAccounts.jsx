import { useEffect, useState } from "react";
import { PageTitle } from "../../components/admin/PageTitle";
import { UserTable } from "../../components/admin/UserTable";

export function AdminUserAccounts() {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5114/api/admin/accounts/users', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setTableData(data.list);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <PageTitle title="Visos vartotojų paskyros" />
            <UserTable data={tableData} />
        </>
    );
}