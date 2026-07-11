"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, GraduationCap, Languages, Heart } from "lucide-react";

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
  qualifications: string;
  languages: string;
  hobbies: string;
}

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [member, setMember] = useState<TeamMember | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/api/webflow?type=team")
      .then((r) => r.json())
      .then((d) => {
        const raw = d.team || [];
        setTeam(raw);
        const found = raw.find(
          (m: TeamMember) => m.slug === slug || m.name.toLowerCase().replace(/\s+/g, "-") === slug
        );
        if (found) setMember(found);
      })
      .catch(() => {});
  }, [slug]);

  if (!member) {
    return (
      <>
        <section className="relative pt-32 pb-20 bg-brand-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-400 text-lg">Loading...</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=600&fit=crop"
            alt="Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-teal-light transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{member.name}</h1>
          <p className="text-brand-teal font-semibold text-lg mt-2">{member.role}</p>
        </div>
      </section>

      {/* Member Detail */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 items-start">
            {/* Photo */}
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-[460px] shadow-lg">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl text-gray-400 font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <div className="brand-line mb-6" />
              {member.bio ? (
                <div
                  className="text-gray-600 leading-relaxed prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: member.bio }}
                />
              ) : (
                <p className="text-gray-400 italic">No bio available yet.</p>
              )}

              {/* Qualifications, Languages, Hobbies */}
              {(member.qualifications || member.languages || member.hobbies) && (
                <div className="mt-8 pt-6 border-t border-gray-200 grid sm:grid-cols-3 gap-6">
                  {member.qualifications && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> Qualifications
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{member.qualifications}</p>
                    </div>
                  )}
                  {member.languages && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Languages className="w-4 h-4" /> Languages
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{member.languages}</p>
                    </div>
                  )}
                  {member.hobbies && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4" /> Hobbies
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{member.hobbies}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Contact */}
              {(member.email || member.phone || member.twitter || member.facebook) && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                    Contact
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        {member.phone}
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other Team Members */}
      {team.length > 1 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-8">Other Team Members</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team
                .filter((m) => m.id !== member.id)
                .slice(0, 3)
                .map((m) => (
                  <Link
                    key={m.id}
                    href={`/team/${m.slug || m.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {m.image ? (
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-4xl text-gray-400 font-bold">{m.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-brand-navy">{m.name}</p>
                      <p className="text-brand-teal text-sm">{m.role}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}