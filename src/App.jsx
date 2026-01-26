import React, { useState, useEffect } from "react";
import {
  Terminal,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function App() {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(true);

  const fullText =
    "> importing imagination...\n" +
    "> aligning pixels & logic\n" +
    "> compiling ideas into interfaces\n" +
    "> creative_engine: online ✨";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else clearInterval(timer);
    }, 35);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const c = setInterval(() => setCursor((p) => !p), 500);
    return () => clearInterval(c);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-[#eaeaf0] px-4 sm:px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-14 md:space-y-24">

        {/* TERMINAL */}
       {/* <div className="max-w-4xl mx-auto animate-fadeIn">
          <div className="border border-purple-400/40 rounded-xl overflow-hidden shadow-[0_0_35px_rgba(192,132,252,0.2)]">
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-400/20 text-purple-300 font-mono text-sm">
              <Terminal size={14} />
              creative_os
            </div>
            <div className="p-4 sm:p-6 bg-black/60 font-mono text-purple-300 text-xs sm:text-sm relative">
              <pre className="whitespace-pre-wrap">
                {text}
                {cursor && <span className="text-pink-400">▍</span>}
              </pre>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scan" />
            </div>
          </div>
        </div> */}

        {/* HERO */}
        <section className="text-center animate-slideUp">

          {/* AVATAR */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-purple-400/50 shadow-[0_0_30px_rgba(192,132,252,0.35)]">
                <img
                  src="/profile.png"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-400/20 pointer-events-none" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Gauri Gohad
          </h1>

          <p className="text-purple-300 font-mono mb-3">
            3rd Year B.Tech CSE Student      
            </p>

          {/*<p className="max-w-2xl mx-auto text-white/70">
            I work with large datasets, build scalable data pipelines, and turn raw data into reliable insights using Spark, SQL, and cloud technologies.
          </p> */}

          {/* QUICK OVERVIEW (RECRUITER TL;DR) */}
          {/*<div className="max-w-3xl mx-auto mt-8 bg-white/5 border border-purple-400/20 rounded-xl p-6 text-left">
            <p className="text-purple-300 font-mono text-sm mb-2">
              // quick overview
            </p>
            <ul className="space-y-2 text-white/80">
              <li>• Full-stack developer (React, APIs, Databases)</li>
              <li>• Strong DSA & problem-solving foundation</li>
              <li>• Experience with cloud, data & analytics</li>
              <li>• Actively building real-world projects</li>
            </ul>
          </div> */}

          {/* TAGS */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Python", "SQL", "Java", "React", "Power BI"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-1 rounded-md border border-purple-400/40 bg-purple-400/10 text-purple-300 font-mono text-sm"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* LINKS */}
          <div className="flex justify-center gap-8 mt-8 text-purple-300">
            <a href="https://github.com/gaurig08" target="_blank">
              <Github size={26} />
            </a>
            <a href="https://www.linkedin.com/in/gauri-g" target="_blank">
              <Linkedin size={26} />
            </a>
            <a href="mailto:gaurigohad8@gmail.com">
              <Mail size={26} />
            </a>
          </div>

        {/*  <p className="mt-6 text-sm font-mono text-purple-300/80">
          I’m a Computer Science undergraduate specializing in Big Data Analytics, 
          with hands-on experience in data engineering, machine learning, 
          and full-stack development. I enjoy working close to data — designing pipelines, 
          optimizing queries, and building systems that scale. Currently seeking 
          Data Engineer / Data Analyst / SDE internships.
          </p>

          <p className="mt-6 text-sm font-mono text-purple-300/80">
            // currently exploring scalable systems & advanced React patterns
          </p>*/}

        </section>

        {/* EDUCATION */}
        <Section title="Education">
          <Card>
            <p className="font-semibold text-lg">
              SRM Institute of Science and Technology
            </p>
            <p className="opacity-80">
              B.Tech CSE ( Specialization: Big Data Analytics ) · 2023–2027
            </p>
            <p className="text-sm text-purple-300 font-mono mt-2">
              // CGPA: 9.28 
            </p>
          </Card>
        </Section>

        {/* SKILLS */}
        <Section title="Tech Stack">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              ["Data & Analytics", "Apache Spark, PySpark, ETL Pipelines, Power BI, Tableau"],
              ["Programming", "Java, Python, JavaScript, SQL"],
              ["Databases", "MySQL, PostgreSQL, Cloud Firestore"],
              ["Cloud & Tools", "AWS, GCP, Firebase, Git, GitHub, Vercel"],
              ["Web Development", "React.js, REST APIs, Firebase Authentication"],
            ].map(([k, v]) => (
              <Card key={k}>
                <p className="text-purple-300 font-mono text-sm mb-1">{k}</p>
                <p className="opacity-80">{v}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section title="Projects">
  <div className="space-y-8">
    {/* GeekShelf*/}
    <Project
      title="GeekShelf"
      tech="React · Firebase · REST · Vercel"
      link="https://geek-shelf.vercel.app/"
    >
      <p className="mt-3 space-y-2 text-white/60 text-sm">
       Created a full-stack media tracking web app to allow users to track movies, books, and anime with real-time data synchronization and personalized recommendations.
      </p>
      <ul className="mt-3 space-y-2 text-white/60 text-sm">
        <li>• Developed and deployed the app on Vercel with responsive design and transitions</li>
        <li>• Integrated Firebase Authentication for Google login and real-time Cloud Firestore storage</li>
        <li>• Connected external APIs (TMDB, Google Books, Jikan) using serverless routes to manage API keys securely</li>
        <li>• Implemented CRUD operations, genre classification, and seamless UX for managing media collections</li>
      </ul>
    </Project>

        {/* Amazon Review Sentiment Analysis */}
    <Project
      title="Amazon Review Sentiment Analysis"
      tech="Python · pandas · scikit-learn · Spark concepts · Power BI"
      git="https://github.com/gaurig08/amazon-review-sentiment-analysis"
    >
      <p className="mt-3 space-y-2 text-white/60 text-sm">
        Built a data analytics pipeline to classify customer sentiment from 20,000+ Amazon reviews, helping identify trends and product issues quickly.      
        </p>

      <ul className="mt-3 space-y-2 text-white/60 text-sm">
        <li>• Built an end-to-end sentiment analysis pipeline using Logistic Regression and Random Forest</li>
        <li>• Performed text preprocessing and TF-IDF feature engineering for feature extraction</li>
        <li>• Applied SMOTE oversampling, improving minority-class recall by 18%</li>
        <li>• Visualized sentiment trends and actionable insights with an interactive Power BI dashboard</li>
      </ul>
    </Project>

      {/* Face Recognition System*/}
    <Project
      title="Face Recognition System"
      tech="Python · PCA · scikit-learn · SVM · GridSearchCV"
      git="https://github.com/gaurig08/face-recognition-pca-svm"
    >
      <p className="mt-3 space-y-2 text-white/60 text-sm">
        Developed a machine learning-based face recognition system using the Labeled Faces in the Wild (LFW) dataset for accurate multi-class identification. 
         </p>

      <ul className="mt-3 space-y-2 text-white/60 text-sm">
        <li>• Applied PCA to reduce 1,850-dimensional feature vectors to 150 components, retaining 94.5% variance</li>
        <li>• Optimized an RBF-kernel SVM classifier using GridSearchCV and 5-fold cross-validation</li>
        <li>• Achieved 85% test accuracy and 0.85 F1-score across 7 classes</li>
        <li>• Built a robust ML pipeline for real-time recognition tasks</li>
      </ul>
    </Project>

    {/* Smart Society Management System */}
    <Project
      title="Smart Society Management System"
      tech="React · Node · Express · MySQL"
    >
      <p className="mt-3 space-y-2 text-white/60 text-sm ">
       Developed a role-based management system for residential communities, enabling secure login, efficient workflows, and reliable database operations.
      </p>
      <ul className="mt-3 space-y-2 text-white/60 text-sm ">
        <li>• Designed a role-based access system for Admins, Tenants, and Employees with secure authentication</li>
        <li>• Created a normalized MySQL database (1NF–3NF) with 10+ tables, joins, views, and indexes, reducing query time by ~20%</li>
        <li>• Implemented triggers, cursors, and concurrency controls to ensure ACID compliance and transaction safety</li>
        <li>• Streamlined data workflows for efficient and secure management of community operations</li>
      </ul>
    </Project>



  </div>
</Section>


        {/* DSA */}
        <Section title="Problem Solving">
          <p className="opacity-70 mb-6">
            Consistently strengthening algorithmic thinking and data structures.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CodingCard
              title="LeetCode"
              desc="Interview-focused DSA practice"
              link="https://leetcode.com/u/gaurig08/"
            />
            <CodingCard
              title="CodeChef"
              desc="Competitive programming & algorithms"
              link="https://www.codechef.com/users/gg_08"
            />
          </div>
        </Section>

{/* Certifications */}

<Section title="Certifications">
  <ul className="space-y-3 text-white/70">
    <Cert title="Apache Spark with Databricks" meta="Databricks · Sep 2025" />
    <Cert title="AWS Academy Cloud Foundations" meta="AWS Academy · Sep 2025" />
    <Cert
      title="Introduction to Big Data with Spark & Hadoop"
      meta="IBM (Coursera) · Mar 2025"
    />
    <Cert
      title="Programming in Java"
      meta="NPTEL · IIT Kharagpur · Oct 2024"
    />
    <Cert title="Google Cloud Arcade Program" meta="Google Cloud · Jul–Sep 2024" />
  </ul>
</Section>

{/* Hackathons */}

<Section title="Competitions & Hackathons">
  <ul className="space-y-3 text-white/70">
    <li>
      <span className="text-purple-300">
        Final Round Participant
      </span>{" "}
      — AI/ML Hackathon (PeerHub × CIG IIT Roorkee)
    </li>
    <li>
      <span className="text-purple-300">
        Participant
      </span>{" "}
      — IIT Kharagpur Data Science Hackathon 2025
    </li>
    <li>
      <span className="text-purple-300">
        Final Round Participant
      </span>{" "}
      — Genesis 1.0 Hackathon
    </li>
  </ul>
</Section>

        {/* FOOTER */}
       
<footer className="text-center text-white/50 pb-10 font-mono text-sm space-y-1">
  <div>
    Open to internships
  </div>
  <div>
    Built by Gauri · 2026
  </div>
</footer>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan { animation: scan 4s linear infinite; }

        @keyframes fadeIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp { animation: slideUp 1s ease-out; }
      `}</style>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Section({ title, children }) {
  return (
    <section className="animate-slideUp">
      <h2 className="text-3xl font-bold text-purple-300 mb-4 font-mono">
        {">"} {title}
      </h2>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-400/30 to-transparent mb-8" />
      {children}
    </section>
  );
}

function Card({ children, className = ""  }) {
  return (
    <div className="bg-white/5 border border-purple-400/20 rounded-xl p-6 hover:border-purple-400/40 transition">
      {children}
    </div>
  );
}

function Project({ title, tech, children, link, git }) {
  return (
    <Card className="flex flex-col justify-between h-full">
      {/* Project Title */}
      <h3 className="text-2xl font-semibold flex items-center gap-2 mb-2">
        <ChevronRight size={18} /> {title}
      </h3>

      {/* Tech Stack */}
      {tech && (
        <p className="text-sm text-purple-300 font-mono mb-4">
          {tech}
        </p>
      )}

      {/* Description / Bullets */}
      {children && (
        <div className="flex-1 space-y-2 text-white/70 text-sm mb-4">
          {children}
        </div>
      )}

      {/* Links (Live + GitHub) */}
      {(link || git) && (
        <div className="flex flex-wrap gap-4 mt-auto">
          {link && (
            <a
              href={link}
              target="_blank"
              className="inline-flex items-center gap-1 text-pink-400 hover:translate-x-1 transition"
            >
              View live <ExternalLink size={14} />
            </a>
          )}
          {git && (
            <a
              href={git}
              target="_blank"
              className="inline-flex items-center gap-1 text-pink-400 hover:translate-x-1 transition"
            >
              GitHub <ExternalLink size={14} />
            </a>
          )}
        </div>
      )}
    </Card>
  );
}



function CodingCard({ title, desc, link }) {
  return (
    <a href={link} target="_blank" className="group">
      <Card>
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm text-white/60 font-mono mt-1">{desc}</p>
        <p className="mt-3 text-sm text-pink-400 font-mono group-hover:translate-x-1 transition">
          View profile →
        </p>
      </Card>
    </a>
  );
}

function Cert({ title, meta }) {
  return (
    <li>
      <span className="text-purple-300">{title}</span>
      {meta && <span className="text-white/60"> — {meta}</span>}
    </li>
  );
}

