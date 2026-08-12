import { cn } from "@/lib/utils"
import { TestimonialCard } from "@/components/ui/testimonial-card"

export function TestimonialsSection({ title, description, testimonials, className }) {
  return (
    <section className={cn(
      "bg-cream",
      "py-16 sm:py-24 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 text-center sm:gap-16">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <p className="para font-primary text-brand font-semibold uppercase tracking-widest text-sm">
            Happy Customers
          </p>
          <h2 className="font-sans font-bold text-4xl sm:text-5xl text-ink leading-tight max-w-[720px] uppercase tracking-tight">
            {title}
          </h2>
          <p className="para font-primary text-muted max-w-[560px] sm:text-base">
            {description}
          </p>
        </div>

        {/* Marquee */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            {[0, 1].map((strip) => (
              <div
                key={strip}
                aria-hidden={strip === 1}
                className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]"
              >
                {testimonials.map((testimonial, i) => (
                  <TestimonialCard key={i} {...testimonial} />
                ))}
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-cream sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-cream sm:block" />
        </div>

      </div>
    </section>
  )
}
