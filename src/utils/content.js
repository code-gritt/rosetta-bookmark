import ArrowSwap from "../components/icons/ArrowSwap";
import CardSlash from "../components/icons/CardSlash";
import Cloud from "../components/icons/Cloud";
import DollarCircle from "../components/icons/DollarCircle";
import Import from "../components/icons/Import";
import Integrate from "../components/icons/Integrate";
import MagicPen from "../components/icons/MagicPen";
import Microphone from "../components/icons/Microphone";
import Note from "../components/icons/Note";
import Organization from "../components/icons/Organization";
import Search from "../components/icons/Search";
import Slack from "../components/icons/Slack";
import SMSNotification from "../components/icons/SMSNotification";
import TwoUsers from "../components/icons/TwoUsers";
import Lock from "../components/icons/Lock";

const navigationLinks = [
  {
    id: 1,
    link: "Home",
    href: "#",
  },
  {
    id: 2,
    link: "Pricing",
    href: "#",
  },
  {
    id: 3,
    link: "About",
    href: "#",
  },
  {
    id: 4,
    link: "Community",
    href: "#",
  },
];

const reviews = [
  {
    id: 1,
    src: new URL("../assets/headshots/img-11.webp", import.meta.url),
    alt: "Rachel Foster",
  },
  {
    id: 2,
    src: new URL("../assets/headshots/img-7.webp", import.meta.url),
    alt: "Emily Thompson",
  },
  {
    id: 3,
    src: new URL("../assets/headshots/img-5.webp", import.meta.url),
    alt: "Daniel Harris",
  },
  {
    id: 4,
    src: new URL("../assets/headshots/img-9.webp", import.meta.url),
    alt: "Sarah Lee",
  },
  {
    id: 5,
    src: new URL("../assets/headshots/img-15.webp", import.meta.url),
    alt: "Lucas King",
  },
];

const logos = [
  {
    id: 1,
    src: new URL("../assets/logos/Netflix.webp", import.meta.url),
    alt: "Netflix Logo",
  },
  {
    id: 2,
    src: new URL("../assets/logos/ExxonMobile.webp", import.meta.url),
    alt: "Exxon Mobile Logo",
  },
  {
    id: 3,
    src: new URL("../assets/logos/Microsoft.webp", import.meta.url),
    alt: "Microsoft Logo",
  },
  {
    id: 4,
    src: new URL("../assets/logos/Vice.webp", import.meta.url),
    alt: "Vice Logo",
  },
  {
    id: 5,
    src: new URL("../assets/logos/Walmart.webp", import.meta.url),
    alt: "Walmart Logo",
  },
  {
    id: 6,
    src: new URL("../assets/logos/Chase.webp", import.meta.url),
    alt: "Chase Logo",
  },
  {
    id: 7,
    src: new URL("../assets/logos/Visa.webp", import.meta.url),
    alt: "Visa Logo",
  },
  {
    id: 8,
    src: new URL("../assets/logos/Amazon.webp", import.meta.url),
    alt: "Amazon Logo",
  },
];

