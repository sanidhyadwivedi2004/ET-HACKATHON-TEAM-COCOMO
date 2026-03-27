import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Cookie Policy — The Economic Times AI" };
export default function CookiePolicy() {
  return (
    <LegalPage
      title="Cookie Policy"
      subtitle="Last updated: March 26, 2026 | How we use cookies and similar technologies."
      sections={[
        { heading: "What Are Cookies", body: "Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site. Cookies allow us to recognise your device and store some information about your preferences or past actions on our platform." },
        { heading: "How We Use Cookies", body: "The Economic Times AI News Experience uses cookies for the following purposes: (a) Essential Cookies — necessary for the platform to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences or logging in; (b) Performance Cookies — allow us to count visits and traffic sources so we can measure and improve the performance of our platform; (c) Personalisation Cookies — enable the platform to provide enhanced functionality and personalisation, including remembering your profile preferences for AI features; (d) Analytics Cookies — help us understand how visitors interact with our platform by collecting and reporting information anonymously." },
        { heading: "Third-Party Cookies", body: "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the platform and deliver advertisements on and through the platform. These include cookies from Google Analytics, Adobe Analytics, and advertising partners. These third parties have their own privacy policies addressing how they use such information." },
        { heading: "Managing Cookies", body: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work. To manage cookies, please refer to your browser's help documentation or visit www.aboutcookies.org." },
        { heading: "Contact", body: "If you have any questions about our use of cookies, please contact us at privacy@economictimes.com or write to: Data Protection Officer, Bennett, Coleman & Co. Ltd., The Times of India Building, Dr. D.N. Road, Mumbai — 400 001." },
      ]}
    />
  );
}
