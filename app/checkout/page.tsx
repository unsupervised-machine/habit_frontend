"use client"

import type React from "react"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_your_publishable_key")

// Mock cart items
const cartItems = [
  { id: 1, name: "Product A", price: 19.99, quantity: 2 },
  { id: 2, name: "Product B", price: 29.99, quantity: 1 },
  { id: 3, name: "Product C", price: 9.99, quantity: 3 },
]

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setIsLoading(false)
      return
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
          address: {
            line1: address,
            city,
            state,
            postal_code: zip,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      if (!paymentMethod) {
        throw new Error("Payment method creation failed")
      }

      console.log("PaymentMethod created:", paymentMethod.id)

      // Simulate a server request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Payment processed successfully!")
    } catch (error) {
      console.error("Error:", error)
      toast.error(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input id="state" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="zip">ZIP Code</Label>
          <Input id="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
        </div>
      </div>
      <div>
        <Label htmlFor="card-element">Credit or debit card</Label>
        <div className="border rounded-md p-3">
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>
      <Button type="submit" disabled={!stripe || isLoading} className="w-full">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}

function CartSummary() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <ul className="space-y-2">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

