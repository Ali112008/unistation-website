export interface PackageFeature {
  title: string;
  description: string;
}

export interface PackageTier {
  name: string;
  subtitle: string;
  features: PackageFeature[];
  idealFor: string;
  badge?: "popular" | "best-value";
  price?: string;
}

export interface PackageContent {
  slug: string;
  intro: string;
  countries?: string;
  tiers: PackageTier[];
}

export const packagesContent: Record<string, PackageContent> = {
  "uk": {
    slug: "uk",
    intro:
      "Our UK University Admission Packages are designed for students applying to non-medical programs across the United Kingdom. Whether you need essential application support or comprehensive guidance from start to finish, we have the right package for you.",
    tiers: [
      {
        name: "Basic Package",
        subtitle: "Application Ready",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "We'll take you through the process of choosing the most suitable UK university for your academic profile, personal interests, and future career goals.",
          },
          {
            title: "Personal Statement",
            description:
              "Assistance in crafting persuasive and effective personal statements that showcase your strengths.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "One-to-one mock interviews for traditional panel interviews with constructive feedback and guidance to help you perform with confidence.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Tier 4 visa application support, including documentation, visa interview preparation, and submission.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
        ],
        idealFor:
          "Students who need essential application support and guidance through the UK university admission process.",
      },
      {
        name: "Premium Package",
        subtitle: "Full University Admission Support",
        badge: "popular",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Extensive university consultation to choose the most suitable UK university for your academic profile, personal interests, and future career goals.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare you with all the information required to take the IELTS exam.",
          },
          {
            title: "Personal Statement & Application Guidance",
            description:
              "Detailed feedback and coaching to help you write an effective personal statement that reflects your motivation, academic abilities, and extra-curricular activities.",
          },
          {
            title: "UCAS Application Support",
            description:
              "Assistance with completing and submitting the UCAS application to ensure your application is strong, mistake-free, and meets all criteria.",
          },
          {
            title: "Interview Preparation",
            description:
              "One-to-one mock interviews for traditional panel interviews with constructive feedback and guidance to help you perform with confidence.",
          },
          {
            title: "Profile Building",
            description:
              "Identifying pertinent extracurricular activities, suggesting internships and research opportunities, and guidance on cultivating leadership skills and documenting experiences valued by UK universities.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Tier 4 visa application support, including documentation, visa interview preparation, and submission.",
          },
          {
            title: "Pre-Departure Guidance",
            description:
              "Pre-departure training to ensure a smooth transition into UK life, including familiarization with the healthcare system, accommodation, and student life necessities.",
          },
          {
            title: "Ongoing Support",
            description:
              "From start to finish, ongoing support via email and phone consultations to ensure you're on the right path with each component of the application process.",
          },
        ],
        idealFor:
          "Students who wish to apply to UK universities and need comprehensive help to overcome the competitiveness of admissions. This package will allow them to excel in their application and interviews, and stand out.",
      },
    ],
  },

  "uk-medicine": {
    slug: "uk-medicine",
    intro:
      "Our UK Medicine Package — 'Pathway to Medical School' — is designed for students applying to medical schools in the United Kingdom. It provides end-to-end services for every step of the application, from choosing the perfect medical school to preparing for the rigorous admission tests and interviews.",
    tiers: [
      {
        name: "UK Medicine Package",
        subtitle: "Pathway to Medical School",
        badge: "popular",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Extensive medical school consultation to choose the most suitable UK medical schools for your academic profile, personal interests, and future career goals.",
          },
          {
            title: "UCAT & BMAT Exam Preparation",
            description:
              "Personalized UCAT preparation with a complete plan, practice tests, detailed feedback, and strategies for success. Intensive BMAT preparation (if needed) including mock tests, question breakdowns, and time management strategies.",
          },
          {
            title: "Personal Statement & Application Guidance",
            description:
              "Medical school personal statement coaching with detailed feedback to help you write an effective statement reflecting your motivation for medicine, academic abilities, and extra-curricular activities. Full UCAS application support to ensure your application is strong and mistake-free.",
          },
          {
            title: "MMI & Panel Interview Coaching",
            description:
              "One-to-one mock interviews for the Multiple Mini Interview (MMI) or traditional panel interviews, with constructive feedback and guidance to help you perform with confidence.",
          },
          {
            title: "Profile Building for Medical School",
            description:
              "Identification of pertinent extracurricular activities including volunteering at healthcare organizations, doctor shadowing, and healthcare-related research. Guidance on acquiring hands-on medical experience and cultivating skills valued by medical schools such as teamwork, empathy, problem-solving, and communication.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Tier 4 visa application support, including documentation, visa interview preparation, and submission.",
          },
          {
            title: "Pre-Departure Guidance",
            description:
              "Pre-departure training to ensure a smooth transition into UK life, including familiarization with the healthcare system, accommodation, and student life necessities.",
          },
          {
            title: "Ongoing Support",
            description:
              "From start to finish, ongoing support via email and phone consultations to ensure you're on the right path with each component of the application process, exam studying, and beyond.",
          },
        ],
        idealFor:
          "Students who wish to apply to UK medical schools and need comprehensive help to overcome the competitiveness of medical admissions. This package will allow them to excel in their application, exams, and interviews, and stand out.",
      },
    ],
  },

  "early-bird": {
    slug: "early-bird",
    intro:
      "Are you thinking about studying abroad but feel like it's too early to start? Now is the perfect time to prepare for your university application and secure your future. Don't wait until the last minute — our Early-Bird University Admission Package is here to guide you every step of the way at an unbeatable price! But hurry, this offer is only available for 20 lucky students!",
    tiers: [
      {
        name: "Early-Bird Package",
        subtitle: "Start Your Journey Today — Save Time & Money!",
        badge: "best-value",
        features: [
          {
            title: "University Selection & Application Guidance",
            description:
              "Our expert consultants will help you choose the best universities that match your goals, and guide you through the application process, ensuring you don't miss any deadlines or requirements.",
          },
          {
            title: "Personal Statement & Essay Writing Support",
            description:
              "Craft a standout personal statement with our professional guidance. We'll help you structure, refine, and perfect your essay to make sure you present your best self to universities.",
          },
          {
            title: "CV/Resume Building",
            description:
              "Create a polished, professional CV that showcases your strengths and achievements, aligned with university application standards.",
          },
          {
            title: "Mock Interview Preparation",
            description:
              "Ace your university or scholarship interviews with our mock interview sessions. Get feedback and practice to boost your confidence.",
          },
          {
            title: "Document Preparation & Review",
            description:
              "We'll review your documents like transcripts, recommendation letters, and certificates to make sure everything is in perfect order before submission.",
          },
          {
            title: "Scholarship & Financial Aid Guidance",
            description:
              "Discover scholarship opportunities and learn how to apply for financial aid. Our team will help you maximize your chances of securing funding.",
          },
          {
            title: "Exclusive Access to Helpful Resources",
            description:
              "Get access to guides, templates, and video tutorials that will keep you organized and on track for a successful application.",
          },
        ],
        idealFor:
          "Students who want to get ahead of the competition and start preparing early. Affordable pricing, expert guidance, and peace of mind knowing you're on the right track. Only 20 spots available at this exclusive rate!",
      },
    ],
  },

  europe: {
    slug: "europe",
    intro:
      "Our Europe University Admissions Packages cover a wide range of countries including Italy, Spain, Hungary, Poland, Finland, Czech Republic, Türkiye, Latvia, Lithuania, Malta, Romania, and Georgia. Whether you need essential support or comprehensive guidance, we have the right package for your European university journey.",
    countries: "Italy, Spain, Hungary, Poland, Finland, Czech Republic, Türkiye, Latvia, Lithuania, Malta, Romania, Georgia",
    tiers: [
      {
        name: "Basic Package",
        subtitle: "Application Ready",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "Basic coaching on how to write personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
        ],
        idealFor:
          "Students who need essential support for the application process and some guidance for their IELTS preparation.",
      },
      {
        name: "Standard Package",
        subtitle: "University Admission Essentials",
        badge: "best-value",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "Assistance in crafting persuasive and effective personal statements and motivation letters that showcase the student's strengths.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
        ],
        idealFor:
          "Students seeking a budget-friendly plan with standard services to assist them through the application process. Students who need assistance with university selection, documents, and exam readiness.",
      },
      {
        name: "Premium Package",
        subtitle: "Full University Admission Support",
        badge: "popular",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "University-Specific Entrance Exam Preparation",
            description:
              "Tailored preparation for entrance exams required by particular universities in Europe (e.g., University of Debrecen entrance exam, Charles University's entrance exam, Humanitas University's entrance exam, and more).",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "In-depth assistance with writing effective, impactful personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Pre-Departure Training",
            description:
              "An extensive session to prepare the student for life abroad, including cultural adjustment and practical tips.",
          },
        ],
        idealFor:
          "Students seeking a package deal with total assistance throughout the entire process, including IELTS test preparation, university-specific entrance exams, application advising, and post-application services, in addition to pre-departure preparation.",
      },
    ],
  },

  usa: {
    slug: "usa",
    intro:
      "Our US University Admissions Packages are designed to help students navigate the competitive American university application process. From choosing the right colleges to SAT/IELTS preparation and visa guidance, our packages cover every step of your journey to studying in the United States.",
    tiers: [
      {
        name: "Basic Package",
        subtitle: "Application Ready",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "Basic coaching on how to write personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
        ],
        idealFor:
          "Students who need essential support for the application process and some guidance for their IELTS preparation.",
      },
      {
        name: "Standard Package",
        subtitle: "University Admission Essentials",
        badge: "best-value",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "Assistance in crafting persuasive and effective personal statements and motivation letters that showcase the student's strengths.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
        ],
        idealFor:
          "Students seeking a budget-friendly plan with standard services to assist them through the application process for a university. Students who need minimum assistance with regard to university selection, documents, and exam readiness.",
      },
      {
        name: "Premium Package",
        subtitle: "Full University Admission Support",
        badge: "popular",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "SAT Exam Preparation",
            description:
              "In-depth SAT preparation, including targeted coaching, practice tests, and strategies for tackling each section (Math, Reading, and Writing) to achieve a competitive score.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "In-depth assistance with writing effective, impactful personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Pre-Departure Training",
            description:
              "An extensive session to prepare the student for life abroad, including cultural adjustment and practical tips.",
          },
        ],
        idealFor:
          "Students seeking a package deal with total assistance throughout the entire process, including SAT and IELTS test preparation, university choice, application advising, and post-application services, in addition to pre-departure preparation.",
      },
    ],
  },

  canada: {
    slug: "canada",
    intro:
      "Our Canada University Admissions Packages are designed to help students successfully apply to top Canadian universities. Canada offers world-class education, post-graduation work opportunities, and a welcoming multicultural environment. Let us guide you through every step of your Canadian university journey.",
    tiers: [
      {
        name: "Basic Package",
        subtitle: "Application Ready",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "Basic coaching on how to write personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
        ],
        idealFor:
          "Students who need essential support for the application process and some guidance for their IELTS preparation.",
      },
      {
        name: "Standard Package",
        subtitle: "University Admission Essentials",
        badge: "best-value",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "Assistance in crafting persuasive and effective personal statements and motivation letters that showcase the student's strengths.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
        ],
        idealFor:
          "Students seeking a budget-friendly plan with standard services to assist them through the application process for a university.",
      },
      {
        name: "Premium Package",
        subtitle: "Full University Admission Support",
        badge: "popular",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "SAT Exam Preparation",
            description:
              "In-depth SAT preparation, including targeted coaching, practice tests, and strategies for tackling each section (Math, Reading, and Writing) to achieve a competitive score.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Essay & Motivation Letter Writing Guidance",
            description:
              "In-depth assistance with writing effective, impactful personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Pre-Departure Training",
            description:
              "An extensive session to prepare the student for life abroad, including cultural adjustment and practical tips.",
          },
        ],
        idealFor:
          "Students seeking a package deal with total assistance throughout the entire process, including SAT and IELTS test preparation, university choice, application advising, and post-application services, in addition to pre-departure preparation.",
      },
    ],
  },

  asia: {
    slug: "asia",
    intro:
      "Our Asia University Admissions Packages cover China, Malaysia, and more. Asian universities offer world-class education at competitive prices, with growing numbers of English-taught programs. Let us help you find the right university and guide you through the entire application process.",
    countries: "China, Malaysia",
    tiers: [
      {
        name: "Basic Package",
        subtitle: "Application Ready",
        price: "3,499 AED",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Motivation Letter Writing Guidance",
            description:
              "Basic coaching on how to write personal statements and motivation letters.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
        ],
        idealFor:
          "Students who need essential support for the application process and some guidance for their motivation letter writing.",
      },
      {
        name: "Premium Package",
        subtitle: "Full University Admission Support",
        badge: "popular",
        price: "4,999 AED",
        features: [
          {
            title: "University Shortlisting & Selection",
            description:
              "Inclusive, detailed university selection based on goals, budget, and interests.",
          },
          {
            title: "Documents Preparation & Review",
            description:
              "In-depth assistance with preparing, reviewing, and submitting all the documents required for university admissions.",
          },
          {
            title: "Motivation Letter Writing Guidance",
            description:
              "In-depth assistance with writing effective, impactful personal statements and motivation letters.",
          },
          {
            title: "IELTS Exam Preparation",
            description:
              "Serious, intensive preparation with practice tests, criticism, and recommendations to prepare the student with all the information required to take the IELTS exam.",
          },
          {
            title: "Interview Preparation",
            description:
              "Multiple mock interviews with constructive criticism and improvement suggestions.",
          },
          {
            title: "University Admission",
            description:
              "Complete assistance with application forms, document submission, and follow-up.",
          },
          {
            title: "Visa Application Guidance",
            description:
              "Full support with preparing and submitting student visa applications.",
          },
          {
            title: "Accommodation Arrangement Assistance",
            description:
              "Personal help in organizing accommodation near the university.",
          },
          {
            title: "Pre-Departure Training",
            description:
              "An extensive session to prepare the student for life abroad, including cultural adjustment and practical tips.",
          },
        ],
        idealFor:
          "Students seeking a package deal with total assistance throughout the entire process, including IELTS test preparation, university choice, application advising, and post-application services, in addition to pre-departure preparation.",
      },
    ],
  },
};