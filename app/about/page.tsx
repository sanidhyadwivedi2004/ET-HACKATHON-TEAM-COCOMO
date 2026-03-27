import LegalPage from "@/components/LegalPage";
export const metadata = { title: "About — The Economic Times AI News Experience" };
export default function About() {
  return (
    <LegalPage
      title="About ET AI News Experience"
      subtitle="Reimagining business journalism for the AI era."
      sections={[
        { heading: "About The Economic Times", body: "The Economic Times, published by Bennett, Coleman & Co. Ltd. (The Times Group), is India's largest business newspaper and one of the world's most-read English-language business publications. Founded in 1961, ET has been the definitive source of business, financial, and economic news for India's decision-makers, investors, entrepreneurs, and professionals for over six decades." },
        { heading: "The AI News Experience", body: "The Economic Times AI News Experience is a next-generation news platform that combines ET's unparalleled editorial depth with the power of artificial intelligence. Built for 2026, this platform reimagines how business news is consumed — moving from static text articles to dynamic, personalised, interactive intelligence. Every feature is designed to save time, deepen understanding, and surface insights that matter to you specifically." },
        { heading: "Our AI Features", body: "The platform offers five core AI-powered features: My ET (personalised newsroom that adapts to your professional profile), News Navigator (interactive intelligence briefings that synthesise multiple articles into one explorable document), Story Arc Tracker (visual narrative intelligence for ongoing business stories), Vernacular Engine (culturally adapted business news in Hindi, Tamil, Telugu, and Bengali), and Live Feed (an infinite, always-fresh stream of AI-curated business news)." },
        { heading: "Technology", body: "The Economic Times AI News Experience is powered by Google's Gemini AI, one of the world's most advanced large language models. All AI features are built on ET's proprietary editorial data and knowledge base, ensuring that AI-generated content reflects the accuracy, depth, and perspective that ET readers expect. The platform is built with Next.js and deployed on enterprise-grade infrastructure." },
        { heading: "Editorial Standards", body: "While AI powers the personalisation and synthesis features of this platform, all underlying news content is produced by The Economic Times' editorial team of over 500 journalists across India and the world. AI is used to enhance, not replace, human journalism. Our editorial standards, fact-checking processes, and journalistic ethics remain unchanged." },
        { heading: "Contact", body: "For editorial queries: edit@economictimes.com | For technical support: support@et-ai.com | For advertising: ads@economictimes.com | For partnerships: partnerships@economictimes.com | Registered Office: Bennett, Coleman & Co. Ltd., The Times of India Building, Dr. D.N. Road, Mumbai — 400 001, Maharashtra, India." },
      ]}
    />
  );
}
