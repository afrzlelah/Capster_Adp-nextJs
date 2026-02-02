import { ChevronRight, Scissors, Star } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-bg-light overflow-hidden">
      {/* Ultra-Sharp High Definition Background Element */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-slate-50 skew-x-[-15deg] origin-top translate-x-32 hidden lg:block border-l border-slate-100 shadow-2xl shadow-slate-200/50"></div>
      <div className="absolute top-1/4 -left-20 w-125 h-125 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-100 h-100 bg-red-400/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-1 pt-20 lg:pt-0">
          <div className="inline-flex items-center gap-3 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-100 text-blue-600 px-5 py-2 rounded-2xl text-xs font-black tracking-[0.2em] uppercase mb-10 animate-bounce-slow">
            <Scissors size={14} className="animate-pulse" /> The Best Barbershop
            Lokal
          </div>
          <h1 className="text-6xl md:text-[92px] font-black text-slate-900 mb-10 leading-[0.95] tracking-[-0.04em]">
            Dapatkan Gay<span className="text-slate-900">a</span> <br />{" "}
            <span className="text-rose-600 drop-shadow-[0_10px_20px_rgba(220,38,38,0.2)]">
              Terbaikmu.
            </span>
          </h1>
          <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg font-medium">
            Kami sangat mengutamakan kepuasan pelanggan dengan sentuhan potongan
            yang menyenangkan dan hasil yang memuaskan
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              href={"/gallery"}
              className="bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 px-12 py-6 rounded-3xl font-black text-lg transition-all shadow-sm"
            >
              Explorasi Feed
            </Link>
            <a
              href="https://wa.me/6285702260407"
              target="_blank"
              className="bg-slate-950 hover:bg-black text-white px-12 py-6 rounded-3xl font-black text-lg transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] flex items-center justify-center gap-3 group"
            >
              Booking sekarang{" "}
              <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2 relative mt-20 lg:mt-0">
          <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border-16 border-white z-20 transition-transform duration-700 hover:scale-[1.02]">
            <img
              src="/logo.png"
              alt="Capster ADP HD Work"
              className="w-full h-full object-cover saturate-[1.1] brightness-[1.02]"
            />
            {/* HD Detail Tag */}
            <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
              @capster_adp
            </div>
          </div>

          {/* Floating Stat Card */}
          <div className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl z-30 hidden sm:block border border-white/50 animate-float">
            <div className="text-5xl font-black text-slate-950 mb-2">5.0</div>
            <div className="flex gap-1.5 mb-3 text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Pengunjung josjis
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
