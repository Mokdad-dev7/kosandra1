import { cn } from '@/lib/utils'
import type { AppShot } from '@/lib/screenshots'

type Size = 'sm' | 'md' | 'lg'

const sizeClass: Record<Size, string> = {
  sm: 'w-[148px] sm:w-[168px]',
  md: 'w-[200px] sm:w-[220px]',
  lg: 'w-[240px] sm:w-[280px]',
}

export function AppScreenshot({
  shot,
  className,
  priority = false,
  size = 'md',
  showCaption = true,
}: {
  shot: AppShot
  className?: string
  priority?: boolean
  size?: Size
  showCaption?: boolean
}) {
  return (
    <figure className={cn('mx-auto min-w-0', sizeClass[size], className)}>
      <div className="rounded-[1.75rem] bg-zinc-900 p-[5px] shadow-2xl ring-1 ring-black/25">
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className="block h-auto w-full rounded-[1.4rem]"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      {showCaption && shot.caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {shot.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function ScreenshotRow({
  shots,
  size = 'sm',
  className,
}: {
  shots: AppShot[]
  size?: Size
  className?: string
}) {
  return (
    <div className={cn('mt-10 flex flex-wrap items-start justify-center gap-5 sm:gap-8', className)}>
      {shots.map((shot) => (
        <AppScreenshot key={shot.src} shot={shot} size={size} />
      ))}
    </div>
  )
}
