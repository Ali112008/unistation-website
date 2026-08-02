import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollAnimator, SectionHeading } from "@/components/shared";
import { LibrarySection } from "@/components/LibrarySection";
import {
  CheckCircle2,
  BookOpen,
  Video,
  Users,
  Award,
  Clock,
  Target,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { getFaqs } from "@/lib/site-content";
import { pageFaqs as fallbackPageFaqs } from "@/data/page-faqs";
import { FAQSection } from "@/components/FAQSection";

const trustItems = [
  "Certified IELTS Trainers",
  "1000+ Students Successfully Trained",
  "Guaranteed +1 Band Score Increase",
  "100% Online — Learn From Anywhere",
  "Free Trial Test & Free Demo Class",
];

const steps = [
  {
    icon: Target,
    title: "Free Trial Test",
    description:
      "Take a free IELTS trial test so we can accurately assess your current band score across all four modules.",
  },
  {
    icon: Video,
    title: "Free Demo Class",
    description:
      "Join a free demo class, no commitment required, and experience our teaching style and course structure firsthand.",
  },
  {
    icon: BookOpen,
    title: "Enroll & Start Learning",
    description:
      "Join the next batch (starting the 5th of the month) and begin your structured, 4-week, 20+ hour online course.",
  },
  {
    icon: Award,
    title: "Guaranteed Results",
    description:
      "We guarantee an increase of at least 1 overall band score by the end of the course.",
  },
];

const whyChoose = [
  {
    icon: BarChart3,
    title: "Guaranteed Score Improvement",
    description:
      "We guarantee a minimum +1 band score increase compared to your trial test result.",
  },
  {
    icon: Video,
    title: "Free Demo Class, No Commitment",
    description:
      "Experience our teaching style and course structure before you enroll — completely free.",
  },
  {
    icon: Target,
    title: "Focused on IELTS Academic",
    description:
      "Our curriculum is built exclusively around IELTS Academic, ensuring targeted and efficient preparation.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from certified IELTS trainers with proven track records of student success.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive, Efficient Curriculum",
    description:
      "A carefully structured 4-week program covering every module and question type.",
  },
  {
    icon: BarChart3,
    title: "Realistic Mock Tests",
    description:
      "Practice with full-length, timed mock tests that simulate real exam conditions.",
  },
  {
    icon: MessageSquare,
    title: "Personalized Feedback",
    description:
      "Receive detailed, individual feedback on your writing and speaking performance.",
  },
  {
    icon: Clock,
    title: "100% Online & Flexible",
    description:
      "Attend live classes from anywhere, with recorded sessions available if you miss a class.",
  },
];

const curriculum = [
  {
    module: "Listening",
    content:
      "Note-taking techniques, identifying distractors, practice with all question types",
  },
  {
    module: "Reading",
    content:
      "Skimming & scanning strategies, time management, tackling True/False/Not Given questions",
  },
  {
    module: "Writing",
    content:
      "Task 1 (charts/graphs/letters) and Task 2 (essays) structuring, grammar accuracy, coherence & cohesion",
  },
  {
    module: "Speaking",
    content:
      "Fluency building, pronunciation coaching, mock interviews with examiner-style feedback",
  },
];

const faqs = [
  {
    q: "When does the next batch start?",
    a: "New batches begin on the 5th of every month.",
  },
  {
    q: "Is this course for Academic or General Training IELTS?",
    a: "We specialize exclusively in IELTS Academic preparation.",
  },
  {
    q: "Is the course online or in-person?",
    a: "The course is 100% online. All classes are held live.",
  },
  {
    q: "How long is the course?",
    a: "The course runs for 4 weeks and includes 20+ hours of live instruction.",
  },
  {
    q: "What is the free trial test?",
    a: "Before you start the course, you'll take a free trial test covering all four modules.",
  },
  {
    q: "Can I try a class before enrolling?",
    a: "Yes — we offer a free demo class with no commitment required.",
  },
  {
    q: "Do you guarantee a score improvement?",
    a: "Yes. We guarantee an increase of at least 1 overall band score.",
  },
  {
    q: "What if I miss a class?",
    a: "All sessions are recorded, so you can catch up anytime.",
  },
  {
    q: "How do I register?",
    a: 'Simply click "Book Your Free Trial Test," and our team will contact you.',
  },
];

export default async function EnglishCoursePage() {
  const allFaqs = await getFaqs();
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=1920&h=600&fit=crop"
            alt="London landmarks"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/70 to-brand-navy/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <span className="text-4xl mb-4 block">🇬🇧</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Achieve Your Target IELTS Academic Score
          </h1>
          <p className="text-brand-teal-light text-xl font-semibold mt-3">
            Guaranteed +1 Band Increase
          </p>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">
            Join our 100% online IELTS Academic preparation course and master
            all four modules — Listening, Reading, Writing, and Speaking — with
            certified instructors.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              All Levels
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
              100% Online
            </span>
            <span className="px-4 py-2 bg-brand-teal/20 backdrop-blur-sm rounded-full text-brand-teal-light text-sm">
              4 Weeks / 20+ Hours
            </span>
          </div>
          <div className="mt-8">
            <a
              href="https://calendly.com/unistation-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors"
            >
              Book Your Free Trial Test
            </a>
          </div>
        </div>
      </section>

      {/* Batch Start Banner */}
      <section className="bg-brand-teal/10 border-b border-brand-teal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-brand-navy font-medium text-sm md:text-base">
            🗓️ New batch starts on the 5th of every month — Reserve your seat
            today!
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-gray-700 text-sm md:text-base"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              title="How It Works"
              subtitle="4 Simple Steps to Your Target Score"
            />
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {steps.map((step, i) => (
              <ScrollAnimator key={step.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-gray-100 h-full">
                  <div className="w-14 h-14 bg-brand-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-brand-teal" />
                  </div>
                  <div className="text-brand-teal font-bold text-sm mb-2">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our IELTS Course */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              title="Why Choose Our IELTS Course"
              subtitle="Everything You Need to Succeed"
            />
          </ScrollAnimator>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {whyChoose.map((item, i) => (
              <ScrollAnimator key={item.title} delay={i * 80}>
                <div className="flex flex-col h-full p-6 rounded-2xl border border-gray-100 hover:border-brand-teal/30 hover:shadow-md transition-all duration-300 bg-white">
                  <div className="w-12 h-12 bg-brand-teal/10 rounded-xl flex items-center justify-center mb-4 shrink-0">
                    <item.icon className="w-6 h-6 text-brand-teal" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              title="Course Curriculum Overview"
              subtitle="Master All Four IELTS Modules"
            />
          </ScrollAnimator>
          <ScrollAnimator delay={150}>
            <div className="mt-12 overflow-x-auto rounded-2xl border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-brand-navy hover:bg-brand-navy">
                    <TableHead className="text-white font-semibold w-1/4">
                      Module
                    </TableHead>
                    <TableHead className="text-white font-semibold">
                      What You&apos;ll Learn
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {curriculum.map((row) => (
                    <TableRow key={row.module}>
                      <TableCell className="text-brand-navy font-semibold">
                        {row.module}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {row.content}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              title="Course Details"
              subtitle="Everything Included in Your IELTS Preparation"
            />
          </ScrollAnimator>
          <ScrollAnimator delay={150}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-brand-navy">Duration</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  4 weeks (20+ hours of live instruction)
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Video className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-brand-navy">Format</h3>
                </div>
                <p className="text-gray-600 text-sm">100% Online</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-brand-navy">Focus</h3>
                </div>
                <p className="text-gray-600 text-sm">IELTS Academic only</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-brand-navy">
                    Batch Start Date
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">5th of every month</p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-brand-navy">Class Size</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Small groups for personalized attention
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-brand-teal" />
                  <h3 className="font-bold text-brand-navy">Includes</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Free trial test, free demo class, official practice materials,
                  mock test access, downloadable resources
                </p>
              </div>
            </div>
          </ScrollAnimator>
          <ScrollAnimator delay={250}>
            <div className="mt-8 p-6 rounded-2xl bg-brand-teal/5 border border-brand-teal/20">
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-brand-teal shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-brand-navy mb-1">Guarantee</h3>
                  <p className="text-gray-600 text-sm">
                    Minimum +1 overall band score increase vs. your trial test
                    result
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimator>
          <ScrollAnimator delay={300}>
            <div className="mt-12 text-center">
              <a
                href="https://calendly.com/unistation-info/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-teal hover:bg-brand-teal-light text-white font-semibold rounded-lg btn-primary-hover transition-colors"
              >
                Secure Your Spot for the Next Batch (Starts 5th of the Month)
              </a>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Got Questions? We Have Answers"
            />
          </ScrollAnimator>
          <ScrollAnimator delay={150}>
            <div className="mt-12">
              <Accordion type="single" collapsible>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-gray-800 hover:text-brand-teal">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Final CTA Section */}
      <LibrarySection topicName="IELTS" tags={["english", "ielts"]} />

      <section className="py-24 bg-brand-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimator>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your IELTS Success Starts on the 5th — Don&apos;t Wait
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Take your free trial test, join a free demo class, and enroll with
              confidence
            </p>
            <a
              href="https://calendly.com/unistation-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-gray-100 text-brand-teal font-semibold rounded-lg transition-colors"
            >
              Book Your Free Trial Test
            </a>
          </ScrollAnimator>
        </div>
      </section>

      <FAQSection faqs={(allFaqs as any)["language-courses/english"] || fallbackPageFaqs["language-courses/english"]} />
    </>
  );
}