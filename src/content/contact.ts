export const contactEmail = "clearsight.initiative@gmail.com";

export const contactPage = {
  title: "Contact & Feedback",
  intro:
    "Have a question, suggestion, or feedback about ClearSight? We’d love to hear from you. Email our team or complete our progress check below.",
  emailHeading: "Email",
  emailSupport:
    "Reach out with questions, resource suggestions, website issues, or interest in supporting ClearSight’s mission.",
  emailButton: "Email ClearSight",
  privacy:
    "Please do not include passwords, financial information, or other sensitive personal information.",
  formHeading: "Help Us Improve ClearSight",
  formBody:
    "Share your experience with ClearSight through our progress check. Your feedback helps us understand what is useful and what we can improve.",
  formHost: "This progress check is hosted on Google Forms.",
  formFallback: "Open progress check in a new tab",
} as const;

export const progressCheckUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSeIdoqNMeng1ggHpcD_J-AJ6TJ9cEzb182iFVscW_J9jiI2LQ/viewform";

export const progressCheckEmbedUrl = `${progressCheckUrl}?embedded=true`;

export const contactMeta = {
  title: "Contact & Feedback | ClearSight",
  description: "Email ClearSight or open the progress check hosted on Google Forms.",
} as const;
