interface SectionHeadingProps {
  id: string
  title: string
  subtitle: string
}

export function SectionHeading({ id, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-4 flex flex-col gap-1 px-1 pt-6 sm:flex-row sm:items-end sm:justify-between">
      <h2 id={id} className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-muted">{subtitle}</p>
    </div>
  )
}
