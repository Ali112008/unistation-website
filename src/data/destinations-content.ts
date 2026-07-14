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
  type:
    | "two-paths"
    | "comparison-table"
    | "who-fits"
    | "majors"
    | "cta"
    | "key-advantages"
    | "student-cities"
    | "why-universities"
    | "things-to-consider"
    | "tuition-table"
    | "living-costs"
    | "post-graduation"
    | "why-unistation";
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
            costItems: [
              { label: "Tuition per year", value: "€6,000 – €25,000" },
              { label: "Highest-cost field", value: "Dentistry" },
            ],
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
  turkey: {
    slug: "turkey",
    heroSubtitle: "World-Class Education at an Affordable Cost",
    heroDescription:
      "Turkey has become one of the most popular study destinations for international students, offering an exceptional combination of high-quality education, affordable tuition fees, modern campuses, and a vibrant student lifestyle.",
    stats: [
      { label: "Universities", value: "250+" },
      { label: "Public Tuition", value: "$500–$5K/yr" },
      { label: "Private Tuition", value: "$1.5K–$9K/yr" },
      { label: "Living Costs", value: "$300–$1K/mo" },
    ],
    overviewTitle: "Why Study in Turkey?",
    overviewParagraphs: [
      "Turkey offers an outstanding balance between educational quality, affordability, and student life, making it one of the fastest-growing destinations for international education. Strategically located between Europe and Asia, Turkey is home to more than 250 universities, welcoming hundreds of thousands of international students each year across undergraduate, master's, and doctoral programs.",
      "Whether you dream of studying Medicine, Dentistry, Pharmacy, Engineering, Business, Computer Science, Architecture, or any other discipline, Turkey offers internationally recognized degrees, excellent academic opportunities, and a welcoming environment where students from around the world can thrive.",
    ],
    additionalSections: [
      {
        type: "key-advantages",
        data: {
          title: "Key Advantages",
          items: [
            "Over 250 public and private universities",
            "Internationally recognized degrees",
            "A wide range of English-taught programs",
            "Affordable tuition fees compared to many European countries",
            "Lower living costs than most Western study destinations",
            "Modern campuses equipped with advanced facilities",
            "Rich cultural heritage and a dynamic student lifestyle",
            "A multicultural environment welcoming students from around the world",
            "Excellent transportation infrastructure and connectivity",
            "Strategic location with easy access to Europe, the Middle East, and Asia",
            "Scholarship opportunities offered by both public and private universities",
            "Relatively straightforward admission procedures for many programs",
            "Opportunities to remain in Turkey after graduation under eligible residency and employment pathways",
          ],
        },
      },
      {
        type: "student-cities",
        data: {
          title: "Best Student Cities in Turkey",
          cities: [
            {
              name: "Istanbul",
              image: "https://sfile.chatglm.cn/images-ppt/603bc208af1c.jpg",
              description:
                "Turkey's largest city and economic powerhouse, Istanbul uniquely spans both Europe and Asia. It is home to many of the country's leading universities, offering exceptional academic opportunities alongside a vibrant international lifestyle.",
            },
            {
              name: "Ankara",
              image: "https://sfile.chatglm.cn/images-ppt/53d279b6c676.jpg",
              description:
                "As Turkey's capital, Ankara is renowned for its prestigious universities, modern infrastructure, and quieter, more student-focused environment.",
            },
            {
              name: "Izmir",
              image: "https://sfile.chatglm.cn/images-ppt/d6628d95f1bf.jpg",
              description:
                "Located on the Aegean coast, Izmir combines high-quality education with a relaxed Mediterranean lifestyle and hosts several respected public and private universities.",
            },
            {
              name: "Antalya",
              image: "https://sfile.chatglm.cn/images-ppt/603bc208af1c.jpg",
              description:
                "Known worldwide for its beautiful coastline, Antalya also offers an expanding selection of universities, making it an attractive destination for students seeking an exceptional quality of life.",
            },
          ],
        },
      },
      {
        type: "why-universities",
        data: {
          title: "Why Choose Turkish Universities?",
          description:
            "Turkish universities have experienced remarkable growth over the past two decades, investing heavily in research, innovation, and international partnerships. Students benefit from internationally recognized qualifications, modern teaching methods, advanced laboratories and research facilities, exchange opportunities through international partnerships, internship and industry collaboration programs, diverse academic programs across all major disciplines, and increasing global university rankings.",
        },
      },
      {
        type: "things-to-consider",
        data: {
          title: "Things to Consider Before Studying in Turkey",
          items: [
            {
              title: "University Quality Varies",
              description:
                "With a large number of institutions, selecting the right university is essential. Expert guidance can make a significant difference in choosing the institution that best matches your academic goals.",
            },
            {
              title: "Competitive Admissions",
              description:
                "Turkey's top public universities can be highly competitive and may require entrance examinations or outstanding academic records.",
            },
            {
              title: "Learning Turkish",
              description:
                "Although many programs are offered in English, learning Turkish is highly recommended. It greatly enhances daily life, clinical training for healthcare students, internship opportunities, and future employment prospects.",
            },
            {
              title: "Living Costs",
              description:
                "While Turkey remains affordable overall, living expenses in Istanbul are generally higher than in other cities.",
            },
            {
              title: "Career Opportunities",
              description:
                "Employment prospects after graduation are strongest for graduates who combine academic qualifications with Turkish language proficiency and relevant professional experience.",
            },
          ],
        },
      },
      {
        type: "tuition-table",
        data: {
          title: "Tuition Fees in Turkey",
          headers: ["", "Non-Medical Programs", "Medical Programs"],
          rows: [
            ["Public Universities", "$500 – $5,000 / year", "$4,000 – $10,000+ / year"],
            ["Private Universities", "$1,500 – $9,000 / year", "$13,000 – $35,000+ / year"],
          ],
          note: "Tuition fees vary depending on the university, program, and scholarship opportunities available.",
        },
      },
      {
        type: "living-costs",
        data: {
          title: "Living Costs",
          amount: "$300 – $1,000 per month",
          factors: ["City", "Accommodation type", "Lifestyle", "Personal spending habits"],
          note: "Students living outside Istanbul often benefit from significantly lower living costs.",
        },
      },
      {
        type: "post-graduation",
        data: {
          title: "Can You Stay in Turkey After Graduation?",
          description: "Yes. International graduates may remain in Turkey through several legal pathways:",
          items: [
            "Obtaining a work permit",
            "Continuing with postgraduate studies",
            "Establishing a business or startup",
            "Transitioning to other eligible residence permits, subject to Turkish immigration regulations",
          ],
        },
      },
      {
        type: "majors",
        data: {
          title: "Popular Degree Programs",
          description: "Turkey offers internationally recognized programs across virtually every academic discipline. Some of the most popular choices among international students include:",
          majors: [
            "Medicine",
            "Dentistry",
            "Pharmacy",
            "Engineering",
            "Computer Science",
            "Artificial Intelligence",
            "Information Technology",
            "Business Administration",
            "Economics",
            "Architecture",
            "Interior Design",
            "Law",
            "Psychology",
            "Nursing",
            "Health Sciences",
          ],
        },
      },
      {
        type: "why-unistation",
        data: {
          title: "Why Apply Through UniStation?",
          description:
            "Choosing the right university is about much more than tuition fees. Our experienced advisors help students make informed decisions based on their academic background, career aspirations, budget, and long-term goals.",
          services: [
            "Personalized university selection",
            "Admission strategy",
            "Application preparation and submission",
            "Scholarship guidance",
            "Document review and legalization",
            "Student visa assistance",
            "Accommodation support",
            "Airport pickup and pre-departure guidance",
            "Ongoing support throughout your studies",
          ],
        },
      },
      {
        type: "cta",
        data: {
          title: "Start Your Journey to Turkey Today",
          description:
            "Whether you're planning to study Medicine, Dentistry, Engineering, Business, or another exciting field, our expert advisors are ready to help you choose the right university and guide you through every stage of the admissions process. Book your free consultation today and take the first step toward studying in Turkey with confidence.",
          disclaimer:
            "Tuition and program figures are approximate ranges for general planning and vary by university, city, and academic year. Confirm exact costs and requirements with each university before applying.",
        },
      },
    ],
  },
};