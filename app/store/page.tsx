import type { Metadata } from "next";
import PrintCard from "@/components/PrintCard";
import storeData from "@/content/store.json";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Buy fine art landscape photography prints and digital downloads. Premium giclée prints fulfilled by Picfair with worldwide shipping.",
};

export default function StorePage() {
  return (
    <div className="container-wide py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Buy Prints & Digital Downloads
        </h1>
        <p className="text-gray-400 max-w-3xl leading-relaxed">
          All prints are produced on premium giclée photo paper with archival
          inks, ensuring rich colour and lasting quality. Prints are fulfilled
          and shipped worldwide by Picfair — simply choose your image, pick a
          size, and they handle the rest.
        </p>
      </div>

      {/* Prints grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {storeData.prints.map((print, i) => (
          <PrintCard
            key={i}
            title={print.title}
            src={print.src}
            alt={print.alt}
            price={print.price}
            picfairUrl={print.picfairUrl}
          />
        ))}
      </div>

      {/* Info section */}
      <section className="mt-20 border-t border-white/5 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-sm font-medium mb-3">Print Quality</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Every print uses premium giclée photo paper with a lustre finish.
              Canvas, framed, and acrylic options are also available. All
              prints are made to order.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Fulfilment</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Prints are produced and shipped by Picfair, a trusted print
              partner. Your order is carefully packaged to arrive in perfect
              condition.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-3">Shipping</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              UK delivery: 3-5 working days. International shipping available
              worldwide, typically 7-14 working days. All prints arrive in
              protective packaging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
