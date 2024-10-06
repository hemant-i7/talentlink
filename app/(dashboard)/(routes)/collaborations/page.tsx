import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, XCircle, Hammer, Hourglass } from 'lucide-react';
import brands from "../brand/brands";


const Analytics = () => {
  return (
    <div className="pt-40 px-24 h-screen">
      {brands.map((brand) => (
      <Card className="mb-10 flex flex-row flex-wrap justify-between items-center bg-white/5 hover:bg-white/10">
      <CardHeader>
        <CardTitle>
            <img
                  src={brand.imageUrl}
                  alt={`${brand.name} logo`}
                  className="w-16 h-16 mb-4 object-cover rounded-full"
          />
        </CardTitle>
        <CardDescription><p className="text-lg">{brand.name}</p></CardDescription>
      </CardHeader>
        <CardContent>
        <p className="text-sm font-bold text-green-500 mt-2">
              Sponsorship: {brand.moneyOffered}
            </p>
        </CardContent>
      <CardFooter>
      { brand.status == "WIP" 
         ? <Hammer size={24} color="blue" /> 
         : brand.status == "PENDING" 
         ? <Hourglass size={24} color="orange" />
         : brand.status == "APPROVED" 
         ? <CheckCircle size={24} color="green" /> 
         : brand.status == "FAILED"
         ? <XCircle size={24} color="red" />
         : <Hammer size={24} color="blue" />}
      </CardFooter>
      </Card>
      ))}
    </div>
  );
};

export default Analytics;
