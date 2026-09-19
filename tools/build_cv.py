"""
Génère les CV PDF (FR et EN) à partir des fichiers de traduction du portfolio.
Le CV téléchargeable reste ainsi toujours aligné avec la page /resume.

Usage : python3 tools/build_cv.py
Sortie : public/assets/cv/chrislain_avocegan_cv_{fr,en}.pdf
"""

import json
import html
import os
from weasyprint import HTML

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LABELS = {
    "fr": {
        "profile": "Profil",
        "experience": "Expérience professionnelle",
        "education": "Formation",
        "projects": "Réalisations",
        "stack": "Stack technique",
        "soft": "Savoir-être",
        "languages": "Langues",
        "contact": "Contact",
        "interests": "Centres d'intérêt",
    },
    "en": {
        "profile": "Profile",
        "experience": "Professional experience",
        "education": "Education",
        "projects": "Selected work",
        "stack": "Tech stack",
        "soft": "Soft skills",
        "languages": "Languages",
        "contact": "Contact",
        "interests": "Interests",
    },
}

CSS = """
@page {
  size: A4;
  margin: 12mm 12mm;
}

* { box-sizing: border-box; }

body {
  font-family: "DejaVu Sans", sans-serif;
  font-size: 8.4pt;
  line-height: 1.38;
  color: #24303f;
  margin: 0;
}

a { color: #3730a3; text-decoration: none; }

.name {
  font-size: 20pt;
  font-weight: 700;
  letter-spacing: -0.4pt;
  color: #0f172a;
  margin: 0;
}

.role {
  font-size: 10pt;
  font-weight: 600;
  color: #4338ca;
  margin: 2pt 0 5pt;
}

.tagline {
  font-size: 8.4pt;
  color: #64748b;
  margin: 0 0 9pt;
  max-width: 130mm;
}

.rule { border-bottom: 1.6pt solid #0f172a; margin: 6pt 0 9pt; }

.columns { display: table; width: 100%; }
.main { display: table-cell; width: 65%; padding-right: 8mm; vertical-align: top; }
.side { display: table-cell; width: 35%; vertical-align: top; border-left: 0.6pt solid #dbe1ea; padding-left: 6mm; }

h2 {
  font-size: 8.4pt;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 6pt;
  padding-bottom: 2pt;
  border-bottom: 0.6pt solid #cbd5e1;
}

.side h2 { border-bottom: none; padding-bottom: 0; }

section { margin-bottom: 9.5pt; }

.job { margin-bottom: 7pt; page-break-inside: avoid; }

.job-head { margin-bottom: 1pt; }

.job-role { font-weight: 700; color: #0f172a; font-size: 9.2pt; }

.job-meta { color: #64748b; font-size: 7.9pt; margin-bottom: 3pt; }

.job-company { font-weight: 600; color: #4338ca; }

ul { margin: 0; padding-left: 10pt; }

li { margin-bottom: 1.6pt; }

.edu { margin-bottom: 6pt; }
.edu-degree { font-weight: 700; color: #0f172a; }
.edu-meta { color: #64748b; font-size: 7.9pt; }

.contact-line { margin-bottom: 3pt; color: #334155; }
.contact-label { color: #94a3b8; font-size: 7.4pt; display: block; }

.tags { margin: 0; padding: 0; list-style: none; }
.tags li {
  display: inline-block;
  background: #eef2ff;
  color: #3730a3;
  border-radius: 3pt;
  padding: 1.6pt 4.5pt;
  margin: 0 2.5pt 3pt 0;
  font-size: 7.7pt;
  font-weight: 600;
}

.stack-line { margin-bottom: 3.5pt; }
.profile { text-align: justify; }
.interests { color: #64748b; font-size: 8pt; }
"""


def esc(value):
    return html.escape(str(value))


