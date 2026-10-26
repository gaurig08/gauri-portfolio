// Everything you'd want to edit lives here: links, projects, skills, certifications.

export const links = {
  email: 'gaurigohad8@gmail.com',
  github: 'https://github.com/gaurig08',
  linkedin: 'https://www.linkedin.com/in/gauri-g',
  leetcode: 'https://leetcode.com/u/gaurig08/',
}

export const intro =
  "Hi! I'm a 4th-year B.Tech CSE student at SRMIST, specialising in Big Data Analytics. I enjoy working with data, building web apps, and learning something new with every project."

export const featured = {
  name: 'GeekShelf',
  kicker: '01 · FULL-STACK',
  url: 'https://geek-shelf.vercel.app/',
  image: 'projects/geekshelf-room.webp',
  imageAlt: "GeekShelf's illustrated cozy-room home screen",
  tag: 'live on vercel',
  text: 'I watch too many series and read too many books to track them in four apps, so I built one shelf for all of it: real-time sync, API keys kept server-side, and an explainable recommender.',
  shelves: ['Movies', 'Series', 'Anime', 'Books'],
  stack: ['React', 'Firebase', 'Vercel Functions', 'Gemini'],
}

export const projects = [
  {
    name: 'Smart Market Watchlist',
    label: 'HACKATHON · CODE BY GROWW',
    url: 'https://github.com/gaurig08/smart-market-watchlist',
    text: "Judges each price move against the stock's own normal range instead of a flat 5% rule, with plain-language explanations in 11 Indian languages.",
    stack: ['FastAPI', 'PostgreSQL', 'yfinance', 'Gemini'],
    metric: '11',
    metricLabel: 'languages',
  },
  {
    name: "Women's Safety Index",
    label: 'DATA PIPELINE',
    url: 'https://github.com/gaurig08/women-safety-index-analytics-pipeline',
    text: 'NCRB crime records turned into a severity-weighted 0–100 score per district, normalised per year at the 95th percentile.',
    stack: ['Python', 'pandas', 'Star schema', 'Power BI'],
    metric: '751',
    metricLabel: 'districts scored',
  },
  {
    name: 'Cancelled Too Soon',
    label: 'DATA PIPELINE',
    url: 'https://github.com/gaurig08/imdb-cancelled-shows-etl-pipeline',
    text: "ETL over IMDb's public datasets to find shows rated 7.0+ that still ended within three seasons, modelled as a star schema for Power BI.",
    stack: ['Python', 'pandas', 'SQL', 'Power BI'],
    metric: '3,130/8,293',
    metricLabel: 'shows flagged',
  },
  {
    name: 'Review Sentiment',
    label: 'MACHINE LEARNING',
    url: 'https://github.com/gaurig08/amazon-review-sentiment-analysis',
    text: '34,626 Amazon reviews where only 2.3% are negative. SMOTE inside a leak-free CV pipeline made the rare class visible.',
    stack: ['scikit-learn', 'TF-IDF', 'SMOTE'],
    metric: '20%→52%',
    metricLabel: 'negative recall',
    highlight: true,
    image: 'projects/amazon-recall.webp',
    imageAlt: 'Chart: negative-class recall before and after SMOTE',
  },
  {
    name: 'Eigenfaces',
    label: 'MACHINE LEARNING',
    url: 'https://github.com/gaurig08/face-recognition-pca-svm',
    text: 'Face recognition on LFW: PCA from 1,850 features to 150, then an RBF-kernel SVM tuned with GridSearchCV.',
    stack: ['scikit-learn', 'PCA', 'SVM'],
    metric: '85%',
    metricLabel: 'test accuracy',
  },
]

export const skills = [
  ['Data', 'SQL, ETL pipelines, star schemas, Power BI, pandas'],
  ['Databases', 'PostgreSQL, MySQL, Firebase / Firestore'],
  ['Web', 'React, JavaScript, FastAPI, REST APIs'],
  ['Cloud & tools', 'AWS, Docker, Git, Vercel CI/CD'],
  ['Machine learning', 'scikit-learn, TF-IDF, PCA, SVM'],
  ['Languages', 'Java, Python, JavaScript, SQL'],
]

export const certifications = {
  highlight: 'AWS Certified Cloud Practitioner',
  coursera: ['Snowflake Data Engineering', 'Google Data Analytics', 'IBM Big Data with Spark & Hadoop'],
}
