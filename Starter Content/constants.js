const navigationLinks = [
  {
    link: "Home",
    href: "#",
  },
  {
    link: "Pricing",
    href: "#",
  },
  {
    link: "About",
    href: "#",
  },
  {
    link: "Community",
    href: "#",
  },
];

const logos = [
  {
    src: new URL("../assets/logos/Netflix.webp", import.meta.url),
    alt: "Netflix Logo",
  },
  {
    src: new URL("../assets/logos/CocaCola.webp", import.meta.url),
    alt: "CocaCola Logo",
  },
  {
    src: new URL("../assets/logos/Visa.webp", import.meta.url),
    alt: "Visa Logo",
  },
  {
    src: new URL("../assets/logos/Microsoft.webp", import.meta.url),
    alt: "Microsoft Logo",
  },
  {
    src: new URL("../assets/logos/Google.webp", import.meta.url),
    alt: "Google Logo",
  },
  {
    src: new URL("../assets/logos/Nike.webp", import.meta.url),
    alt: "Nike Logo",
  },
  {
    src: new URL("../assets/logos/Addidas.webp", import.meta.url),
    alt: "Addidas Logo",
  },
  {
    src: new URL("../assets/logos/ChaseBank.webp", import.meta.url),
    alt: "ChaseBank Logo",
  },
  {
    src: new URL("../assets/logos/Vice.webp", import.meta.url),
    alt: "Vice Logo",
  },
  {
    src: new URL("../assets/logos/Amazon.webp", import.meta.url),
    alt: "Amazon Logo",
  },
];

const features = [
  {
    graphic: new URL(
      "../assets/graphics/SmartOrganization.webp",
      import.meta.url
    ),
    alt: "Smart Organization graphic",
    heading: "Smart Organization",
    description:
      "Automatically categorize and tag your notes using AI-driven analysis. \
      NoteFlow intelligently identifies key topics and organizes your content, \
      making it easy to find and retrieve your notes when you need them most.",
  },
  {
    graphic: new URL(
      "../assets/graphics/ContextualReminders.webp",
      import.meta.url
    ),
    alt: "Contextual Reminders graphic",
    heading: "Contextual Reminders",
    description:
      "Stay on top of important tasks with AI-powered reminders that adapt to the \
      context of your notes. NoteFlow recognizes deadlines, follow-ups, and key actions \
      from your notes and sends timely alerts to ensure nothing slips through the cracks.",
  },
];