const frequentlyAskedQuestions = [
  {
    category: "General",
    id: 1,
    questions: [
      {
        id: 1,
        alt: "Bookmark Icon",
        Icon: Note,
        question: "What is Rosetta?",
        answer:
          "Rosetta is a modern knowledge manager built for researchers, developers, and creators. \
          It helps you save bookmarks, capture snippets, and organize insights so you can retrieve \
          them instantly when you need them.",
      },
      {
        id: 2,
        alt: "Magic Sorting Icon",
        Icon: MagicPen,
        question: "How does Rosetta make knowledge management easier?",
        answer:
          "Rosetta automatically organizes your bookmarks and snippets with tags, collections, and \
          powerful search. Its smart filters and contextual organization help you quickly resurface \
          the right resource, whether it’s a paper, article, or piece of code.",
      },
      {
        id: 3,
        alt: "Two Users Icon",
        Icon: TwoUsers,
        question: "Can Rosetta be used for team collaboration?",
        answer:
          "Yes! Rosetta is designed for both individuals and teams. You can share collections, \
          collaborate on research, and build shared knowledge bases. It’s perfect for labs, dev teams, \
          and content creators working together.",
      },
      {
        id: 4,
        alt: "Cloud Icon",
        Icon: Cloud,
        question: "Can I access Rosetta across devices?",
        answer:
          "Absolutely. Rosetta works on web, desktop, and mobile, syncing seamlessly across platforms. \
          Your bookmarks and snippets are always available and always up to date.",
      },
    ],
  },
  {
    id: 2,
    category: "Pricing",
    questions: [
      {
        id: 5,
        alt: "Dollar Circle Icon",
        Icon: DollarCircle,
        question: "What pricing plans does Rosetta offer?",
        answer:
          "Rosetta offers flexible pricing for individuals and teams. There’s a free plan for personal use, \
          and premium plans that unlock advanced features like unlimited collections, team spaces, \
          and enhanced integrations. Full details are on our Pricing page.",
      },
      {
        id: 6,
        alt: "Card Slash Icon",
        Icon: CardSlash,
        question: "Is there a free trial available for Rosetta?",
        answer:
          "Yes! You can try Rosetta’s premium features free for 14 days before deciding on a paid plan. \
          No credit card required to get started.",
      },
      {
        id: 7,
        alt: "Arrow Swap Icon",
        Icon: ArrowSwap,
        question: "Can I change or cancel my subscription anytime?",
        answer:
          "Of course. You can upgrade, downgrade, or cancel your Rosetta subscription anytime from your account settings. \
          If you cancel, you’ll keep access until the end of your current billing cycle.",
      },
      {
        id: 8,
        alt: "Lock Icon",
        Icon: Lock,
        question: "Is my payment information secure with Rosetta?",
        answer:
          "Yes, Rosetta uses industry-standard encryption and secure payment gateways. \
          Your payment details are never stored directly by us. We’re GDPR-compliant \
          and follow best practices in data protection.",
      },
    ],
  },
  {
    id: 3,
    category: "Features",
    questions: [
      {
        id: 9,
        alt: "Organization Icon",
        Icon: Organization,
        question: "How does Smart Collections work?",
        answer:
          "Rosetta’s Smart Collections automatically organize your saved links and snippets \
          using tags, sources, and context. No more endless folders — your knowledge base \
          stays structured and easy to explore.",
      },
      {
        id: 10,
        alt: "Notification Icon",
        Icon: SMSNotification,
        question: "Can Rosetta remind me about important research?",
        answer:
          "Yes. You can set reminders for articles, papers, or tasks linked to your snippets. \
          Rosetta helps you stay on track with deadlines, projects, or follow-ups.",
      },
      {
        id: 11,
        alt: "Clipper Icon",
        Icon: Microphone,
        question: "Does Rosetta support quick clipping while browsing?",
        answer:
          "Definitely. With the Rosetta browser extension, you can save links, highlight snippets, \
          or capture notes directly from any webpage — without breaking your flow.",
      },
      {
        id: 12,
        alt: "Search Icon",
        Icon: Search,
        question: "How powerful is Rosetta’s search?",
        answer:
          "Rosetta’s search is built to handle scale. You can find saved content by keyword, source, \
          tag, or even context. Whether it’s a snippet from months ago or a paper title, \
          Rosetta surfaces it in seconds.",
      },
    ],
  },
  {
    id: 4,
    category: "Integrations",
    questions: [
      {
        id: 13,
        alt: "Integration Icon",
        Icon: Organization,
        question: "What integrations does Rosetta support?",
        answer:
          "Rosetta connects with tools like Notion, Obsidian, Slack, and Google Drive, \
          so your saved resources fit naturally into your existing workflow.",
      },
      {
        id: 14,
        alt: "Integrate Icon",
        Icon: Integrate,
        question: "Will Rosetta add more integrations in the future?",
        answer:
          "Yes! We’re continuously expanding integrations. Popular requests include Zotero, \
          Mendeley, and more developer tools — check our roadmap for updates.",
      },
      {
        id: 15,
        alt: "Import Icon",
        Icon: Import,
        question: "Can I import my bookmarks or notes from other platforms?",
        answer:
          "Absolutely. You can import data from services like Pocket, Evernote, and browser exports. \
          Migrating your knowledge base to Rosetta is seamless.",
      },
      {
        id: 16,
        alt: "Slack Icon",
        Icon: Slack,
        question: "Does Rosetta integrate with Slack or team apps?",
        answer:
          "Yes, Rosetta integrates with Slack so you can share saved resources or snippets directly into channels. \
          More team integrations are coming soon.",
      },
    ],
  },
];

export default frequentlyAskedQuestions;