def build(lang):
    with open(os.path.join(ROOT, "src", "locales", f"{lang}.json"), encoding="utf-8") as handle:
        data = json.load(handle)

    resume = data["resume"]
    about = data["about"]
    label = LABELS[lang]
    contact = resume["contact"]

    # Profil : la description courte du site (2 phrases), pour tenir sur une page
    profile = about["description"].strip()

    # Nombre de puces conservées par poste : les expériences récentes sont détaillées,
    # les plus anciennes résumées.
    bullet_caps = [4, 4, 3, 2, 2]

    jobs = "".join(
        f"""
        <div class="job">
          <div class="job-head"><span class="job-role">{esc(item['role'])}</span></div>
          <div class="job-meta"><span class="job-company">{esc(item['company'])}</span> &nbsp;|&nbsp; {esc(item['period'])}</div>
          <ul>{''.join(f'<li>{esc(detail)}</li>' for detail in item['details'][:cap])}</ul>
        </div>"""
        for item, cap in zip(resume["experience"]["items"], bullet_caps + [2] * 10)
    )

    educations = "".join(
        f"""
        <div class="edu">
          <div class="edu-degree">{esc(item['degree'])}</div>
          <div class="edu-meta">{esc(item['institution'])} &nbsp;|&nbsp; {esc(item['year'])}</div>
        </div>"""
        for item in resume["education"]["items"]
    )

    projects = "".join(f"<li>{esc(item)}</li>" for item in resume["freelance"]["items"][:5])
    stack = "".join(f'<div class="stack-line">{esc(item)}</div>' for item in resume["hardSkills"]["items"])
    skills = "".join(f"<li>{esc(item)}</li>" for item in resume["professionalSkills"]["items"])
    soft = "".join(f"<li>{esc(item)}</li>" for item in resume["softSkills"]["items"])
    languages = "".join(f"<li>{esc(item)}</li>" for item in resume["languages"]["items"])
    interests = " &middot; ".join(esc(item) for item in resume["interests"]["items"])

    document = f"""<!DOCTYPE html>
<html lang="{lang}">
<head><meta charset="utf-8"><style>{CSS}</style></head>
<body>
  <h1 class="name">{esc(resume['header']['name'])}</h1>
  <div class="role">{esc(resume['header']['title'])}</div>
  <div class="rule"></div>

  <div class="columns">
    <div class="main">
      <section>
        <h2>{label['profile']}</h2>
        <p class="profile">{esc(profile)}</p>
      </section>

      <section>
        <h2>{label['experience']}</h2>
        {jobs}
      </section>

      <section>
        <h2>{label['projects']}</h2>
        <ul>{projects}</ul>
      </section>
    </div>

    <div class="side">
      <section>
        <h2>{label['contact']}</h2>
        <div class="contact-line"><span class="contact-label">{esc(contact['email'])}</span>{esc(contact['emailAddress'])}</div>
        <div class="contact-line"><span class="contact-label">{esc(contact['phone'])}</span>{esc(contact['phoneNumber'])}</div>
        <div class="contact-line"><span class="contact-label">{esc(contact['address'])}</span>{esc(contact['city'])}</div>
        <div class="contact-line"><span class="contact-label">{esc(contact['website'])}</span>{esc(contact['websiteUrl'])}</div>
      </section>

      <section>
        <h2>{esc(resume['professionalSkills']['title'])}</h2>
        <ul class="tags">{skills}</ul>
      </section>

      <section>
        <h2>{label['stack']}</h2>
        {stack}
      </section>

      <section>
        <h2>{label['education']}</h2>
        {educations}
      </section>

      <section>
        <h2>{label['soft']}</h2>
        <ul class="tags">{soft}</ul>
      </section>

      <section>
        <h2>{label['languages']}</h2>
        <ul class="tags">{languages}</ul>
      </section>

      <section>
        <h2>{label['interests']}</h2>
        <div class="interests">{interests}</div>
      </section>
    </div>
  </div>
</body>
</html>"""

    output_dir = os.path.join(ROOT, "public", "assets", "cv")
    os.makedirs(output_dir, exist_ok=True)
    output = os.path.join(output_dir, f"chrislain_avocegan_cv_{lang}.pdf")
    HTML(string=document, base_url=ROOT).write_pdf(output)
    print(f"CV {lang.upper()} -> {output}")


for language in ("fr", "en"):
    build(language)
