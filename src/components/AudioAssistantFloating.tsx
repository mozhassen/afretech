import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Volume2, VolumeX, Sparkles, HelpCircle } from 'lucide-react';

export const AudioAssistantFloating: React.FC = () => {
  const { language, activeTab, speakText, t } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const screenGuidance = {
    catalog: {
      en: "Welcome to the Traditional Herbal Catalog. Scroll to explore medicinal plants. Tap the speaker icon on any plant to hear its uses and dosages spoken aloud.",
      am: "ወደ ባህላዊ መድኃኒት ዕፅዋት ካታሎግ እንኳን ደህና መጡ። የዕፅዋቱን አዘገጃጀት እና መጠን በድምፅ ለመስማት የድምፅ ምልክቱን ይጫኑ።",
      yo: "Ẹ káàbọ̀ sí àkójọ ewé ìwòsàn ìbílẹ̀. Ẹ tẹ àmì ohùn lórí ewé kọ̀ọ̀kan láti gbọ́ bí a ṣe ń lò ó àti ìwọ̀n rẹ̀."
    },
    comparison: {
      en: "This is the cross-border comparison view between Nigeria and Ethiopia. Select a shared plant species above to see how it is prepared in both countries.",
      am: "ይህ በኢትዮጵያ እና በናይጄሪያ መካከል ያለውን የዕፅዋት አጠቃቀም የሚያነፃፅር ክፍል ነው። ተመሳሳይ ዕፅዋት በሁለቱም ሀገራት እንዴት እንደሚዘጋጁ ማየት ይችላሉ።",
      yo: "Èyí ni ibùdó ìfiwéra ewé láàrín Nàìjíríà àti Ethiopia. Ẹ yan ewé tí ó wà ní ilẹ̀ méjèèjì láti wo ìyàtọ̀ ìpèsè wọn."
    },
    contribute: {
      en: "You are in the knowledge contribution module. Follow the 5 guided steps to take a photo of the plant, select its parts, record your voice, and tag the location.",
      am: "ዕውቀት ማጋሪያ ክፍል ውስጥ ነዎት። አምስቱን ቀላል ደረጃዎች በመከተል ፎቶ ያንሱ፣ ክፍሎችን ይምረጡ፣ ድምፅዎን ይቅረጹ እና ቦታውን ይመዝግቡ።",
      yo: "Ẹ wà ní ibùdó àkọsílẹ̀ ìmọ̀. Ẹ tẹ̀lé àwọn ìpele márùn-ún wọ̀nyí láti ya àwòrán, yan ẹ̀yà ewé, gba ohùn yín sílẹ̀, kí ẹ sì kọ ibùdó rẹ̀."
    },
    sync: {
      en: "This is your offline synchronization engine. Any plant notes saved while offline are stored safely here and will upload automatically when internet connects.",
      am: "ይህ ከመስመር ውጭ ማመሳሰያ ክፍል ነው። ያለ ኢንተርኔት የመዘገቧቸው መረጃዎች እዚህ ተቀምጠዋል፣ ኢንተርኔት ሲያገኙ በራሳቸው ይላካሉ።",
      yo: "Èyí ni ibùdó ìṣiṣẹ́pọ̀ láìsí íńtánẹ́ẹ̀tì. Àwọn àkọsílẹ̀ tí ẹ ṣe nígbà tí kò sí íńtánẹ́ẹ̀tì yóò wọ orí ẹ̀rọ lẹ́sẹ̀kẹsẹ̀ tí ìsopọ̀ bá padà dé."
    },
    researcher: {
      en: "Consortium Research Portal. Academic teams from UniLag and AASTU can review field contributions and export datasets in CSV or JSON.",
      am: "የጥምረቱ የምርምር ፖርታል። የዩኒላግ እና የአ.አ.ሳ.ቴ.ዩ ተመራማሪዎች መረጃዎችን መርምረው ማፅደቅ እና በCSV ማውረድ ይችላሉ።",
      yo: "Gbọ̀ngàn ìmọ̀ àjọ UniLag àti AASTU. Àwọn olùwádìí lè ṣàyẹ̀wò àwọn àkọsílẹ̀ kí wọn sì gba àwọn dátà sílẹ̀."
    }
  };

  const handleReadScreen = () => {
    if (isSpeaking) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = screenGuidance[activeTab][language] || screenGuidance[activeTab].en;
    setIsSpeaking(true);
    speakText(text, language);

    setTimeout(() => {
      setIsSpeaking(false);
    }, 7000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={handleReadScreen}
        className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-xl transition-all border min-h-[48px] ${
          isSpeaking
            ? 'bg-amber-500 text-stone-950 border-amber-300 ring-4 ring-amber-200 animate-pulse font-bold'
            : 'bg-stone-900 text-stone-100 hover:bg-emerald-700 border-stone-700'
        }`}
        aria-label="Audio reader assistant for elderly practitioners"
        title="Listen to screen guidance in your language"
      >
        {isSpeaking ? (
          <>
            <VolumeX className="w-5 h-5 text-stone-950" />
            <span className="text-xs font-bold">Speaking...</span>
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold hidden sm:inline">Audio Guide</span>
          </>
        )}
      </button>
    </div>
  );
};
