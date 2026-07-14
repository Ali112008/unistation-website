export interface FAQItem {
  q: string;
  a: string;
}

export const pageFaqs: Record<string, FAQItem[]> = {
  about: [
    { q: "What makes UniStation different from other education consultancies?", a: "UniStation combines personalized academic guidance with deep expertise across 25+ study destinations. Our approach is student-centered — we don't just help you apply, we help you build a complete academic profile and make informed decisions about your future." },
    { q: "How long has UniStation been operating?", a: "UniStation was founded in 2014 in Istanbul, Turkiye. Since then, we've helped thousands of students from across the Middle East and North Africa gain admission to top universities worldwide." },
    { q: "Where are UniStation's offices located?", a: "We have offices in Istanbul, Turkiye and Dubai, UAE. We also work with students remotely from anywhere in the region through our online consultation platform." },
    { q: "Does UniStation work with high school students?", a: "Yes, we support students at every stage — from early academic planning in high school to postgraduate applications. The earlier you start, the stronger your profile becomes." },
  ],
  contact: [
    { q: "What is the best way to reach UniStation?", a: "You can reach us through our contact form, by email, or directly via WhatsApp. Our team typically responds within a few hours during business days." },
    { q: "Is the initial consultation free?", a: "Yes, your first consultation with UniStation is completely free. We'll discuss your goals, budget, and preferences to recommend the best path forward." },
    { q: "Can I book a consultation online?", a: "Absolutely. You can schedule a video call with one of our advisors directly through our website. Choose a time that works for you and we'll take care of the rest." },
    { q: "Does UniStation offer in-person consultations?", a: "Yes, we offer in-person consultations at our offices in Istanbul and Dubai. Online consultations via video call are also available for students in other locations." },
  ],
  destinations: [
    { q: "Which countries does UniStation cover for studying abroad?", a: "We cover 25+ study destinations including the UK, USA, Canada, Australia, Germany, Turkiye, Malaysia, and many more across Europe, Asia, and beyond. Each destination page on our website provides detailed information." },
    { q: "How do I choose the right study destination?", a: "The right destination depends on several factors: your budget, preferred language of instruction, career goals, and visa requirements. Our advisors help you evaluate all of these to find the best match." },
    { q: "Are English-taught programs available in non-English speaking countries?", a: "Yes, many universities in countries like Germany, Turkiye, Spain, and the Netherlands offer full or partial English-taught programs. We can help you find the right program for your language preferences." },
    { q: "Does UniStation help with destination-specific requirements?", a: "Yes, each country has its own admission requirements, visa rules, and deadlines. Our team is experienced with the specifics of each destination and will guide you through every requirement." },
  ],
  packages: [
    { q: "What is included in UniStation's service packages?", a: "Our packages typically include university matching, application support, document preparation, visa guidance, and ongoing advisory. Each package is tailored to the destination and level of study." },
    { q: "How do I know which package is right for me?", a: "Our advisors will recommend the best package based on your target destination, program type, and the level of support you need. You can also browse all packages on this page to compare options." },
    { q: "Can I upgrade my package later?", a: "Yes, you can start with a basic package and upgrade as your needs evolve. We'll work with you to ensure you have the right level of support at every stage." },
    { q: "Are there any hidden fees in the packages?", a: "No, we believe in full transparency. All costs are clearly outlined before you commit. University application fees and visa fees are separate and vary by institution." },
  ],
  team: [
    { q: "Who are UniStation's advisors?", a: "Our advisors are experienced education professionals with deep knowledge of international university systems. Many have studied abroad themselves and understand the student experience firsthand." },
    { q: "Can I choose a specific advisor?", a: "You can request a specific advisor based on their expertise or your preferred language. We'll do our best to match you with the best fit for your needs." },
    { q: "What languages do UniStation advisors speak?", a: "Our team speaks Arabic, English, and Turkish, ensuring clear communication with students from across the Middle East and beyond." },
    { q: "How can I contact a specific team member?", a: "You can reach any team member through our main contact channels. Visit their profile page for more details about their specialization and background." },
  ],
  resources: [
    { q: "What type of resources does UniStation provide?", a: "We offer articles, guides, videos, and downloadable materials covering topics like university applications, visa processes, scholarship opportunities, and test preparation strategies." },
    { q: "Are the resources free to access?", a: "Yes, all resources on our website are completely free. We believe in empowering students with the information they need to make informed decisions." },
    { q: "How often are new resources added?", a: "We regularly update our library with new content, especially during peak application seasons. Subscribe to our newsletter to stay informed about new resources and deadlines." },
    { q: "Can I suggest a topic for a future resource?", a: "Absolutely. We welcome suggestions from students. Reach out via our contact form or WhatsApp and let us know what topics you'd like us to cover." },
  ],
  "language-courses": [
    { q: "What language courses does UniStation offer?", a: "We offer preparation courses for English (IELTS, TOEFL), Turkish (TÖMER), German (TestDaF, Goethe), and Spanish (DELE). Each course is designed to help you meet university admission requirements." },
    { q: "Are the courses online or in-person?", a: "We offer both online and in-person options depending on the language and your location. Our online courses are interactive and follow a structured curriculum." },
    { q: "How long does it take to reach the required language level?", a: "The duration depends on your current level and the target proficiency. Most students need 3–12 months of preparation. We'll assess your level and create a realistic study plan." },
    { q: "Do universities accept UniStation's language course certificates?", a: "Our courses prepare you for internationally recognized exams like IELTS, TOEFL, and DELE, which are accepted by universities worldwide. The course itself helps you achieve the score you need." },
  ],
  "tests-exams": [
    { q: "Which standardized tests does UniStation help prepare for?", a: "We provide preparation support for SAT, UCAT, GRE, GMAT, IELTS, TOEFL, and other standardized tests required for university admissions across different destinations." },
    { q: "Do I need to take a standardized test to study abroad?", a: "Requirements vary by country and university. Many UK and US universities require SAT or subject-specific tests, while European universities may focus more on language proficiency. We'll clarify exactly what you need." },
    { q: "How does UniStation's test prep differ from other providers?", a: "Our test preparation is integrated with your overall university application strategy. We don't just teach test content — we help you achieve the scores needed for your target universities and programs." },
    { q: "Can I retake a test if my score isn't high enough?", a: "Yes, most standardized tests can be retaken. We'll help you analyze your first attempt, identify areas for improvement, and prepare more effectively for the next one." },
  ],
  testimonials: [
    { q: "Are the testimonials on this page from real students?", a: "Yes, all testimonials are from real UniStation students who have successfully gone through our programs. We take pride in the authentic experiences shared by our community." },
    { q: "Can I speak with a current or former student?", a: "In some cases, we can connect you with alumni who have agreed to share their experience. Reach out to us and we'll see if we can arrange a conversation." },
    { q: "How many students has UniStation helped so far?", a: "We've helped thousands of students from across the Middle East and North Africa gain admission to universities worldwide since our founding in 2014." },
  ],
  library: [
    { q: "What kind of content can I find in the UniStation Library?", a: "Our library features educational videos, student vlogs, short-form content, and recorded webinars covering study abroad tips, destination guides, application strategies, and student life experiences." },
    { q: "Is the library content updated regularly?", a: "Yes, we add new content regularly. Follow our YouTube channel and check back here for the latest videos and resources." },
    { q: "Can I suggest a topic for a video?", a: "Of course. We love hearing from our community. Send us your topic suggestions via WhatsApp or our contact form and we'll consider them for future content." },
  ],
  "tests-exams/sat": [
    { q: "What is a good SAT score for international students?", a: "A competitive SAT score depends on your target universities. For top-tier US universities, scores above 1400 are competitive. Many mid-range universities accept scores in the 1200–1300 range." },
    { q: "How long should I prepare for the SAT?", a: "Most students need 2–4 months of consistent preparation. We recommend starting early so you have time to retake the test if needed." },
    { q: "Does UniStation provide SAT study materials?", a: "Yes, our SAT preparation package includes practice tests, study guides, and personalized coaching sessions focused on the areas where you need the most improvement." },
    { q: "Is the SAT required for all US universities?", a: "Many US universities have adopted test-optional policies, but strong SAT scores can still strengthen your application significantly, especially for competitive programs and scholarship consideration." },
  ],
  "tests-exams/ucat": [
    { q: "What is the UCAT and who needs to take it?", a: "The University Clinical Aptitude Test (UCAT) is required for admission to most medical and dental programs in the UK. If you're applying to medicine or dentistry in the UK, you'll likely need to take it." },
    { q: "When should I take the UCAT?", a: "The UCAT testing window opens in July and closes in early October each year. You should aim to take it during the summer before your UCAS application deadline." },
    { q: "How does UniStation help with UCAT preparation?", a: "We provide structured UCAT preparation including practice questions, timed mock tests, strategy sessions for each subtest, and personalized feedback to maximize your score." },
    { q: "What is a competitive UCAT score?", a: "UCAT scores vary each year, but generally a total score above 2600–2800 (out of 3600) is considered competitive. We'll help you understand the scoring system and set realistic targets." },
  ],
  "tests-exams/gre": [
    { q: "What is the GRE and do I need it?", a: "The GRE (Graduate Record Examination) is required for many graduate programs, especially in the US. Some business schools accept it as an alternative to the GMAT. Check your target program's requirements." },
    { q: "How is the GRE structured?", a: "The GRE tests verbal reasoning, quantitative reasoning, and analytical writing. The computer-based test takes about 3 hours and 45 minutes to complete." },
    { q: "How long should I prepare for the GRE?", a: "Most students need 2–3 months of preparation. We recommend taking a diagnostic test first to identify your strengths and weaknesses." },
  ],
  "tests-exams/gmat": [
    { q: "What is the GMAT and who needs it?", a: "The GMAT (Graduate Management Admission Test) is primarily required for MBA and business master's programs. Many top business schools worldwide require or recommend it." },
    { q: "How is the GMAT different from the GRE?", a: "The GMAT focuses specifically on business school readiness, while the GRE is more general. The GMAT's quantitative section is generally considered more challenging for business admissions." },
    { q: "What GMAT score do I need for a top MBA program?", a: "Top MBA programs typically look for scores of 700+. However, the score requirement varies, and many programs consider your application holistically." },
  ],
  "tests-exams/ielts": [
    { q: "What IELTS score do I need for university admission?", a: "Most undergraduate programs require IELTS 6.0–6.5, while postgraduate programs often require 7.0+. Specific requirements vary by university and program." },
    { q: "How is the IELTS test structured?", a: "IELTS has four sections: Listening, Reading, Writing, and Speaking. The total test time is about 2 hours and 45 minutes." },
    { q: "How long is an IELTS score valid?", a: "IELTS scores are valid for 2 years from the test date. Plan your test timing to ensure your scores remain valid when you submit your university applications." },
  ],
  "tests-exams/toefl": [
    { q: "What TOEFL score do I need for university admission?", a: "Requirements vary, but most universities require a minimum TOEFL iBT score of 80–100. Competitive programs may require 100+." },
    { q: "Is TOEFL or IELTS better for my application?", a: "Both are widely accepted. The choice depends on your target universities and personal preference. Some students find IELTS more comfortable, while others prefer TOEFL's computer-based format." },
    { q: "How long does TOEFL preparation take?", a: "Most students need 1–3 months of focused preparation depending on their current English level and target score." },
  ],
  "language-courses/english": [
    { q: "What English proficiency exams does UniStation prepare students for?", a: "We prepare students for IELTS and TOEFL — the two most widely accepted English proficiency exams for university admissions worldwide." },
    { q: "What English level do I need to start university preparation?", a: " Ideally, you should be at an intermediate level (B1) when you start. Our courses will help you reach the advanced level (B2–C1) required by most universities." },
    { q: "Do you offer general English courses or only exam preparation?", a: "We offer both general English improvement and targeted exam preparation. Our advisors will recommend the right mix based on your current level and goals." },
  ],
  "language-courses/german": [
    { q: "What level of German do I need to study in Germany?", a: "Most English-taught programs require little to no German. For German-taught programs, you typically need B2 or C1 level. Public universities usually require DSH-2 or TestDaF 4x4." },
    { q: "How long does it take to learn German to university level?", a: "Reaching B2 level typically takes 6–12 months of intensive study. C1 level may take an additional 3–6 months. The timeline depends on your starting level and study intensity." },
    { q: "Does UniStation help with German university entrance qualifications?", a: "Yes, we guide students through the entire process including language preparation, document verification (APS), and university application for German institutions." },
  ],
  "language-courses/turkish": [
    { q: "Do I need to know Turkish to study in Turkiye?", a: "Many universities in Turkiye offer English-taught programs, so Turkish is not always required. However, learning Turkish significantly enhances your daily life and career opportunities in the country." },
    { q: "What Turkish proficiency certificate do universities accept?", a: "Most Turkish universities accept the TÖMER certificate. Our Turkish language courses prepare you specifically for this certification." },
    { q: "How long does it take to reach TÖMER B2 level?", a: "With intensive study, most students reach B2 level in 6–9 months. The exact timeline depends on your starting level and the intensity of the program." },
  ],
  "language-courses/spanish": [
    { q: "Do I need Spanish to study in Spain?", a: "It depends on the program. Private universities often offer English-taught programs with no Spanish requirement. Public universities typically require B2 Spanish proficiency, which can be achieved through a foundation year." },
    { q: "What Spanish proficiency exams are recognized?", a: "The DELE (Diploma de Español como Lengua Extranjera) is the most widely recognized. Many Spanish universities also accept the SIELE certificate." },
    { q: "How does the Spain Foundation Year program work?", a: "The foundation year combines intensive Spanish language study with academic preparation. After completing the program and passing the required exams, you can apply to public universities across Spain." },
  ],
  /* Dynamic page FAQs keyed by slug */
  spain: [
    { q: "Do I need to speak Spanish to study in Spain?", a: "Not necessarily. Private universities offer many English-taught programs. Public universities generally require B2 Spanish, but a foundation year can get you there from scratch." },
    { q: "How much does it cost to study in Spain?", a: "Private university tuition ranges from €6,000 to €25,000 per year. Public university tuition is much lower, between €1,000 and €4,000 per year, making the foundation year route very cost-effective long-term." },
    { q: "What is the foundation year and who is it for?", a: "The foundation year is a preparatory program that builds your Spanish to university level (B2) and prepares you academically for your chosen major. It's ideal for students who want to attend affordable public universities." },
    { q: "Can I work while studying in Spain?", a: "Yes, international students in Spain can work part-time (up to 20 hours per week) during the academic year and full-time during holidays, provided you have the proper student visa." },
    { q: "How long does a bachelor's degree take in Spain?", a: "A bachelor's degree in Spain typically takes 4 years to complete. Some programs like engineering or architecture may take 5 years." },
  ],
  "spain-foundation-year": [
    { q: "How much does the foundation year cost?", a: "The foundation year program costs €4,500 total. This covers intensive Spanish language classes, academic preparation, and exam preparation for university entrance." },
    { q: "How long is the foundation year program?", a: "The program runs for 8–10 months, typically from September/October through June." },
    { q: "What happens after completing the foundation year?", a: "After completing the foundation year and passing the Ministry entrance exams (pruebas de acceso), you can apply to public universities across Spain for your chosen major." },
    { q: "What majors can I pursue after the foundation year?", a: "The foundation year prepares you for three main tracks: Medicine & Health Sciences, Engineering, and Business & Economics. Each track includes specific academic preparation." },
    { q: "Is accommodation included in the foundation year?", a: "Accommodation is not included in the program fee, but our team can help you find suitable housing near your study location." },
    { q: "Do I need any prior Spanish knowledge to join?", a: "No prior Spanish is required. The foundation year is designed to take you from beginner to B2 level through intensive language study." },
  ],
};