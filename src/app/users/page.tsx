import { UserList } from "@/components/user-list";

export default function ListUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-teal-500 text-center mb-4">User list</h1>
      <UserList />
    </div>
  );
}
