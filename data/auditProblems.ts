export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'ja' | 'de';

export interface AuditProblem {
  id: string;
  text: string;
  translations?: Partial<Record<SupportedLanguage, string>>;
}

export const auditProblems: AuditProblem[] = [
  { 
    id: 'prob-1', 
    text: "My website is too slow",
    translations: {
      en: "My website is too slow",
      ta: "என் website மிகவும் slow ஆக உள்ளது",
      hi: "मेरी वेबसाइट बहुत धीमी है",
      ja: "私のウェブサイトは遅すぎます",
      de: "Meine Website ist zu langsam"
    }
  },
  { 
    id: 'prob-2', 
    text: "My ads don't bring in sales",
    translations: {
      en: "My ads don't bring in sales",
      ta: "என் விளம்பரங்கள் sales கொண்டுவரவில்லை",
      hi: "मेरे विज्ञापन बिक्री नहीं ला रहे हैं",
      ja: "広告が売上につながりません",
      de: "Meine Anzeigen bringen keine Verkäufe"
    }
  },
  { 
    id: 'prob-3', 
    text: "My inventory is a mess",
    translations: {
      en: "My inventory is a mess",
      ta: "என் இருப்பு (inventory) குழப்பமாக உள்ளது",
      hi: "मेरी इन्वेंट्री अस्त-व्यस्त है",
      ja: "在庫がめちゃくちゃです",
      de: "Mein Inventar ist ein Chaos"
    }
  },
  { 
    id: 'prob-4', 
    text: "My support team is drowning",
    translations: {
      en: "My support team is drowning",
      ta: "என் support team மிகவும் சிரமப்படுகிறது",
      hi: "मेरी सपोर्ट टीम काम के बोझ तले दबी है",
      ja: "サポートチームがパンクしています",
      de: "Mein Support-Team ertrinkt in Arbeit"
    }
  },
  { 
    id: 'prob-8', 
    text: "Everything is still manual",
    translations: {
      en: "Everything is still manual",
      ta: "எல்லாம் இன்னும் manual ஆக உள்ளது",
      hi: "सब कुछ अभी भी मैन्युअल है",
      ja: "すべてがまだ手作業です",
      de: "Alles ist noch manuell"
    }
  },
  { 
    id: 'prob-10', 
    text: "Customers keep dropping off",
    translations: {
      en: "Customers keep dropping off",
      ta: "வாடிக்கையாளர்கள் வெளியேறிக்கொண்டே இருக்கிறார்கள்",
      hi: "ग्राहक लगातार वापस जा रहे हैं",
      ja: "顧客が離れていきます",
      de: "Kunden springen ständig ab"
    }
  },
  { 
    id: 'prob-11', 
    text: "Too much repetitive work",
    translations: {
      en: "Too much repetitive work",
      ta: "அதிகப்படியான மீண்டும் மீண்டும் செய்யும் வேலை",
      hi: "बहुत अधिक दोहराया जाने वाला काम",
      ja: "反復作業が多すぎます",
      de: "Zu viel repetitive Arbeit"
    }
  },
  { 
    id: 'prob-12', 
    text: "My systems don't talk to each other",
    translations: {
      en: "My systems don't talk to each other",
      ta: "என் systems ஒன்றோடொன்று இணைக்கப்படவில்லை",
      hi: "मेरे सिस्टम एक-दूसरे से कनेक्ट नहीं हैं",
      ja: "システム同士が連携していません",
      de: "Meine Systeme kommunizieren nicht miteinander"
    }
  },
  { 
    id: 'prob-13', 
    text: "Reporting takes forever",
    translations: {
      en: "Reporting takes forever",
      ta: "Reporting செய்ய அதிக நேரம் ஆகிறது",
      hi: "रिपोर्टिंग में बहुत समय लगता है",
      ja: "レポート作成に時間がかかりすぎます",
      de: "Die Berichterstattung dauert ewig"
    }
  },
  { 
    id: 'prob-14', 
    text: "My data is everywhere",
    translations: {
      en: "My data is everywhere",
      ta: "என் தரவுகள் (data) எல்லா இடங்களிலும் சிதறியுள்ளன",
      hi: "मेरा डेटा हर जगह फैला हुआ है",
      ja: "データが散在しています",
      de: "Meine Daten sind überall verstreut"
    }
  },
  { 
    id: 'prob-16', 
    text: "Our internal process is too slow",
    translations: {
      en: "Our internal process is too slow",
      ta: "எங்கள் internal process மிகவும் மெதுவாக உள்ளது",
      hi: "हमारी आंतरिक प्रक्रिया बहुत धीमी है",
      ja: "社内プロセスが遅すぎます",
      de: "Unser interner Prozess ist zu langsam"
    }
  },
  { 
    id: 'prob-17', 
    text: "We keep losing opportunities",
    translations: {
      en: "We keep losing opportunities",
      ta: "நாங்கள் வாய்ப்புகளை இழந்து கொண்டே இருக்கிறோம்",
      hi: "हम लगातार अवसर खो रहे हैं",
      ja: "機会を逃し続けています",
      de: "Wir verpassen ständig Chancen"
    }
  },
  { 
    id: 'prob-19', 
    text: "We need better automation",
    translations: {
      en: "We need better automation",
      ta: "எங்களுக்கு சிறந்த automation தேவை",
      hi: "हमें बेहतर ऑटोमेशन की आवश्यकता है",
      ja: "より良い自動化が必要です",
      de: "Wir brauchen eine bessere Automatisierung"
    }
  },
  { 
    id: 'prob-20', 
    text: "Our team wastes time on repetitive tasks",
    translations: {
      en: "Our team wastes time on repetitive tasks",
      ta: "மீண்டும் செய்யும் வேலைகளில் குழுவின் நேரம் வீணாகிறது",
      hi: "हमारी टीम बार-बार होने वाले कार्यों में समय बर्बाद करती है",
      ja: "チームが反復作業に時間を浪費しています",
      de: "Unser Team verschwendet Zeit mit sich wiederholenden Aufgaben"
    }
  },
  { 
    id: 'prob-24', 
    text: "We have zero visibility into operations",
    translations: {
      en: "We have zero visibility into operations",
      ta: "செயல்பாடுகள் குறித்த எந்த தெளிவும் எங்களிடம் இல்லை",
      hi: "संचालन में हमारी कोई दृश्यता नहीं है",
      ja: "業務の可視性がゼロです",
      de: "Wir haben null Einblick in die Abläufe"
    }
  },
  { id: 'prob-5', text: "Leads disappear before they reach sales" },
  { id: 'prob-6', text: "My team isn't closing deals" },
  { id: 'prob-7', text: "I don't know my real numbers" },
  { id: 'prob-9', text: "My business runs on spreadsheets" },
  { id: 'prob-15', text: "My customers keep asking the same questions" },
  { id: 'prob-18', text: "Our tools don't work together" },
  { id: 'prob-21', text: "We can't scale with current processes" },
  { id: 'prob-22', text: "Onboarding new hires takes too long" },
  { id: 'prob-23', text: "Invoices are slipping through the cracks" },
  { id: 'prob-25', text: "Communication between departments is broken" },
  { id: 'prob-26', text: "Legacy software is holding us back" },
  { id: 'prob-27', text: "Vendors are difficult to manage" },
  { id: 'prob-28', text: "We're spending too much on disjointed SaaS" },
  { id: 'prob-29', text: "Critical alerts are being missed" },
  { id: 'prob-30', text: "We lack predictive insights for growth" }
];
