"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimator, SectionHeading, CTASection } from "@/components/shared";

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  twitter: string;
  facebook: string;
}

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/webflow?type=team")
      .then((r) => r.json())
      .then((d) => setTeam(d.team || []))
      .catch(() => {});
  }, []);

  const founder = team[0];
  const rest = team.slice(1);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop" alt="Team" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hero-animate">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-2">The People Behind UniStation</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Our Team</h1>
          <p className="text-gray-300 mt-4 max-w-2xl text-lg">Dedicated professionals with years of experience in international education consulting and student success.</p>
        </div>
      </section>

      {/* Founder */}
      {founder && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <SectionHeading subtitle="Leadership" title="Founder & Director" />
            </ScrollAnimator>
            <ScrollAnimator delay={100}>
              <div className="mt-12 bg-gray-50 rounded-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-start">
                <div className="relative rounded-xl overflow-hidden h-80 md:h-[420px]">
                  {founder.image && (
                    <Image src={founder.image} alt={founder.name} fill className="object-cover" unoptimized />
                  )}
                </div>
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold text-brand-navy">{founder.name}</h2>
                  <p className="text-brand-teal font-semibold mt-1">{founder.role}</p>
                  <div className="brand-line mt-3 mb-6" />
                  {founder.bio && (
                    <div
                      className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: founder.bio }}
                    />
                  )}
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </section>
      )}

      {/* Rest of Team */}
      {rest.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <SectionHeading subtitle="Our Experts" title="Meet the Rest of the Team" />
            </ScrollAnimator>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {rest.map((member, i) => (
                <ScrollAnimator key={member.id} delay={i * 150}>
                  <Card className="border-0 shadow-sm overflow-hidden card-hover h-full">
                    <div className="relative h-72">
                      {member.image && (
                        <Image src={member.image} alt={member.name} fill className="object-cover" unoptimized />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white font-bold text-lg">{member.name}</p>
                        <p className="text-brand-teal-light text-sm">{member.role}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      {member.bio && (
                        <div
                          className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: member.bio }}
                        />
                      )}
                    </CardContent>
                  </Card>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {team.length === 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">Loading team...</p>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}