const testimonials = [
  {
    id: 1,
    rating: 4,
    description:
      "Rosetta has completely changed how I manage bookmarks across projects. The AI-powered organization feature makes it effortless to find the right link, even weeks later.",
    src: new URL("../assets/headshots/img-7.webp", import.meta.url),
    name: "Emily Thompson",
    title: "Senior Manager",
  },
  {
    id: 2,
    rating: 5,
    description:
      "As a designer, I save tons of inspiration from around the web. Rosetta’s browser extension and quick-save feature are game-changers for keeping everything neatly categorized.",
    src: new URL("../assets/headshots/img-3.webp", import.meta.url),
    name: "Michael Carter",
    title: "Product Designer",
  },
  {
    id: 3,
    rating: 5,
    description:
      "I love how Rosetta integrates with Slack and Notion. Sharing curated links with my team is seamless, and the AI tags keep everything searchable and organized.",
    src: new URL("../assets/headshots/img-9.webp", import.meta.url),
    name: "Sarah Lee",
    title: "Business Analyst",
  },
  {
    id: 4,
    rating: 4,
    description:
      "The smart categorization is impressive. I used to waste time digging through endless bookmarks, but Rosetta’s automatic tagging has streamlined my workflow.",
    src: new URL("../assets/headshots/img-4.webp", import.meta.url),
    name: "Jonathan Moore",
    title: "Software Engineer",
  },
  {
    id: 5,
    rating: 4,
    description:
      "Managing multiple projects is so much easier with Rosetta. I can quickly create collections for each client, and the sharing features keep everyone on the same page.",
    src: new URL("../assets/headshots/img-15.webp", import.meta.url),
    name: "Rachel Foster",
    title: "Project Manager",
  },
  {
    id: 6,
    rating: 5,
    description:
      "As a startup founder, my days are packed. Rosetta’s quick-save from mobile means I never lose an article, tool, or resource. The synced library is a lifesaver.",
    src: new URL("../assets/headshots/img-5.webp", import.meta.url),
    name: "Daniel Harris",
    title: "Entrepreneur",
  },
  {
    id: 7,
    rating: 4,
    description:
      "I’ve tried many bookmark managers, but none compare to Rosetta. The AI-driven tagging saves me hours every week and makes my content library actually usable.",
    src: new URL("../assets/headshots/img-1.webp", import.meta.url),
    name: "Olivia Carter",
    title: "Content Strategist",
  },
  {
    id: 8,
    rating: 5,
    description:
      "Saving design inspiration has never been easier. Rosetta’s browser extension is seamless, and I love the integration with Trello and Slack for sharing with my team.",
    src: new URL("../assets/headshots/img-6.webp", import.meta.url),
    name: "Thomas Williams",
    title: "UX/UI Designer",
  },
  {
    id: 9,
    rating: 4,
    description:
      "During client calls, I often need past research links quickly. Rosetta’s contextual search makes retrieval instant—it’s completely changed how I prepare for meetings.",
    src: new URL("../assets/headshots/img-8.webp", import.meta.url),
    name: "Jessica Gonzalez",
    title: "Sales Executive",
  },
  {
    id: 10,
    rating: 5,
    description:
      "Rosetta’s integrations are a huge time-saver. Syncing collections with Google Drive and Notion has streamlined how I share resources with my team.",
    src: new URL("../assets/headshots/img-13.webp", import.meta.url),
    name: "Aaron Mitchell",
    title: "Customer Support",
  },
  {
    id: 11,
    rating: 4,
    description:
      "Rosetta is a lifesaver for organizing reference material. Instead of messy browser folders, I now have clean collections categorized automatically.",
    src: new URL("../assets/headshots/img-10.webp", import.meta.url),
    name: "Grace Stevens",
    title: "HR Manager",
  },
  {
    id: 12,
    rating: 4,
    description:
      "As a writer, I’m constantly saving articles and research. Rosetta makes it simple to store, tag, and revisit sources while drafting new pieces.",
    src: new URL("../assets/headshots/img-14.webp", import.meta.url),
    name: "Ben Turner",
    title: "Freelance Writer",
  },
  {
    id: 13,
    rating: 5,
    description:
      "With Rosetta, I can collect and organize marketing inspiration, competitor research, and campaign ideas in one place. The reminders ensure I never miss a deadline.",
    src: new URL("../assets/headshots/img-12.webp", import.meta.url),
    name: "Katherine Evans",
    title: "Marketing Director",
  },
  {
    id: 14,
    rating: 4,
    description:
      "As a CEO juggling multiple initiatives, Rosetta helps me keep critical resources structured. The seamless Slack integration makes team collaboration much easier.",
    src: new URL("../assets/headshots/img-15.webp", import.meta.url),
    name: "Lucas King",
    title: "CEO",
  },
  {
    id: 15,
    rating: 5,
    description:
      "Rosetta has become my go-to for collecting creative references. The AI categorization and clean collections keep me focused and organized during every project.",
    src: new URL("../assets/headshots/img-2.webp", import.meta.url),
    name: "Natalie James",
    title: "Graphic Designer",
  },
];

const footerCols = [
  {
    id: 1,
    category: "Home",
    links: ["FAQ", "Features", "Companies", "Testimonials"],
  },
  {
    id: 2,
    category: "Pricing",
    links: ["Plans", "Billing", "Free Trial", "Refunds"],
  },
  {
    id: 3,
    category: "About",
    links: ["Careers", "Our Story", "Contact", "Policy"],
  },
  {
    id: 4,
    category: "Community",
    links: ["Forum", "Stories", "Blog", "Support"],
  },
];

const features = {
  SmartOrganization: {
    alt: "Smart Organization graphic",
    heading: "Smart Organization",
    description:
      "Automatically categorize and tag your bookmarks and snippets with AI. \
      Rosetta intelligently detects topics, sources, and content type, making it \
      effortless to organize and retrieve resources when you need them most.",
  },
  ContextualReminders: {
    alt: "Contextual Reminders graphic",
    heading: "Contextual Reminders",
    description:
      "Never lose track of important resources again. Rosetta recognizes deadlines, \
      projects, and follow-ups tied to your saved links or snippets, sending you \
      timely alerts so nothing slips through the cracks.",
  },
};

export {
  navigationLinks,
  reviews,
  logos,
  frequentlyAskedQuestions,
  testimonials,
  footerCols,
  features,
};
