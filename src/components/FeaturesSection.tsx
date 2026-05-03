import Image from "next/image";

const features = [
  {
    icon: "/collections/truck.svg",
    title: "Free Delivery",
    subtitle: "On orders above GH₵ 200",
  },
  {
    icon: "/collections/reload.svg",
    title: "30-Day Returns",
    subtitle: "Easy & hassle free",
  },
  {
    icon: "/collections/shield.svg",
    title: "Secure Payment",
    subtitle: "Card & Mobile money accepted",
  },
  {
    icon: "/collections/support.svg",
    title: "Swift Support",
    subtitle: "WhatsApp & Call support",
  },
];

const collections = [
  {
    image: "/collections/luggage.svg",
    title: "Luggage",
  },
  {
    image: "/collections/bags.svg",
    title: "Bags",
  },
  {
    image: "/collections/sets.svg",
    title: "Sets",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white py-16">
      <div
        className="mx-auto"
        style={{
          maxWidth: "1224px",
          paddingLeft: "clamp(1.5rem, 6.51vw, 125px)",
          paddingRight: "clamp(1.5rem, 6.51vw, 125px)",
        }}
      >
        {/* Features Grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "24px" }}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl text-center"
              style={{ 
                backgroundColor: "#EEEEEE",
                width: "100%",
                minHeight: "clamp(110px, 6.98vw, 134px)",
                padding: "16px 12px"
              }}
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={44}
                  height={44}
                />
              </div>
              <h3
                style={{
                  fontSize: "clamp(0.875rem, 0.94vw, 18px)",
                  color: "#000000",
                }}
                className="font-semibold leading-tight"
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.75rem, 0.83vw, 16px)",
                  color: "#5E5E5E",
                }}
                className="font-light leading-tight"
              >
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Collections Heading */}
        <h2
          style={{
            fontSize: "clamp(1.5rem, 1.67vw, 32px)",
            color: "#000000",
          }}
          className="mb-8 text-center font-semibold"
        >
          Our Curated Collections
        </h2>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative h-[400px] overflow-hidden rounded-2xl"
            >
              {/* Image with text baked in */}
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Divider */}
      <div className="w-full" style={{ marginTop: "64px", borderTop: "1px solid #5d5d5dff" }} />
    </section>
  );
}
