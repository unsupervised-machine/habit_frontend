import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["Up to 10 projects", "Basic task management", "Email support"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["Unlimited projects", "Advanced task management", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom features", "Dedicated account manager", "24/7 phone support"],
  },
]

export default function PricingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pricing Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

