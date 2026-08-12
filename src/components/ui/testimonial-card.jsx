import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialCard({ author, text, href, className }) {
  const Card = href ? 'a' : 'div'

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-cream-dark",
        "bg-gradient-to-b from-white to-cream",
        "p-5 sm:p-6 text-start",
        "hover:from-white hover:to-cream-dark/40",
        "w-[280px] sm:w-[320px] shrink-0",
        "transition-colors duration-300 shadow-sm",
        className
      )}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className="fill-gold text-gold" />
        ))}
      </div>

      {/* Quote text */}
      <p className="para font-primary text-ink-soft leading-relaxed text-sm flex-1">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-cream-dark">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-brand text-white font-bold text-sm font-sans">
            {author.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="font-sans font-semibold text-sm text-ink leading-none">
            {author.name}
          </h3>
          <p className="font-primary text-xs text-muted-light mt-1">
            {author.handle}
          </p>
        </div>
      </div>
    </Card>
  )
}
