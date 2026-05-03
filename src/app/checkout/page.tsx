"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount } = useCart();
  const router = useRouter();

  // Customer info
  const [email, setEmail] = useState("");

  // Billing address
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  // Delivery
  const [delivery, setDelivery] = useState<"home" | "store">("home");

  // Payment
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Promo
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // Agreements
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState(false);

  const SHIPPING = 95;
  const TAX = 1;
  const subtotal = cartTotal;
  const total = subtotal + SHIPPING + TAX;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Order placement logic goes here
    alert("Order placed successfully!");
  };

  const handleWhatsAppCheckout = () => {
    const WHATSAPP_NUMBER = "233596505060"; // +233 59 650 5060

    const baseUrl = window.location.origin;

    // Each item gets its own product page link.
    // WhatsApp crawls the URL and renders the OG preview (image, title, price).
    const itemLines = cartItems
      .map(
        (item) =>
          `${item.name} - ${item.description}\n` +
          `Colour: ${item.color} | Qty: ${item.quantity} | GH${String.fromCharCode(8373)} ${(item.price * item.quantity).toLocaleString()}\n` +
          `${baseUrl}/product/${item.id}`
      )
      .join("\n\n");

    const message =
      `Hello, I would like to place an order.\n\n` +
      `*Order Details*\n\n` +
      `${itemLines}\n\n` +
      `Subtotal: GH${String.fromCharCode(8373)} ${subtotal.toLocaleString()}\n` +
      `Shipping: GH${String.fromCharCode(8373)} ${SHIPPING.toFixed(2)}\n` +
      `Tax: GH${String.fromCharCode(8373)} ${TAX.toFixed(2)}\n` +
      `*Total: GH${String.fromCharCode(8373)} ${total.toLocaleString()}*\n\n` +
      `Delivery: ${delivery === "home" ? "Home delivery (3-5 business days)" : "In-store pickup"}\n\n` +
      `Please confirm availability and payment details. Thank you.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-white">
      <div
        className="mx-auto py-10"
        style={{
          maxWidth: "1200px",
          paddingLeft: "clamp(1.5rem, 4vw, 60px)",
          paddingRight: "clamp(1.5rem, 4vw, 60px)",
        }}
      >
        {/* Page Title */}
        <h1
          className="mb-6 font-semibold"
          style={{ fontSize: "clamp(1.25rem, 1.67vw, 28px)", color: "#000000" }}
        >
          Checkout
        </h1>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* ── LEFT COLUMN ── */}
          <div className="flex-1">
            {/* Already have an account banner */}
            <div
              className="mb-6 rounded border px-4 py-3 text-sm"
              style={{
                borderColor: "#E5E7EB",
                backgroundColor: "#FAFAFA",
                color: "#5E5E5E",
              }}
            >
              Already have an account?{" "}
              <Link
                href="#"
                style={{ color: "#C8873A" }}
                className="underline hover:opacity-80"
              >
                Log in
              </Link>{" "}
              for faster checkout
            </div>

            {/* Payment method buttons */}
            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              {/* Checkout with card */}
              <button
                type="button"
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1A0E05" }}
              >
                Check out with card
                {/* Visa */}
                <svg width="34" height="11" viewBox="0 0 34 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                  <text x="0" y="10" fontFamily="Arial" fontWeight="bold" fontSize="11" fill="white" letterSpacing="1">VISA</text>
                </svg>
                {/* Mastercard */}
                <span className="flex items-center">
                  <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: "#EB001B", marginRight: "-8px" }} />
                  <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: "#F79E1B", opacity: 0.9 }} />
                </span>
              </button>

              {/* Checkout via WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded border py-3 text-sm font-semibold transition-colors hover:bg-green-50"
                style={{ borderColor: "#25D366", color: "#25D366" }}
              >
                {/* WhatsApp icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#25D366"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Check out via WhatsApp
              </button>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h2
                  className="font-semibold"
                  style={{ fontSize: "clamp(0.9rem, 1vw, 18px)", color: "#000000" }}
                >
                  Customer information
                </h2>
                <button
                  type="button"
                  style={{ color: "#C8873A", fontSize: "13px" }}
                  className="cursor-pointer hover:opacity-80"
                >
                  edit
                </button>
              </div>
              <input
                type="email"
                placeholder="Email for order confirmation"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
              />
            </div>

            {/* Billing Address */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <h2
                  className="font-semibold"
                  style={{ fontSize: "clamp(0.9rem, 1vw, 18px)", color: "#000000" }}
                >
                  Billing address
                </h2>
                <button
                  type="button"
                  style={{ color: "#C8873A", fontSize: "13px" }}
                  className="cursor-pointer hover:opacity-80"
                >
                  edit details
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* First / Last name row */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                    style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                    style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address line"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />

                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />
              </div>
            </div>

            {/* Delivery Options */}
            <div className="mb-2">
              <h2
                className="mb-3 font-semibold"
                style={{ fontSize: "clamp(0.9rem, 1vw, 18px)", color: "#000000" }}
              >
                Delivery options
              </h2>

              <div className="flex gap-3">
                {/* Home delivery */}
                <button
                  type="button"
                  onClick={() => setDelivery("home")}
                  className="relative flex flex-1 cursor-pointer flex-col rounded border px-4 py-4 text-left transition-colors"
                  style={{
                    borderColor: delivery === "home" ? "#1A0E05" : "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                  }}
                  aria-pressed={delivery === "home"}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ fontSize: "13px", color: "#000000" }}
                    >
                      Home delivery
                    </span>
                    {delivery === "home" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: "#22C55E" }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "12px", color: "#5E5E5E" }}>
                    Takes 3–5 business days
                  </span>
                </button>

                {/* In-store pickup */}
                <button
                  type="button"
                  onClick={() => setDelivery("store")}
                  className="relative flex flex-1 cursor-pointer flex-col rounded border px-4 py-4 text-left transition-colors"
                  style={{
                    borderColor: delivery === "store" ? "#1A0E05" : "#E5E7EB",
                    backgroundColor: "#FFFFFF",
                  }}
                  aria-pressed={delivery === "store"}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span
                      className="font-semibold"
                      style={{ fontSize: "13px", color: "#000000" }}
                    >
                      In-store pickup
                    </span>
                    {delivery === "store" && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: "#22C55E" }}>
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: "12px", color: "#5E5E5E" }}>
                    Pick from store location
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-full lg:w-[380px] lg:flex-shrink-0">
            {/* Order Summary */}
            <div className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className="font-semibold"
                  style={{ fontSize: "clamp(0.9rem, 1vw, 18px)", color: "#000000" }}
                >
                  Order Summary({cartCount})
                </h2>
                <Link
                  href="/"
                  style={{ color: "#C8873A", fontSize: "13px" }}
                  className="hover:opacity-80"
                >
                  edit cart
                </Link>
              </div>

              {/* Cart items */}
              <div className="mb-4 flex flex-col gap-4">
                {cartItems.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "#5E5E5E" }}>
                    Your cart is empty.
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div
                        className="h-16 w-16 flex-shrink-0 overflow-hidden rounded"
                        style={{ backgroundColor: "#F5F5F5" }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="mb-0.5 font-medium leading-tight line-clamp-2"
                          style={{ fontSize: "12px", color: "#5E5E5E" }}
                        >
                          {item.name} — {item.description}
                        </p>
                        <p style={{ fontSize: "13px", color: "#000000" }} className="font-semibold">
                          GH₵ {item.price.toLocaleString()}
                        </p>
                        <p style={{ fontSize: "12px", color: "#5E5E5E" }}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo code */}
              <button
                type="button"
                onClick={() => setPromoOpen((v) => !v)}
                className="mb-4 flex cursor-pointer items-center gap-1 text-sm"
                style={{ color: "#C8873A" }}
              >
                <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span>
                Enter a promo code
              </button>

              {promoOpen && (
                <div className="mb-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 rounded border px-3 py-2 text-sm outline-none focus:border-[#1A0E05]"
                    style={{ borderColor: "#E5E7EB", fontSize: "13px" }}
                  />
                  <button
                    type="button"
                    className="cursor-pointer rounded px-4 py-2 text-sm font-semibold text-white"
                    style={{ backgroundColor: "#1A0E05" }}
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Totals */}
              <div className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "13px", color: "#5E5E5E" }}>Subtotal</span>
                  <span style={{ fontSize: "13px", color: "#000000" }} className="font-medium">
                    GH₵ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "13px", color: "#5E5E5E" }}>Shipping</span>
                  <span style={{ fontSize: "13px", color: "#000000" }} className="font-medium">
                    GH₵ {SHIPPING.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: "13px", color: "#5E5E5E" }}>Tax</span>
                  <span style={{ fontSize: "13px", color: "#000000" }} className="font-medium">
                    GH₵ {TAX.toFixed(2)}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between border-t pt-3" style={{ borderColor: "#E5E7EB" }}>
                  <span style={{ fontSize: "14px", color: "#000000" }} className="font-semibold">
                    Total
                  </span>
                  <span style={{ fontSize: "14px", color: "#000000" }} className="font-bold">
                    GH₵ {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div>
              <h2
                className="mb-4 font-semibold"
                style={{ fontSize: "clamp(0.9rem, 1vw, 18px)", color: "#000000" }}
              >
                Payment options
              </h2>

              {/* Credit/Debit card option */}
              <label className="mb-4 flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer accent-[#1A0E05]"
                />
                <span style={{ fontSize: "13px", color: "#000000" }} className="font-medium">
                  Credit/Debit card
                </span>
                {/* Visa */}
                <svg width="38" height="12" viewBox="0 0 38 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
                  <text x="0" y="11" fontFamily="Arial" fontWeight="bold" fontSize="12" fill="#1A1F71" letterSpacing="1">VISA</text>
                </svg>
                {/* Mastercard */}
                <span className="flex items-center">
                  <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: "#EB001B", marginRight: "-8px" }} />
                  <span className="inline-block h-5 w-5 rounded-full" style={{ backgroundColor: "#F79E1B", opacity: 0.9 }} />
                </span>
              </label>

              <p style={{ fontSize: "12px", color: "#5E5E5E" }} className="mb-4">
                Pay with your Visa, American Express or Mastercard.
              </p>

              {/* Card fields */}
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Card holder name"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />
                <input
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />
                <input
                  type="text"
                  placeholder="Expiry date"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  maxLength={5}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />
                <input
                  type="text"
                  placeholder="Security code(CVV)"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={4}
                  className="w-full rounded border px-4 py-3 text-sm outline-none transition-colors focus:border-[#1A0E05]"
                  style={{ borderColor: "#E5E7EB", color: "#000000", fontSize: "13px" }}
                />
              </div>

              {/* Review & Place Order */}
              <div className="mt-6">
                <h3
                  className="mb-2 font-semibold"
                  style={{ fontSize: "14px", color: "#000000" }}
                >
                  Review &amp; Place Order
                </h3>
                <p style={{ fontSize: "12px", color: "#5E5E5E", lineHeight: "1.6" }} className="mb-4">
                  Please review the order details and payment details before proceeding to confirm your order
                </p>

                {/* Checkboxes */}
                <div className="mb-5 flex flex-col gap-3">
                  <label className="flex cursor-pointer items-start gap-2">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 cursor-pointer accent-[#1A0E05]"
                    />
                    <span style={{ fontSize: "12px", color: "#5E5E5E", lineHeight: "1.5" }}>
                      I agree to the{" "}
                      <Link href="#" style={{ color: "#C8873A" }} className="underline hover:opacity-80">
                        Terms &amp; conditions
                      </Link>
                      ,{" "}
                      <Link href="#" style={{ color: "#C8873A" }} className="underline hover:opacity-80">
                        Privacy policy
                      </Link>{" "}
                      &amp;{" "}
                      <Link href="#" style={{ color: "#C8873A" }} className="underline hover:opacity-80">
                        Return policy
                      </Link>
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.checked)}
                      className="h-4 w-4 cursor-pointer accent-[#1A0E05]"
                    />
                    <span style={{ fontSize: "12px", color: "#5E5E5E" }}>
                      Sign me up to the email list.
                    </span>
                  </label>
                </div>

                {/* Place Order button */}
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={!agreeTerms}
                  className="w-full cursor-pointer rounded py-4 text-sm font-semibold text-white transition-colors"
                  style={{
                    backgroundColor: agreeTerms ? "#1A0E05" : "#9CA3AF",
                    cursor: agreeTerms ? "pointer" : "not-allowed",
                  }}
                >
                  Place order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
