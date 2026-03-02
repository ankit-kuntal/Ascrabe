import { Package, Truck, IndianRupee, Clock, CheckCircle2, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { icon: Package, label: "Total Scrap Sold", value: "127 kg", color: "text-primary" },
  { icon: Clock, label: "Pending Pickups", value: "3", color: "text-warning" },
  { icon: IndianRupee, label: "Total Earnings", value: "₹4,520", color: "text-success" },
];

const orders = [
  { id: "#ASC-1042", category: "Newspaper", qty: "12 kg", status: "Completed", date: "28 Feb 2026", statusColor: "bg-success/10 text-success" },
  { id: "#ASC-1043", category: "Electronics", qty: "3 kg", status: "Pickup Scheduled", date: "02 Mar 2026", statusColor: "bg-info/10 text-info" },
  { id: "#ASC-1044", category: "Plastic", qty: "8 kg", status: "Requested", date: "02 Mar 2026", statusColor: "bg-warning/10 text-warning" },
  { id: "#ASC-1045", category: "Metal", qty: "5 kg", status: "Completed", date: "25 Feb 2026", statusColor: "bg-success/10 text-success" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back! Here&apos;s your scrap selling summary.</p>
        </div>
        <Link to="/sell">
          <Button className="gap-2"><Package className="h-4 w-4" /> Sell Scrap</Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <div className="text-xl font-bold text-foreground">{s.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order status cards */}
      <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
      <div className="rounded-xl border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Order ID</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Quantity</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{o.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.qty}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${o.statusColor}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tracking preview */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Order Tracking — #ASC-1043</h2>
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex flex-col gap-0">
            {[
              { label: "Request Placed", done: true },
              { label: "Pickup Assigned", done: true },
              { label: "Pickup Completed", done: false },
              { label: "Payment Done", done: false },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {step.done ? (
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  ) : (
                    <CircleDot className="h-6 w-6 text-muted-foreground/40" />
                  )}
                  {i < arr.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[28px] ${step.done ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
                <div className="pb-6">
                  <div className={`font-medium ${step.done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</div>
                  <div className="text-xs text-muted-foreground">{step.done ? "Completed" : "Pending"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

export default Dashboard;
