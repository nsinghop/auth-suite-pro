import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RTooltip } from "recharts";

const data = [
  { name: "Mon", users: 24, reports: 12 },
  { name: "Tue", users: 30, reports: 18 },
  { name: "Wed", users: 28, reports: 15 },
  { name: "Thu", users: 35, reports: 20 },
  { name: "Fri", users: 40, reports: 22 },
  { name: "Sat", users: 18, reports: 8 },
  { name: "Sun", users: 22, reports: 10 },
];

const Dashboard = () => {
  useEffect(() => {
    document.title = "Admin Portal – Dashboard";
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold text-heading">Overview</h1>
        <p className="text-muted-foreground">Key metrics and recent activity</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">1,284</p>
          </CardContent>
        </Card>
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">New Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">312</p>
          </CardContent>
        </Card>
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Open Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">47</p>
          </CardContent>
        </Card>
        <Card className="card-soft">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">3</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} aria-label="Weekly activity chart">
                <XAxis dataKey="name" stroke="currentColor" className="text-xs" />
                <YAxis stroke="currentColor" className="text-xs" />
                <RTooltip />
                <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4,4,0,0]} />
                <Bar dataKey="reports" fill="hsl(var(--muted-foreground))" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3" aria-label="Recent activity">
              <li className="flex justify-between text-sm"><span>User invited: j.doe@company.com</span><span className="text-muted-foreground">2h</span></li>
              <li className="flex justify-between text-sm"><span>Report exported: Q3 revenue</span><span className="text-muted-foreground">5h</span></li>
              <li className="flex justify-between text-sm"><span>Password reset: s.lee@company.com</span><span className="text-muted-foreground">1d</span></li>
              <li className="flex justify-between text-sm"><span>Role updated: Analyst → Admin</span><span className="text-muted-foreground">2d</span></li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
