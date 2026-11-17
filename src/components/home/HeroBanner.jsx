
export default function HeroBanner() {
  return (
    <>
      {/* Hero banner */}
      <section className="reveal relative mx-3 h-[390px] overflow-hidden rounded-[28px] bg-[#D8C9AA] shadow-[0_12px_30px_rgba(40,50,35,0.16)]">

        {/* Background image */}
        <div
          className="absolute inset-0 animate-[drift_24s_ease-in-out_infinite_alternate] bg-cover"
          style={{
            backgroundImage: "url('/home-banner.png')",
            backgroundPosition: "right ",
          }}
        />

        {/* Subtle text readability overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-[#10291F]/75 via-[#10291F]/35 to-transparent" />


        {/* Hero content */}
<div className="absolute left-[25px] top-[36px] z-10">

  <h1 className="font-serif text-[40px] font-medium leading-[1.05] tracking-[-1.5px] text-[#FFFCF5]">
    You are
    <br />
    never{" "}
    <em className="font-normal text-[#E8C783]">
      alone.
    </em>
  </h1>

  {/* Gold accent */}
  <div className="my-[15px] h-[3px] w-[45px] rounded-full bg-[#D8AD55]" />

  <p className="font-serif text-[17px] leading-relaxed text-[#FFFCF5]">
    I am with you always.
  </p>

  {/* Bible verse badge */}
  <div className="mt-[13px] inline-flex items-center rounded-full border border-white/20 bg-[#174735] px-[17px] py-[8px] shadow-md">
    <span className="font-sans text-[11px] font-semibold tracking-[0.5px] text-white">
      MATTHEW 28:20
    </span>
  </div>

</div>
      </section>

      {/* Floating heart question */}
      <div className="relative z-[3] mx-[22px] -mt-[25px] mb-7 flex min-h-[66px] items-center justify-between gap-3 rounded-[22px] border border-[#E8DECC] bg-[#FFFCF5] px-[20px] shadow-[0_10px_25px_rgba(52,45,32,0.13)]">

        <div className="flex items-center gap-[14px]">
          <i className="fa-solid fa-leaf text-[22px] text-[#174735]" />

          <p className="font-serif text-[19px] font-medium text-[#1D291F]">
            How is your heart today?
          </p>
        </div>

        
      </div>
    </>
  );
}
