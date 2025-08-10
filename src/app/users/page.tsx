import { UserList } from "@/components/user-list";

export default function ListUsersPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-card/50 border border-border rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-teal-500 mb-4 sm:mb-6 md:mb-8">User List</h1>
        <p className="text-center text-muted-foreground">Manage and view user information</p>
        <div className="border-t border-border pt-4 sm:pt-6">
          <UserList />
        </div>
      </div>
    </div>
  );
}
