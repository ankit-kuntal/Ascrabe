import { Users, Package, Truck, IndianRupee, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Users, label: "Total Users", value: "2,458" },
  { icon: Package, label: "Total Requests", value: "8,312" },
  { icon: Truck, label: "Pending Pickups", value: "47" },
  { icon: IndianRupee, label: "Revenue", value: "₹12.4L" },
];

const users = [
  { name: "Rahul Sharma", phone: "9876543210", city: "Delhi", orders: 12, status: "Active" },
  { name: "Priya Patel", phone: "9123456780", city: "Mumbai", orders: 8, status: "Active" },
  { name: "Amit Kumar", phone: "9988776655", city: "Bangalore", orders: 3, status: "Inactive" },
];

const orders = [
  { id: "#ASC-1040", user: "Rahul Sharma", category: "Newspaper", qty: "15 kg", status: "Completed" },
  { id: "#ASC-1041", user: "Priya Patel", category: "Metal", qty: "7 kg", status: "Pickup Scheduled" },
  { id: "#ASC-1042", user: "Amit Kumar", category: "Plastic", qty: "20 kg", status: "Requested" },
  { id: "#ASC-1043", user: "Rahul Sharma", category: "Electronics", qty: "4 kg", status: "Completed" },
];

const statusColor: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  "Pickup Scheduled": "bg-info/10 text-info",
  Requested: "bg-warning/10 text-warning",
  Active: "bg-success/10 text-success",
  Inactive: "bg-muted text-muted-foreground",
};

const Admin = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container py-8">
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
          <TrendingUp className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage users, orders, and platform analytics</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="text-xl font-bold text-foreground">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders table */}
      <h2 className="text-lg font-semibold text-foreground mb-3">Scrap Requests</h2>
      <div className="rounded-xl border bg-card shadow-card overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Quantity</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{o.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.user}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.qty}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users table */}
      <h2 className="text-lg font-semibold text-foreground mb-3">Users</h2>
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phone</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">City</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Orders</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.phone} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.orders}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[u.status]}`}>{u.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Admin;
