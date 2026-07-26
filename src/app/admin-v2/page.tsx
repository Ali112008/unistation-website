import AdminPanel from "@/components/AdminPanel";

export const metadata = {
  title: "UniStation Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminPanel />;
}
