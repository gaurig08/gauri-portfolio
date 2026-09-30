// ───────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update
//  the site. Project facts are taken from each repo's README/code.
// ───────────────────────────────────────────────────────────

export const links = {
  github: "https://github.com/gaurig08",
  linkedin: "https://www.linkedin.com/in/gauri-g",
  email: "gaurigohad8@gmail.com",
  leetcode: "https://leetcode.com/u/gaurig08/",
  codechef: "https://www.codechef.com/users/gg_08",
};

export const stats = [
  { value: "9.33", label: "CGPA" },
  { value: "6", label: "projects shipped" },
  { value: "4", label: "certifications" },
  { value: "2027", label: "graduating" },
];

export const about = [
  {
    tag: "Who",
    title: "4th-year CSE at SRMIST",
    body:
      "B.Tech Computer Science with a Big Data Analytics specialisation, class of 2027. Home is Kota, Rajasthan; college is Chennai.",
  },
  {
    tag: "What I build",
    title: "Pipelines, products, models",
    body:
      "ETL pipelines with star schemas and dashboards, full-stack web apps, and classic ML. I like projects that start from a real question.",
  },
  {
    tag: "Off the clock",
    title: "Series, movies & books",
    body:
      "I love watching series and reading. Keeping track of everything across different apps got messy, so I built GeekShelf.",
  },
  {
    tag: "My rule",
    title: "Only real numbers",
    body:
      "Every metric on this page comes from code I ran. If I haven't used a tool, it doesn't go on my résumé.",
    dark: true,
  },
];

export const featured = {
  id: "geek",
  title: "GeekShelf",
  kind: "Full-stack · Personal project",
  tagline: "One shelf for movies, series, books and anime.",
  image: "projects/geekshelf-room.webp",
  logo: "projects/geekshelf-logo.webp",
  points: [
    "Google sign-in with Firebase Auth; each user's shelf lives in Firestore and syncs in real time",
    "Vercel serverless functions call TMDB, Jikan and Google Books, so API keys never reach the browser",
    "Explainable recommender: ranks titles by genre overlap, weighted by status and favourites; Gemini suggests books",
    "Genres normalised across three APIs into one taxonomy; core utilities covered by unit tests",
  ],
  stack: ["React", "Vite", "Framer Motion", "Firebase", "Vercel Functions", "Gemini API"],
  live: "https://geek-shelf.vercel.app/",
  git: "https://github.com/gaurig08/geek-shelf",
};

// cover.type decides the visual at the top of each card
export const projects = [
  {
    id: "tv",
    title: "Cancelled-Too-Soon Shows",
    kind: "Data pipeline",
    question: "Which genuinely good TV shows got cancelled too early?",
    cover: { type: "ratio", part: 3130, whole: 8293, partLabel: "cancelled too soon", wholeLabel: "shows analysed" },
    points: [
      "ETL over IMDb's public datasets: TV series since 2000 with 1,000+ votes",
      "Flags shows rated 7.0+ that ended within 3 seasons",
      "Star schema (fact_shows + dim_genre) feeding a Power BI dashboard",
    ],
    stack: ["Python", "pandas", "PostgreSQL", "SQL", "Power BI"],
    git: "https://github.com/gaurig08/imdb-cancelled-shows-etl-pipeline",
  },
  {
    id: "wsi",
    title: "Women's Safety Index",
    kind: "Data pipeline",
    question: "How safe is each district, on one comparable score?",
    cover: {
      type: "risk",
      total: 5322,
      parts: [
        { label: "Low", n: 2311 },
        { label: "Moderate", n: 1230 },
        { label: "High", n: 936 },
        { label: "Critical", n: 845 },
      ],
    },
    points: [
      "NCRB data for 751 districts across 36 states, 2017–2022",
      "Severity-weighted 0–100 score across 9 crime types, normalised per year at the 95th percentile",
      "fact_safety + dim_location star schema and a Power BI dashboard",
    ],
    stack: ["Python", "pandas", "Star schema", "Power BI"],
    git: "https://github.com/gaurig08/women-safety-index-analytics-pipeline",
  },
  {
    id: "smw",
    title: "Smart Market Watchlist",
    kind: "Full-stack · Hackathon",
    question: "Is today's price move actually unusual for this stock?",
    cover: { type: "formula" },
    points: [
      "Code by Groww Hackathon: scores each move against the stock's own volatility, not a flat 5% rule",
      "Deterministic, unit-tested scoring engine; shows what changed since your last visit",
      "Gemini explains the computed scores in 11 Indian languages, with a fallback if AI is down",
    ],
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "yfinance", "Gemini API"],
    git: "https://github.com/gaurig08/smart-market-watchlist",
  },
  {
    id: "amz",
    title: "Amazon Review Sentiment",
    kind: "Machine learning",
    question: "Can a model catch the rare negative reviews?",
    cover: { type: "image", src: "projects/amazon-recall.webp", alt: "Bar chart from the project: negative-class recall before and after SMOTE for Logistic Regression and Random Forest" },
    points: [
      "34,626 reviews, only 2.3% negative; TF-IDF (1–2 grams) with Logistic Regression and Random Forest",
      "SMOTE on the training split only lifted negative recall from 20% to 52%",
      "Tuned with 3-fold CV (SMOTE inside the pipeline), plus error analysis of misclassified reviews",
    ],
    stack: ["Python", "scikit-learn", "NLTK", "imbalanced-learn"],
    git: "https://github.com/gaurig08/amazon-review-sentiment-analysis",
  },
  {
    id: "face",
    title: "Face Recognition",
    kind: "Machine learning",
    question: "How far can classic ML go on real face photos?",
    cover: { type: "dims", from: "1,850", to: "150", note: "94.5% variance kept" },
    points: [
      "LFW dataset: 1,288 images of 7 people",
      "PCA (Eigenfaces) to compress features, then an RBF-kernel SVM tuned with GridSearchCV",
      "85% test accuracy, 0.85 F1",
    ],
    stack: ["Python", "scikit-learn", "PCA", "SVM"],
    git: "https://github.com/gaurig08/face-recognition-pca-svm",
  },
];