const FAQ = [
  {
    category: "General",
    questions: [
      {
        icon: new URL("../assets/icons/note.svg", import.meta.url),
        question: "What is NoteFlow?",
        answer:
          "NoteFlow is an AI-powered note-taking application designed to \
          help individuals and teams organize, manage, and retrieve notes effortlessly.",
      },
      {
        icon: new URL("../assets/icons/magic-pen.svg", import.meta.url),
        question: "How does NoteFlow use AI to enhance note-taking?",
        answer:
          "NoteFlow uses AI to automatically categorize, summarize, and tag your notes, \
          making it easier to find exactly what you need. Its intelligent search functionality \
          helps you locate information by context, keywords, or themes, ensuring that your notes \
          are always organized and accessible.",
      },
      {
        icon: new URL("../assets/icons/two-users.svg", import.meta.url),
        question: "Can NoteFlow be used for team collaboration?",
        answer:
          "Absolutely! NoteFlow is designed to support both individual users and team collaboration. \
          You can share notes, collaborate in real time, assign tasks, and track progress within the platform. \
          This makes it a perfect solution for both personal and professional use.",
      },
      {
        icon: new URL("../assets/icons/cloud.svg", import.meta.url),
        question: "Can I access NoteFlow on multiple devices?",
        answer:
          "Yes, you can access NoteFlow from any device, including your computer, tablet, \
          and smartphone. Our app syncs seamlessly across platforms, so your notes are always \
          up-to-date and available whenever you need them.",
      },
      {
        icon: new URL("../assets/icons/security-safe.svg", import.meta.url),
        question: "Is my data secure with NoteFlow?",
        answer:
          "Yes, your privacy and data security are our top priority. NoteFlow uses industry-standard \
          encryption to protect your notes and information. Additionally, we have strict privacy policies \
          in place to ensure that your data is never shared without your consent.",
      },
    ],
  },
  {
    category: "Pricing",
    questions: [
      {
        icon: new URL("../assets/icons/dollar-circle.svg", import.meta.url),
        question: "What pricing plans does NoteFlow offer?",
        answer:
          "NoteFlow offers several pricing tiers to meet the needs of both individuals and teams. \
          We have a free plan with basic features, as well as premium plans that provide advanced features \
          like unlimited storage, team collaboration tools, and more. You can find detailed information about \
          each plan on our Pricing page.",
      },
      {
        icon: new URL("../assets/icons/card-slash.svg", import.meta.url),
        question: "Is there a free trial available for NoteFlow?",
        answer:
          "NoteFlow offers several pricing tiers to meet the needs of both individuals and teams. \
          We have a free plan with basic features, as well as premium plans that provide advanced features \
          like unlimited storage, team collaboration tools, and more. You can find detailed information about \
          each plan on our Pricing page.",
      },
      {
        icon: new URL("../assets/icons/arrow-swap.svg", import.meta.url),
        question: "Can I change or cancel my subscription anytime?",
        answer:
          "Absolutely! You can upgrade, downgrade, or cancel your subscription at any time through your account \
          settings. If you decide to cancel, you will still have access to your plan’s features until the end of \
          your current billing cycle.",
      },
    ],
  },
  {
    category: "Features",
    questions: [
      {
        icon: new URL("../assets/icons/organization.svg", import.meta.url),
        question: "How does NoteFlow's Smart Organization feature work?",
        answer:
          "NoteFlow's Smart Organization feature uses advanced AI to automatically categorize and tag your notes \
          based on key topics and themes. The AI-driven analysis ensures that your notes are organized in a way that \
           makes them easy to search and retrieve, saving you time when you need to find specific information.",
      },
      {
        icon: new URL("../assets/icons/microphone.svg", import.meta.url),
        question:
          "Can I dictate notes using the Voice-to-Text Transcription feature?",
        answer:
          "Yes! NoteFlow’s Voice-to-Text Transcription feature lets you dictate notes in real time. Whether you’re in a \
           meeting, on the go, or brainstorming ideas, simply speak, and NoteFlow will automatically convert your speech \
           into organized text. This feature makes capturing ideas effortless and hands-free.",
      },
      {
        icon: new URL("../assets/icons/sms-notification.svg", import.meta.url),
        question: "How do Contextual Reminders help me stay on top of tasks?",
        answer:
          "Contextual Reminders use AI to analyze your notes and automatically recognize important tasks, deadlines, \
          and follow-up actions. Based on this analysis, NoteFlow will send you timely reminders to ensure you never \
          miss a critical deadline or action point.",
      },
      {
        icon: new URL("../assets/icons/search.svg", import.meta.url),
        question:
          "Can I search for specific notes or information using the AI-powered features?",
        answer:
          "Yes! With NoteFlow’s intelligent search functionality, you can search for specific keywords, topics, or \
          even context-based information. The AI not only looks for exact matches but also understands the context \
          of your notes, helping you find relevant information quickly and efficiently.",
      },
    ],
  },
  {
    category: "Integrations",
    questions: [
      {
        icon: new URL("../assets/icons/organization.svg", import.meta.url),
        question: "What integrations does NoteFlow support?",
        answer:
          "NoteFlow integrates with a wide range of tools, including popular apps like Google Drive, Microsoft \
          OneDrive, Slack, Trello, and more. These integrations allow you to sync your notes with your existing \
          workflow and collaborate seamlessly across platforms.",
      },
      {
        icon: new URL("../assets/icons/cloud-connection.svg", import.meta.url),
        question:
          "Can I sync my notes with cloud storage services like Google Drive or Dropbox?",
        answer:
          "Yes, NoteFlow allows you to sync your notes with cloud storage services like Google Drive, Dropbox, \
          and OneDrive. This integration ensures that your notes are securely backed up and easily accessible \
          across all your devices.",
      },
      {
        icon: new URL("../assets/icons/slack.svg", import.meta.url),
        question:
          "Does NoteFlow integrate with team collaboration tools like Slack?",
        answer:
          "Absolutely! NoteFlow integrates with Slack, allowing you to share notes and collaborate in real time \
           with your team. You can even create reminders or action items directly from your notes and have them \
           sent to your Slack channels.",
      },
      {
        icon: new URL("../assets/icons/import.svg", import.meta.url),
        question:
          "Can I import existing notes from other platforms into NoteFlow?",
        answer:
          "Yes, you can easily import your existing notes from platforms like Evernote, Google Keep, and Microsoft \
          OneNote into NoteFlow. This ensures a smooth transition without losing any of your important information.",
      },
      {
        icon: new URL("../assets/icons/export.svg", import.meta.url),
        question:
          "Is it possible to export notes from NoteFlow to other formats or apps?",
        answer:
          "Yes, NoteFlow allows you to export your notes in various formats, including PDF, Word, and plain text. \
          You can also export your notes to other apps like Google Docs or Microsoft Word, making it easy to share \
           or further edit your content.",
      },
      {
        icon: new URL("../assets/icons/integrate.svg", import.meta.url),
        question: "Will NoteFlow integrate with other apps in the future?",
        answer:
          "We are always working to expand our integration offerings to meet the needs of our users. We frequently \
           update NoteFlow to support new and popular tools, so be sure to check back for new integrations that may \
           enhance your experience.",
      },
    ],
  },
];

export { navigationLinks, logos, features, FAQ };
