import { Info, X } from "lucide-react";

const Alert = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 transform animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-lg">
            <Info className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <button
            // onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{text}</p>
        <button
          //   onClick={closeModal}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
};

export default Alert;
