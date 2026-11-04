import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireStaff } from "@/lib/auth";

export default async function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireStaff();

  return (
    <div className="flex min-h-full flex-1">
      <AdminSidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col bg-muted/30">
        <div className="flex-1 p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
