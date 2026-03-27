import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Disclaimer — The Economic Times AI" };
export default function Disclaimer() {
  return (
    <LegalPage
      title="Disclaimer"
      subtitle="Important information about the nature and limitations of content on this platform."
      sections={[
        { heading: "General Disclaimer", body: "The information contained on The Economic Times AI News Experience platform is for general information purposes only. The information is provided by Bennett, Coleman & Co. Ltd. and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the platform or the information, products, services, or related graphics contained on the platform for any purpose." },
        { heading: "AI-Generated Content", body: "This platform uses artificial intelligence to generate news summaries, briefings, story analyses, and vernacular adaptations. AI-generated content is produced algorithmically and may not reflect the editorial standards of The Economic Times. Such content may contain factual errors, outdated information, or misinterpretations. Users are strongly advised to refer to original source articles and consult qualified professionals before acting on any AI-generated content." },
        { heading: "Investment and Financial Disclaimer", body: "Nothing on this platform should be construed as an offer to buy or sell, or a solicitation of an offer to buy or sell, any security or investment product. Past performance is not indicative of future results. The Economic Times AI News Experience does not provide personalised investment advice. All investment decisions should be made in consultation with a SEBI-registered investment advisor. The platform is not responsible for any financial losses incurred based on information presented herein." },
        { heading: "Third-Party Links", body: "Through this platform, you may be able to link to other websites which are not under the control of Bennett, Coleman & Co. Ltd. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them." },
        { heading: "Accuracy of Market Data", body: "Market data, stock prices, indices, and financial figures displayed on this platform are sourced from third-party data providers and may be delayed by 15-20 minutes. Real-time data is not guaranteed. Bennett, Coleman & Co. Ltd. shall not be liable for any errors in market data or for any actions taken in reliance on such data." },
      ]}
    />
  );
}
