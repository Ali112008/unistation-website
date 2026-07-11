import Image from "next/image";
import Link from "next/link";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ScrollAnimator, SectionHeading } from "@/components/shared";
import {
  CheckCircle2,
  BookOpen,
  Users,
  Clock,
  CalendarDays,
  Shuffle,
  Award,
  Target,
} from "lucide-react";

const whatYouLearn = [
  "Academic vocabulary & formal language",
  "Understanding university lectures",
  "Academic writing & report writing",
  "Reading and analyzing academic texts",
  "Speaking for academic discussion & presentations",
];

const exams = ["TestDaF", "DSH", "Goethe-Zertifikat B2/C1"];

const whoItsFor = [
  "Students planning to study in Germany",
  "German university preparation program applicants",
  "Professionals needing academic-level German",
];

const courseDetails = [
  { icon: BookOpen, label: "Levels", value: "A1 to C1" },
  { icon: Users, label: "Format", value: "Online" },
  { icon: Clock, label: "Schedule", value: "Weekdays or Weekends" },
  { icon: CalendarDays, label: "Next Intake", value: "Jan 2025" },
  { icon: Target, label: "Extras", value: "Free placement test, flexible rescheduling" },
];

const fees = [
  { level: "A1", category: "Beginner", duration: "6 Weeks", price: "1,799 AED" },
  { level: "A2", category: "Beginner", duration: "8 Weeks", price: "1,999 AED" },
  { level: "B1", category: "Intermediate", duration: "10 Weeks", price: "2,799 AED" },
  { level: "B2", category: "Intermediate", duration: "10 Weeks", price: "2,799 AED" },
  { level: "C1", category: "Advanced", duration: "10 Weeks", price: "2,799 AED" },
];

export default function GermanCoursePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image src="https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1920&h=600&fit=crop" alt="Brandenburg Gate Berlin" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <span className="text-4xl mb-4 block">🇩🇪</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">German for Academic Purposes</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">Prepare for university study in Germany and other German-speaking countries with our specialized German language program.</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">A1 – C1</span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">100% Online</span>
            <span className="px-4 py-2 bg-brand-teal/20 backdrop-blur-sm rounded-full text-brand-teal-light text-sm">AED 1,799 – 2,799</span>
          </div>
        </div>
      </section>

      {/* Course Description */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <p className="text-gray-600 leading-relaxed text-lg">
              Our German for Academic Purposes course is designed to help students meet the language requirements for university admission and achieve academic success in German-speaking countries.
            </p>
          </ScrollAnimator>

          {/* What You'll Study */}
          <ScrollAnimator delay={100}>
            <h2 className="text-2xl font-bold text-brand-navy mt-12 mb-6">What You&apos;ll Study</h2>
            <div className="grid gap-3">
              {whatYouLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-6 h-6 bg-brand-teal/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>

          {/* Exam Preparation */}
          <ScrollAnimator delay={150}>
            <h2 className="text-2xl font-bold text-brand-navy mt-12 mb-4">Exam Preparation</h2>
            <p className="text-gray-600 mb-4">We prepare you for the official language tests accepted by German universities:</p>
            <div className="flex flex-wrap gap-3">
              {exams.map((exam) => (
                <span key={exam} className="px-4 py-2 bg-brand-teal/10 text-brand-teal font-medium rounded-full text-sm">{exam}</span>
              ))}
            </div>
          </ScrollAnimator>

          {/* Who It's For */}
          <ScrollAnimator delay={200}>
            <h2 className="text-2xl font-bold text-brand-navy mt-12 mb-6">Who It&apos;s For</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {whoItsFor.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading title="Course Details" subtitle="Everything You Need to Know" />
          </ScrollAnimator>
          <ScrollAnimator delay={150}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
              {courseDetails.map((detail) => (
                <div key={detail.label} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <detail.icon className="w-5 h-5 text-brand-teal" />
                    <h3 className="font-bold text-brand-navy">{detail.label}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{detail.value}</p>
                </div>
              ))}
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Course Fees */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <SectionHeading title="Course Fees" subtitle="Invest in Your Academic Future" />
          </ScrollAnimator>
          <ScrollAnimator delay={150}>
            <div className="mt-12 overflow-x-auto rounded-xl border shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-brand-navy hover:bg-brand-navy">
                    <TableHead className="text-white font-semibold">Level</TableHead>
                    <TableHead className="text-white font-semibold">Category</TableHead>
                    <TableHead className="text-white font-semibold">Duration</TableHead>
                    <TableHead className="text-white font-semibold">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map((row) => (
                    <TableRow key={row.level} className={row.level === "B1" ? "bg-teal-50 font-medium" : ""}>
                      <TableCell className="text-brand-navy font-semibold">{row.level}</TableCell>
                      <TableCell className="text-gray-600">{row.category}</TableCell>
                      <TableCell className="text-gray-600">{row.duration}</TableCell>
                      <TableCell className="text-brand-teal font-semibold">{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollAnimator>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimator>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your German Journey?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Fill out the form and our team will get back to you with everything you need to begin.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white hover:bg-gray-100 text-brand-teal font-semibold rounded-lg transition-colors"
            >
              Enroll Now
            </Link>
          </ScrollAnimator>
        </div>
      </section>
    </>
  );
}