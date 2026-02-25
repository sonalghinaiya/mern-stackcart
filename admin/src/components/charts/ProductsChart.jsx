import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", products: 3 },
  { month: "Feb", products: 5 },
  { month: "Mar", products: 2 },
  { month: "Apr", products: 6 },
  { month: "May", products: 4 },
  { month: "Jun", products: 7 },
];

export default function ProductsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products Added</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="products"
                fill="#a855f7"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}