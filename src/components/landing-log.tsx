"use client"
export function Logo() {
  return (
    <div className="w-[88px] h-[64px] sm:w-[120px] sm:h-[88px] overflow-hidden">
      <video
        src="/logovideo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
        suppressHydrationWarning
      />
    </div>
  )
}
