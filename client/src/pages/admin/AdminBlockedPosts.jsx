import { PageTitle } from "../../components/admin/PageTitle";
import { UserTable } from "../../components/admin/UserTable";

export function AdminBlockedPosts() {
    const tableData = [
        { id: 1, name: 'Jonas', age: 99 },
        { id: 2, name: 'Maryte', age: 88 },
        { id: 3, name: 'Petras', age: 77 },
        { id: 4, name: 'Ona', age: 66 },
    ];

    return (
        <>
            <PageTitle title="Visos blokuotos žinutės" />
            <UserTable data={tableData} />
        </>
    );
}