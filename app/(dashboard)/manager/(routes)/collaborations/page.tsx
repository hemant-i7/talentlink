import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, XCircle, Hourglass } from 'lucide-react';
import brands from "../brand/brands"; // Assuming this is your list of brand deals

const Analytics = () => {
  return (
    
    <div className="pt-40 px-24 h-screen">
      <h2 className="text-3xl font-bold mb-8">Brand Deals Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <Card key={brand.id} className="shadow-lg p-4">
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{brand.name}</CardTitle>
              {/* Display icon based on status */}
              {brand.status === "accepted" && (
                <CheckCircle className="text-green-500" size={28} />
              )}
              {brand.status === "waiting" && (
                <Hourglass className="text-yellow-500" size={28} />
              )}
              {brand.status === "rejected" && (
                <XCircle className="text-red-500" size={28} />
              )}
            </CardHeader>
            <CardContent>
              <CardDescription>{brand.description}</CardDescription>
              <p className="text-sm font-bold mt-2">
                Offered: {brand.moneyOffered}
              </p>
            </CardContent>
            <CardFooter>
              <p className={`text-sm ${brand.status === "accepted" ? "text-green-600 text-" : brand.status === "waiting" ? "text-yellow-600" : "text-red-600"}`}>
                Status: waiting
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
