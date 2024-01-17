import { Headphones, ShieldCheck, Truck } from "lucide-react";

const incentives = [
  {
    name: "Free & Fast Delivery",
    icon: <Truck className="w-12 h-12" />,
    description: "Free delivery for all orders over INR 500",
  },
  {
    name: "24/7 Customer Service",
    icon: <Headphones className="w-12 h-12" />,
    description: "Friendly 24/7 customer support",
  },
  {
    name: "Money Back Guarantee",
    icon: <ShieldCheck className="w-12 h-12" />,
    description: "We reurn money within 30 days",
  },
];

export default function Incentives() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="px-6 py-16 sm:p-16">
          <div className="mx-auto max-w-xl lg:max-w-none">
            <div className="mx-auto grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3">
              {incentives.map((incentive) => (
                <div
                  key={incentive.name}
                  className="text-center sm:flex sm:text-left lg:block lg:text-center"
                >
                  <div className="sm:flex-shrink-0">
                    <div className="flow-root">
                      <div className="bg-black w-16 h-16 mx-auto rounded-full text-center flex items-center justify-center p-2 border-[7px] text-white">
                        {incentive.icon}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-md font-bold text-gray-900 uppercase">
                      {incentive.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {incentive.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
