import React, { useEffect, useState, lazy, Suspense } from "react";
import { Search } from "lucide-react";
const CodeBlock = lazy(() => import("../components/CodeBlock"));
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

interface Tip {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  date: string;
}

const Tips: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tip[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchTips = () => {
      const tipsCollection = collection(db, "tips"); 
      
      return onSnapshot(tipsCollection, (snapshot) => {
        const fetchedTips = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            code: data.code || "",
            language: data.language || "",
            date: data.date || ""
          };
        });
        
        setTips(fetchedTips);
        setFilteredTips(fetchedTips);
      });
    };

    const unsubscribe = fetchTips();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = tips.filter((tip) => {
      const matchesSearch =
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage =
        !selectedLanguage || tip.language === selectedLanguage;
      const matchesDate = !selectedDate || tip.date === selectedDate;
      return matchesSearch && matchesLanguage && matchesDate;
    });
    setFilteredTips(filtered);
  }, [searchTerm, selectedLanguage, selectedDate, tips]);

  const allLanguages = [...new Set(tips.map((tip) => tip.language))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <section className="p-8 pt-24 md:p-16 md:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h2 className="text-4xl font-bold text-primary-dark dark:text-white mb-6 md:mb-0">
              Consejos
            </h2>
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar consejos..."
                  className="pl-10 pr-4 py-2 rounded-lg 
                           bg-white dark:bg-gray-800 
                           text-gray-700 dark:text-gray-200
                           border border-gray-200 dark:border-gray-700
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                           focus:border-transparent
                           w-full md:w-64 transition-all duration-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-4 py-2 rounded-lg 
                                bg-white dark:bg-gray-800 
                                text-gray-700 dark:text-gray-200
                                border border-gray-200 dark:border-gray-700
                                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                                focus:border-transparent
                                w-full md:w-56 cursor-pointer transition-all duration-200"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="">Todos los lenguajes</option>
                {allLanguages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 rounded-lg 
                bg-white dark:bg-gray-800 
                text-gray-700 dark:text-gray-200
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                focus:border-transparent
                w-full md:w-40 cursor-pointer transition-all duration-200
                [&::-webkit-calendar-picker-indicator]:invert-0 dark:[&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out hover:-translate-y-2"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-primary-dark dark:text-gray-100 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-primary-dark dark:text-gray-100 mb-4">
                    {tip.description}
                  </p>
                  <Suspense fallback={<div className="text-sm text-gray-500">Cargando código…</div>}>
                    <CodeBlock code={tip.code} language={tip.language} />
                  </Suspense>
                </div>
              </div>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-900 dark:text-white text-lg">
                No se encontraron consejos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Tips;
