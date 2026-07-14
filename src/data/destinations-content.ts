export interface DestinationContent {
  slug: string;
  heroSubtitle: string;
  heroDescription: string;
  stats: { label: string; value: string }[];
  overviewTitle: string;
  overviewParagraphs: string[];
  additionalSections: AdditionalSection[];
}

export interface AdditionalSection {
  type: "two-paths" | "comparison-table" | "who-fits" | "majors" | "cta";
  data: Record<string, unknown>;
}

export const destinationsContent: Record<string, DestinationContent> = {
  spain: {
    slug: "spain",
    heroSubtitle: "Two roads lead to a Spanish degree. Only one of them is yours.",
    heroDescription:
      "One path gets you into class next semester, no Spanish required. The other trades a year of preparation for a public-university price tag. Here's exactly how each one works — costs, subjects, and timelines included.",
    stats: [
      { label: "Private Tuition", value: "€6K–25K/yr" },
      { label: "Public Tuition", value: "€1K–4K/yr" },
      { label: "Spanish Required", value: "B2 Level" },
      { label: "Foundation Year", value: "12 Months" },
    ],
    overviewTitle: "Which door do you walk through?",
    overviewParagraphs: [
      "Your budget, your current Spanish level, and how soon you want to start class all point toward one of these two routes. Spain offers international students two distinct pathways to a university degree — each with its own advantages, timeline, and cost structure.",
      "The private university route is built for speed and flexibility: apply directly, often in English, and start soon after finishing high school. The public university route via a foundation year is the economical choice — spend a year building your Spanish and academic footing, then enter some of Europe's most affordable universities.",
    ],
    additionalSections: [
      {
        type: "two-paths",
        data: {
          pathOne: {
            title: "Private Universities",
            subtitle: "Start this fall. No Spanish required.",
            description:
              "Private universities are built for international students who want to begin their degree immediately. Admissions move quickly, several programs run entirely in English, and this is the natural choice if you're moving straight from high school into university.",
            highlights: [
              "No Spanish proficiency required for most programs",
              "English-taught tracks available across multiple universities",
              "Admissions are simpler and faster than the public system",
              "Flexible start dates throughout the year",
              "Ideal if you want to begin university right after graduation",
            ],
            majors: [
              "Dentistry",
              "Pharmacy",
              "Business Administration",
              "Engineering",
              "Computer Science",
              "Psychology",
            ],
            costLabel: "€6,000 – €25,000 per year",
            costNote: "Highest-cost field: Dentistry",
          },
          pathTwo: {
            title: "Public Universities via Foundation Year",
            subtitle: "Learn the language. Earn the degree. Pay a fraction of the cost.",
            description:
              "This is the most economical way into a Spanish public university, and the most common route for students who want a long-term future in Spain. It starts with one foundation year that does two jobs at once: builds your Spanish to university level, and prepares you academically in the subjects your future degree will demand.",
            steps: [
              {
                num: "1",
                title: "Spanish Language",
                desc: "Intensive study up to B2, the level Spanish universities expect.",
              },
              {
                num: "2",
                title: "Academic Preparation",
                desc: "Subject-specific coursework matched to your intended major.",
              },
              {
                num: "3",
                title: "Entrance Exams",
                desc: "Sit the Ministry's admission exams (pruebas de acceso).",
              },
              {
                num: "4",
                title: "Apply to University",
                desc: "Submit applications to public universities across Spain.",
              },
            ],
            tracks: [
              {
                name: "Medicine & Health Sciences",
                subjects: "Biology, Chemistry, Mathematics, Physics",
              },
              {
                name: "Engineering",
                subjects: "Advanced Mathematics, Physics, Chemistry",
              },
              {
                name: "Business & Economics",
                subjects: "Mathematics, Economics, Statistics",
              },
            ],
            costItems: [
              { label: "Foundation year", value: "€4,500 total" },
              { label: "Public university tuition (per year after)", value: "€1,000 – €4,000" },
              { label: "Spanish level reached", value: "B2" },
            ],
          },
        },
      },
      {
        type: "comparison-table",
        data: {
          headers: ["Factor", "Private Universities", "Public via Foundation Year"],
          rows: [
            ["Spanish Required", "Usually none", "Built up to B2 during the year"],
            ["Time to Enrollment", "Weeks", "~1 year of preparation first"],
            ["Yearly Tuition", "€6,000 – €25,000", "€1,000 – €4,000"],
            ["Upfront Prep Cost", "None", "€4,500 foundation year"],
            ["Admissions Process", "Simple, direct", "Foundation year + Ministry entrance exams"],
            ["Best For", "Starting immediately, English-taught study", "Lowest long-term cost, deep integration into Spain"],
          ],
        },
      },
      {
        type: "who-fits",
        data: {
          privateFits: [
            "Ready to start university right after high school",
            "Not planning to learn Spanish beforehand",
            "Looking for an English-taught program",
            "Prioritizing speed over cost",
          ],
          publicFits: [
            "Looking for the lowest possible cost",
            "Willing to spend a year learning a new language",
            "Set on studying at a Spanish public university",
            "Planning to live and work in Spain or Europe long-term",
          ],
        },
      },
      {
        type: "cta",
        data: {
          title: "Not sure which road is yours?",
          description:
            "Tell us your budget, your current Spanish level, and the degree you want — we'll tell you exactly which path gets you there.",
          disclaimer:
            "Tuition and program figures are approximate ranges for general planning and vary by university, city, and academic year. Confirm exact costs and requirements with each university before applying.",
        },
      },
    ],
  },
};