import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Star, Trophy } from "lucide-react"
import Link from "next/link"

const supportTiers = [
  {
    name: "Buy me a coffee",
    price: "$5",
    description: "A one-time show of support",
    icon: Coffee,
    benefits: ["A virtual high-five", "Your name on our supporters page", "Warm fuzzy feelings"],
    buttonText: "Buy a coffee",
    checkoutLink: "/checkout?tier=coffee",
  },
  {
    name: "Support this project",
    price: "$5/month",
    description: "Ongoing support for development",
    icon: Star,
    benefits: ['All "Buy me a coffee" benefits', "Early access to new features", "Vote on upcoming features"],
    buttonText: "Become a supporter",
    checkoutLink: "/checkout?tier=supporter",
  },
  {
    name: "Super Supporter",
    price: "$25/month",
    description: "For our biggest fans",
    icon: Trophy,
    benefits: [
      'All "Support this project" benefits',
      "Your name in the app credits",
      "One-on-one chat with the developer",
      "Exclusive Super Supporter badge",
    ],
    buttonText: "Become a Super Supporter",
    checkoutLink: "/checkout?tier=super",
  },
]

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Support Our Project</h1>
      <p className="text-center text-muted-foreground mb-8">
        Choose a tier to help us keep improving and maintaining this project
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportTiers.map((tier) => (
          <Card key={tier.name} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary mb-4">
                <tier.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-2xl font-bold mb-4">{tier.price}</p>
              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-4 h-4 mr-2 mt-1 text-yellow-400" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={tier.checkoutLink}>{tier.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

