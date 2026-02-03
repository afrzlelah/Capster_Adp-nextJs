import { UserDataSupabase } from "@/app/types/dataUserSupabase";
import { Star } from "lucide-react";

const HeaderUser = ({ userData }: { userData: UserDataSupabase }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Halo, {userData?.username}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
          Siap untuk tampil lebih keren hari ini?
        </p>
      </div>
      <div className="flex items-center gap-3 bg-white dark:bg-slate-900 p-2 pr-4 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-full flex items-center justify-center">
          <Star className="text-amber-500 fill-amber-500" size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Poin Anda
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {userData?.points?.toLocaleString()} Poin
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderUser;
