import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", users: 2 },
  { month: "Feb", users: 5 },
  { month: "Mar", users: 4 },
  { month: "Apr", users: 8 },
  { month: "May", users: 7 },
  { month: "Jun", users: 11 },
];

export default function UsersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Growth</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-54">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}