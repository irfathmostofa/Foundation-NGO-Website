import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata("Admin login");

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath =
    params.next && params.next.startsWith("/admin") ? params.next : "/admin";

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-24">
      <Card>
        <CardHeader>
          <CardTitle>Admin login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm nextPath={nextPath} />
        </CardContent>
      </Card>
    </section>
  );
}