export const skills = [
  { group: "Data", items: ["SQL", "ETL pipelines", "Star schema", "Power BI", "pandas"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "Firebase / Firestore"] },
  { group: "Web", items: ["React", "JavaScript", "FastAPI", "REST APIs"] },
  { group: "Cloud & tools", items: ["AWS", "Docker", "Git", "Vercel CI/CD"] },
  { group: "ML", items: ["scikit-learn", "TF-IDF", "PCA / SVM", "Gemini API"] },
  { group: "Languages", items: ["Java", "Python", "JavaScript", "SQL"] },
];

export const certs = [
  { short: "AWS", title: "AWS Certified Cloud Practitioner", by: "AMAZON WEB SERVICES ✦ CLOUD PRACTITIONER ✦ " },
  { short: "Snowflake", title: "Snowflake Data Engineering Professional Certificate", by: "SNOWFLAKE ✦ DATA ENGINEERING ✦ COURSERA ✦ " },
  { short: "Google", title: "Google Data Analytics Professional Certificate", by: "GOOGLE ✦ DATA ANALYTICS ✦ COURSERA ✦ " },
  { short: "IBM", title: "IBM Big Data with Spark & Hadoop", by: "IBM ✦ BIG DATA WITH SPARK & HADOOP ✦ " },
];

export const notes = [
  { title: "Kota → Chennai", body: "Home is Kota, Rajasthan. College is SRMIST, Kattankulathur. Class of 2027.", color: "yellow" },
  { title: "Off the clock", body: "Series, movies and books. I built GeekShelf to keep track of all of them.", color: "pink" },
  { title: "My rule", body: "Every number on this page comes from code I actually ran.", color: "lilac" },
];

export const ribbon = ["Data pipelines", "Full-stack apps", "ML models", "Star schemas", "Power BI", "React", "Series & books"];

export const wins = [
  { title: "Final round", detail: "AI/ML Hackathon · PeerHub × CIG IIT Roorkee" },
  { title: "Final round", detail: "Genesis 1.0 Hackathon" },
  { title: "Built & submitted", detail: "Code by Groww Hackathon" },
  { title: "Participant", detail: "IIT Kharagpur Data Science Hackathon 2025" },
  { title: "Hands-on labs", detail: "Google Cloud Arcade" },
];

export const clubs = [
  { title: "Creative Associate Lead", org: "QwickLabs Developer Club" },
  { title: "Creative Team Member", org: "Cloud Nova" },
];

// Fake, for fun.
export const reviews = [
  { who: "The negative class", role: "2.3% of reviews", stars: 5, text: "Recall went from 20% to 52%. For the first time, someone noticed me." },
  { who: "NULL", role: "Missing value", stars: 1, text: "I used to hide in IMDb dumps. She found me every single time." },
  { who: "Her watchlist", role: "Stakeholder", stars: 5, text: "Commissioned a full-stack app just to keep track of me. Iconic." },
  { who: "Data leakage", role: "Villain", stars: 1, text: "Tried to sneak into her cross-validation folds. Defeated by a pipeline." },
  { who: "Her résumé", role: "Honest document", stars: 5, text: "Refuses to list tools she hasn't used. Recruiters, please appreciate this." },
  { who: "Power BI", role: "Dashboard", stars: 5, text: "She gives me clean star schemas. Other people give me one 40-column CSV." },
];
