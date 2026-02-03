import { Phone, Instagram, ExternalLink, AArrowUp } from "lucide-react";

const Footer = async () => {
  const fetchData = await fetch(`http://localhost:3000/api/services`);
  const response = await fetchData.json();
  interface ResponseData {
    id: string;
    name: string;
    description: string;
    price?: number;
  }
  return (
    <footer
      id="contact"
      className="bg-slate-50 border-t border-slate-100 pt-40 pb-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center text-white text-[10px] font-black">
                ADP
              </div>
              <span className="font-black text-3xl tracking-tighter text-slate-950">
                CAPSTER_ADP
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-[1.8] mb-10 text-lg">
              Hubungi kami melalui media sosial atau telepon untuk booking
            </p>
            <div className="flex gap-5">
              <a
                href="https://www.instagram.com/capster_adp"
                target="_blank"
                className="w-14 h-14 bg-white shadow-sm text-slate-950 flex items-center justify-center rounded-2xl hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <Instagram size={26} />
              </a>
              <a
                href="https://wa.me/6285702260407"
                target="_blank"
                className="w-14 h-14 bg-white shadow-sm text-slate-950 flex items-center justify-center rounded-2xl hover:bg-rose-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <Phone size={26} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-slate-950 font-black text-xl mb-10 tracking-tight">
              LAYANAN
            </h4>
            <ul className="space-y-5 text-slate-500 font-bold">
              {response.map((item: ResponseData) => (
                <li
                  key={item.id}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-sm flex items-center gap-3 group"
                >
                  <div className="w-1 h-1 bg-slate-200 group-hover:w-4 group-hover:bg-blue-600 transition-all"></div>{" "}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-slate-950 font-black text-xl mb-10 tracking-tight">
              OPERASIONAL
            </h4>
            <ul className="space-y-5 text-slate-500 font-bold text-sm">
              <li className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm">
                <span>Weekdays</span>
                <span className="text-slate-950 font-black">10:00 — 21:00</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm border border-red-500/10">
                <span>Sunday</span>
                <span className="text-red-600 font-black">13:00 — 21:00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-950 font-black text-xl mb-10 tracking-tight">
              LOKASI STUDIO
            </h4>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              katakatakatakatakatakata.
            </p>
            <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-5 rounded-2xl font-black text-slate-950 hover:bg-slate-50 transition-all group">
              OPEN GOOGLE MAPS{" "}
              <ExternalLink
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        <div className="pt-16 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">
            &copy; {new Date().getFullYear()} Capster_ADP &bull; Sharp Focus
            &bull; Premium Cut
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Privacy Policy
            </span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
