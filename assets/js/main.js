(function () {
  'use strict';

  /* ---------- helpers ---------- */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- translations ---------- */
  var I18N = {
    de: {
      'meta.title': 'Burim Maliki — Portfolio',
      'meta.desc': 'Portfolio von Burim Maliki: angehender Applikationsentwickler an der Informatikmittelschule, auf der Suche nach einem einjährigen Praktikum in Applikationsentwicklung.',

      'a11y.skip': 'Zum Inhalt springen',
      'a11y.toTop': 'Nach oben scrollen',
      'a11y.menuOpen': 'Menü öffnen',
      'a11y.menuClose': 'Menü schliessen',
      'a11y.themeToDark': 'Dunkles Design aktivieren',
      'a11y.themeToLight': 'Helles Design aktivieren',
      'nav.label': 'Hauptnavigation',
      'nav.brandAria': 'Burim Maliki — zum Seitenanfang',
      'nav.start': 'Start',
      'nav.links': 'Links',
      'nav.ims': 'IMS',
      'nav.skills': 'Skills',
      'nav.projects': 'Projekte',
      'nav.contact': 'Kontakt',

      'hero.eyebrow': 'Portfolio · Informatikmittelschule',
      'hero.leadStrong': 'Angehender Applikationsentwickler.',
      'hero.lead': 'Ich besuche die Informatikmittelschule (IMS) und suche ein einjähriges Praktikum in Applikationsentwicklung. Mein Fokus: Web und Fullstack. Mein Interesse: Sicherheit.',
      'hero.ctaLinkedin': 'LinkedIn',
      'hero.ctaGithub': 'GitHub',
      'hero.linkedinAria': 'LinkedIn-Profil öffnen (neuer Tab)',
      'hero.githubAria': 'GitHub-Profil öffnen (neuer Tab)',
      'hero.meta1': 'Informatikmittelschule (IMS)',
      'hero.meta2': 'Applikationsentwicklung',
      'hero.meta3': 'Web · Fullstack · Security',
      'hero.factsAria': 'Auf einen Blick',
      'hero.factsTitle': 'Auf einen Blick',
      'hero.fStatusLabel': 'Status',
      'hero.fStatus': 'Auf der Suche nach dem Praktikumsjahr',
      'hero.fEducationLabel': 'Ausbildung',
      'hero.fEducation': 'Informatikmittelschule (IMS)',
      'hero.fFocusLabel': 'Schwerpunkt',
      'hero.fFocus': 'Applikationsentwicklung',
      'hero.fInterestLabel': 'Interessen',
      'hero.fInterest': 'Web · Fullstack · Security',

      'links.eyebrow': '01 · Profile & Projekte',
      'links.title': 'Wichtige Links',
      'links.lead': 'Alle relevanten Profile und Projekte an einem Ort.',
      'links.githubTitle': 'GitHub',
      'links.githubDesc': 'Code, Projekte und Experimente.',
      'links.githubAria': 'GitHub öffnen (neuer Tab)',
      'links.linkedinTitle': 'LinkedIn',
      'links.linkedinDesc': 'Profil, Netzwerk und Kontaktaufnahme.',
      'links.linkedinAria': 'LinkedIn öffnen (neuer Tab)',
      'links.robofightTitle': 'RoboFight',
      'links.robofightDesc': 'Strategie-Spiel mit Robotern — Stärke, Tempo, Robustheit.',
      'links.robofightAria': 'RoboFight öffnen (neuer Tab)',
      'links.cyberskillsTitle': 'Cyberskills',
      'links.cyberskillsDesc': 'Lernkonzept für Cybersicherheit mit eigenem Skill-Tree.',
      'links.cyberskillsAria': 'Cyberskills öffnen (neuer Tab)',

      'ims.eyebrow': '02 · Bildungsweg',
      'ims.title': 'Informatikmittelschule (IMS)',
      'ims.p1': 'Die Informatikmittelschule (IMS) ist ein vierjähriger Bildungsgang in der Schweiz: drei Jahre Schule, ein Jahr Praktikum — mit Abschluss eidgenössisches Fähigkeitszeugnis (EFZ) als Applikationsentwickler:in plus Berufsmaturität.',
      'ims.p2': 'Der Unterricht verbindet Allgemeinbildung mit Informatik — von Programmierung und Webentwicklung über Datenbanken und Netzwerke bis zu Projektmanagement. Welche Module zum EFZ führen, zeigt der offizielle <a class="text-link" href="https://www.modulbaukasten.ch/" target="_blank" rel="noopener noreferrer">Modulbaukasten</a>. Angeboten wird die IMS unter anderem an der <a class="text-link" href="https://www.ksb-sg.ch/ims" target="_blank" rel="noopener noreferrer">Kanti am Brühl (KSB)</a> in St. Gallen.',
      'ims.cardAria': 'Lerninhalte der IMS',
      'ims.learnTitle': 'Was man an der IMS lernt',
      'ims.chip1': 'Programmierung',
      'ims.chip2': 'Webentwicklung',
      'ims.chip3': 'Datenbanken',
      'ims.chip4': 'Netzwerke & Betriebssysteme',
      'ims.chip5': 'Projektmanagement',
      'ims.chip6': 'Agile Methoden',
      'ims.chip7': 'Mathematik & Naturwissenschaften',
      'ims.chip8': 'Sprachen & Wirtschaft',
      'ims.chip9': 'Berufsmaturität',
      'ims.modulesTitle': 'Modulbaukasten',
      'ims.modulesDesc': 'Offizielle Modulübersicht der IMS',
      'ims.modulesAria': 'Modulbaukasten öffnen (neuer Tab)',
      'ims.ksbTitle': 'Kanti am Brühl (KSB)',
      'ims.ksbDesc': 'Informatikmittelschule in St. Gallen',
      'ims.ksbAria': 'Kanti am Brühl öffnen (neuer Tab)',

      'skills.eyebrow': '03 · Kompetenzen',
      'skills.title': 'Skills',
      'skills.lead': 'Die IMS hat mir eine solide Grundlage gegeben — von den Grundlagen der Programmierung bis zu Datenbanken, Netzwerken und Webentwicklung. Die genauen Inhalte sind im <a class="text-link" href="https://www.modulbaukasten.ch/" target="_blank" rel="noopener noreferrer">Modulbaukasten</a> dokumentiert.',
      'skills.tabsAria': 'Skill-Kategorien',
      'skills.tab1': 'Programmiersprachen',
      'skills.tab2': 'Anwendungsbereiche',
      'skills.tab3': 'Soft Skills',
      'skills.langJs': 'JavaScript', 'skills.langJsDesc': 'Webanwendungen & interaktive Interfaces',
      'skills.langHtml': 'HTML', 'skills.langHtmlDesc': 'Semantisches Markup & zugängliche Struktur',
      'skills.langCss': 'CSS', 'skills.langCssDesc': 'Layout, Responsive Design & Design-Systeme',
      'skills.langC': 'C', 'skills.langCDesc': 'Systemnahe Grundlagen & Speicherverwaltung',
      'skills.langCpp': 'C++', 'skills.langCppDesc': 'Objektorientierte Programmierung',
      'skills.langJava': 'Java', 'skills.langJavaDesc': 'Stark typisierte Anwendungen',
      'skills.areaFrontend': 'Frontend', 'skills.areaFrontendDesc': 'Interfaces, Usability & Barrierefreiheit',
      'skills.areaBackend': 'Backend', 'skills.areaBackendDesc': 'APIs, Services & Geschäftslogik',
      'skills.areaFullstack': 'Fullstack', 'skills.areaFullstackDesc': 'Von der Datenbank bis zum UI',
      'skills.areaSql': 'SQL & NoSQL Datenbanken', 'skills.areaSqlDesc': 'Relationale & dokumentenbasierte Systeme',
      'skills.areaContainer': 'Container', 'skills.areaContainerDesc': 'Docker & isolierte Laufzeitumgebungen',
      'skills.areaAi': 'AI Skills', 'skills.areaAiDesc': 'KI-gestützte Tools & Workflows',
      'skills.soft1': 'Teamfähigkeit', 'skills.soft1Desc': 'Gemeinsam Lösungen erarbeiten',
      'skills.soft2': 'Überzeugungsfähigkeit', 'skills.soft2Desc': 'Ideen klar und sachlich vertreten',
      'skills.soft3': 'Feedback geben & annehmen', 'skills.soft3Desc': 'Offen für konstruktive Kritik',
      'skills.soft4': 'Empathie', 'skills.soft4Desc': 'Perspektiven anderer verstehen',
      'skills.soft5': 'Toleranz', 'skills.soft5Desc': 'Unterschiedliche Sichtweisen respektieren',
      'skills.soft6': 'Neugier', 'skills.soft6Desc': 'Neues verstehen und ausprobieren',
      'skills.soft7': 'Strategisches Denken', 'skills.soft7Desc': 'Probleme in Schritte zerlegen',
      'skills.soft8': 'Geduld', 'skills.soft8Desc': 'Dranbleiben bei komplexen Aufgaben',
      'skills.soft9': 'Verantwortungsübernahme', 'skills.soft9Desc': 'Für Ergebnisse einstehen',

      'projects.eyebrow': '04 · Arbeit',
      'projects.title': 'Projekte',
      'projects.lead': 'Zwei Projekte, zwei Ansätze: ein spielbares Strategie-Spiel und das Konzept für eine Lernplattform.',
      'projects.rfTag': 'Spiel · Web',
      'projects.rfTitle': 'RoboFight',
      'projects.rfDesc': 'Zwei Spieler bauen Roboter aus drei Werten — Stärke, Tempo und Robustheit — und lassen sie gegeneinander antreten. Wie bei Schere, Stein, Papier kontert jeder Wert einen anderen; eine spezielle Kampfformel entscheidet den Kampf.',
      'projects.rfChipsAria': 'Eigenschaften von RoboFight',
      'projects.rfChip1': '2 Spieler',
      'projects.rfChip2': 'Stärke · Tempo · Robustheit',
      'projects.rfChip3': 'Typ-System',
      'projects.rfChip4': 'Kampfformel',
      'projects.rfCta': 'RoboFight ansehen',
      'projects.rfCtaAria': 'RoboFight ansehen (neuer Tab)',
      'projects.rfVisualAria': 'RoboFight Mechanik',
      'projects.rfStatsTitle': 'Roboter-Werte',
      'projects.rfStatStrength': 'Stärke',
      'projects.rfStatSpeed': 'Tempo',
      'projects.rfStatDurability': 'Robustheit',
      'projects.rfDiagramAria': 'Typ-System von RoboFight: Stärke schlägt Tempo, Tempo schlägt Robustheit, Robustheit schlägt Stärke.',
      'projects.rfDiagramCaption': 'Typ-System: schlägt im Kreis',
      'projects.rfFormulaCaption': 'Kampfformel (vereinfacht)',
      'projects.rfFormula': 'Schaden = Stärke × Typ-Faktor − Robustheit',
      'projects.csTag': 'Konzept · Blueprint',
      'projects.csTitle': 'Cyberskills',
      'projects.csDesc': 'Das Konzept für eine Lernplattform, die Cybersicherheit verständlich macht: eine klar definierte Zielgruppe, messbare Lernziele und ein eigenes Skill-Tree-System, das den Lernfortschritt sichtbar macht.',
      'projects.csChipsAria': 'Eigenschaften von Cyberskills',
      'projects.csChip1': 'Zielgruppe definiert',
      'projects.csChip2': 'Messbare Lernziele',
      'projects.csChip3': 'Skill-Tree',
      'projects.csChip4': 'Konzeptphase',
      'projects.csAudienceLabel': 'Zielgruppe',
      'projects.csAudience': 'Jugendliche und Einsteiger:innen, die verstehen wollen, wie Angriffe funktionieren und wie man sich schützt.',
      'projects.csOutcomesLabel': 'Lernziele',
      'projects.csOutcomes': 'Netzwerke, Angriffsmethoden und Verteidigung im Alltag verstehen und anwenden.',
      'projects.csTreeLabel': 'Skill-Tree-System',
      'projects.csTree': 'Ein eigener Fähigkeiten-Baum, der Fortschritt sichtbar macht und motiviert.',
      'projects.csCta': 'Cyberskills ansehen',
      'projects.csCtaAria': 'Cyberskills ansehen (neuer Tab)',
      'projects.csVisualAria': 'Cyberskills Skill-Tree',
      'projects.csTreeTitle': 'Skill-Tree-System',
      'projects.csTreeRoot': 'Start',
      'projects.csTreeN1': 'Grundlagen',
      'projects.csTreeN2': 'Netzwerke',
      'projects.csTreeN3': 'Angriffe',
      'projects.csTreeN4': 'Verteidigung',
      'projects.csDiagramAria': 'Skill-Tree von Cyberskills: vom Start-Modul über Grundlagen, Netzwerke, Angriffe und Verteidigung.',
      'projects.csTreeCaption': 'Skill-Tree — Fortschritt sichtbar machen',

      'contact.eyebrow': '05 · Kontakt',
      'contact.title': 'Schreib mir.',
      'contact.lead': 'Offen für Praktikumsanfragen, Projektideen und Feedback.',
      'contact.note': 'Schneller geht es über <a class="text-link" href="https://www.linkedin.com/in/burim-maliki-932824349/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.',
      'contact.formAria': 'Kontaktformular',
      'contact.emailLabel': 'E-Mail-Adresse',
      'contact.emailPlaceholder': 'name@beispiel.ch',
      'contact.messageLabel': 'Nachricht',
      'contact.messagePlaceholder': 'Worum geht es?',
      'contact.submit': 'Nachricht senden',
      'contact.sending': 'Wird gesendet …',
      'contact.dismissAria': 'Meldung schliessen',
      'contact.errEmailRequired': 'Bitte gib deine E-Mail-Adresse ein.',
      'contact.errEmailInvalid': 'Bitte gib eine gültige E-Mail-Adresse ein.',
      'contact.errMsgRequired': 'Bitte schreib eine Nachricht.',
      'contact.errMsgMin': 'Die Nachricht sollte mindestens 10 Zeichen lang sein.',
      'contact.errCheckFields': 'Bitte prüfe die markierten Felder.',
      'contact.errorTitle': 'Senden fehlgeschlagen.',
      'contact.successTitle': 'Nachricht gesendet.',
      'contact.successBody': 'Danke für deine Nachricht — ich melde mich so bald wie möglich.',

      'footer.tagline': 'Angehender Applikationsentwickler · Informatikmittelschule',
      'footer.githubAria': 'GitHub öffnen (neuer Tab)',
      'footer.linkedinAria': 'LinkedIn öffnen (neuer Tab)',
      'footer.rights': '© 2026 Burim Maliki',
      'footer.built': 'HTML · CSS · Vanilla JS'
    },
    en: {
      'meta.title': 'Burim Maliki — Portfolio',
      'meta.desc': 'Portfolio of Burim Maliki: aspiring application developer at the Informatikmittelschule (IMS), looking for a one-year internship in application development.',

      'a11y.skip': 'Skip to content',
      'a11y.toTop': 'Back to top',
      'a11y.menuOpen': 'Open menu',
      'a11y.menuClose': 'Close menu',
      'a11y.themeToDark': 'Switch to dark mode',
      'a11y.themeToLight': 'Switch to light mode',
      'nav.label': 'Main navigation',
      'nav.brandAria': 'Burim Maliki — back to top',
      'nav.start': 'Home',
      'nav.links': 'Links',
      'nav.ims': 'IMS',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',

      'hero.eyebrow': 'Portfolio · Informatikmittelschule (IMS)',
      'hero.leadStrong': 'Aspiring application developer.',
      'hero.lead': 'I attend the Informatikmittelschule (IMS) and am looking for a one-year internship in application development. My focus: web and full-stack. My interest: security.',
      'hero.ctaLinkedin': 'LinkedIn',
      'hero.ctaGithub': 'GitHub',
      'hero.linkedinAria': 'Open LinkedIn profile (new tab)',
      'hero.githubAria': 'Open GitHub profile (new tab)',
      'hero.meta1': 'Informatikmittelschule (IMS)',
      'hero.meta2': 'Application development',
      'hero.meta3': 'Web · Full-stack · Security',
      'hero.factsAria': 'At a glance',
      'hero.factsTitle': 'At a glance',
      'hero.fStatusLabel': 'Status',
      'hero.fStatus': 'Looking for the internship year',
      'hero.fEducationLabel': 'Education',
      'hero.fEducation': 'Informatikmittelschule (IMS)',
      'hero.fFocusLabel': 'Focus',
      'hero.fFocus': 'Application development',
      'hero.fInterestLabel': 'Interests',
      'hero.fInterest': 'Web · Full-stack · Security',

      'links.eyebrow': '01 · Profiles & projects',
      'links.title': 'Important links',
      'links.lead': 'All relevant profiles and projects in one place.',
      'links.githubTitle': 'GitHub',
      'links.githubDesc': 'Code, projects, and experiments.',
      'links.githubAria': 'Open GitHub (new tab)',
      'links.linkedinTitle': 'LinkedIn',
      'links.linkedinDesc': 'Profile, network, and a direct way to reach me.',
      'links.linkedinAria': 'Open LinkedIn (new tab)',
      'links.robofightTitle': 'RoboFight',
      'links.robofightDesc': 'Strategy game with robots — strength, speed, durability.',
      'links.robofightAria': 'Open RoboFight (new tab)',
      'links.cyberskillsTitle': 'Cyberskills',
      'links.cyberskillsDesc': 'A learning concept for cybersecurity with its own skill tree.',
      'links.cyberskillsAria': 'Open Cyberskills (new tab)',

      'ims.eyebrow': '02 · Education',
      'ims.title': 'Informatikmittelschule (IMS)',
      'ims.p1': 'The Informatikmittelschule (IMS) is a four-year programme in Switzerland: three years of school, one year of internship — leading to the federal diploma (EFZ) as an application developer plus a vocational baccalaureate.',
      'ims.p2': 'Classes combine general education with computer science — from programming and web development to databases, networks, and project management. The official <a class="text-link" href="https://www.modulbaukasten.ch/" target="_blank" rel="noopener noreferrer">Modulbaukasten</a> (module catalogue) shows which modules lead to the diploma. The IMS is offered, among others, at the <a class="text-link" href="https://www.ksb-sg.ch/ims" target="_blank" rel="noopener noreferrer">Kanti am Brühl (KSB)</a> in St. Gallen.',
      'ims.cardAria': 'What students learn at the IMS',
      'ims.learnTitle': 'What students learn at the IMS',
      'ims.chip1': 'Programming',
      'ims.chip2': 'Web development',
      'ims.chip3': 'Databases',
      'ims.chip4': 'Networks & operating systems',
      'ims.chip5': 'Project management',
      'ims.chip6': 'Agile methods',
      'ims.chip7': 'Maths & natural sciences',
      'ims.chip8': 'Languages & economics',
      'ims.chip9': 'Vocational baccalaureate',
      'ims.modulesTitle': 'Modulbaukasten',
      'ims.modulesDesc': 'Official IMS module catalogue',
      'ims.modulesAria': 'Open the Modulbaukasten (new tab)',
      'ims.ksbTitle': 'Kanti am Brühl (KSB)',
      'ims.ksbDesc': 'School offering the IMS in St. Gallen',
      'ims.ksbAria': 'Open Kanti am Brühl (new tab)',

      'skills.eyebrow': '03 · Competencies',
      'skills.title': 'Skills',
      'skills.lead': 'The IMS gave me a solid foundation — from programming fundamentals to databases, networks, and web development. The exact contents are documented in the <a class="text-link" href="https://www.modulbaukasten.ch/" target="_blank" rel="noopener noreferrer">Modulbaukasten</a>.',
      'skills.tabsAria': 'Skill categories',
      'skills.tab1': 'Programming languages',
      'skills.tab2': 'Application areas',
      'skills.tab3': 'Soft skills',
      'skills.langJs': 'JavaScript', 'skills.langJsDesc': 'Web apps & interactive interfaces',
      'skills.langHtml': 'HTML', 'skills.langHtmlDesc': 'Semantic markup & accessible structure',
      'skills.langCss': 'CSS', 'skills.langCssDesc': 'Layout, responsive design & design systems',
      'skills.langC': 'C', 'skills.langCDesc': 'Low-level fundamentals & memory management',
      'skills.langCpp': 'C++', 'skills.langCppDesc': 'Object-oriented programming',
      'skills.langJava': 'Java', 'skills.langJavaDesc': 'Strongly typed applications',
      'skills.areaFrontend': 'Frontend', 'skills.areaFrontendDesc': 'Interfaces, usability & accessibility',
      'skills.areaBackend': 'Backend', 'skills.areaBackendDesc': 'APIs, services & business logic',
      'skills.areaFullstack': 'Full-stack', 'skills.areaFullstackDesc': 'From the database to the UI',
      'skills.areaSql': 'SQL & NoSQL databases', 'skills.areaSqlDesc': 'Relational & document-based systems',
      'skills.areaContainer': 'Containers', 'skills.areaContainerDesc': 'Docker & isolated runtime environments',
      'skills.areaAi': 'AI skills', 'skills.areaAiDesc': 'AI-assisted tools & workflows',
      'skills.soft1': 'Teamwork', 'skills.soft1Desc': 'Finding solutions together',
      'skills.soft2': 'Persuasiveness', 'skills.soft2Desc': 'Presenting ideas clearly and factually',
      'skills.soft3': 'Giving & receiving feedback', 'skills.soft3Desc': 'Open to constructive criticism',
      'skills.soft4': 'Empathy', 'skills.soft4Desc': 'Understanding other people\u2019s perspectives',
      'skills.soft5': 'Tolerance', 'skills.soft5Desc': 'Respecting different points of view',
      'skills.soft6': 'Curiosity', 'skills.soft6Desc': 'Learning and trying new things',
      'skills.soft7': 'Strategic thinking', 'skills.soft7Desc': 'Breaking problems down into steps',
      'skills.soft8': 'Patience', 'skills.soft8Desc': 'Sticking with complex tasks',
      'skills.soft9': 'Taking responsibility', 'skills.soft9Desc': 'Owning the results',

      'projects.eyebrow': '04 · Work',
      'projects.title': 'Projects',
      'projects.lead': 'Two projects, two approaches: a playable strategy game and the concept for a learning platform.',
      'projects.rfTag': 'Game · Web',
      'projects.rfTitle': 'RoboFight',
      'projects.rfDesc': 'Two players build robots from three stats — Strength, Speed and Durability — and pit them against each other. Like rock-paper-scissors, each stat counters another, and a special combat formula decides the fight.',
      'projects.rfChipsAria': 'RoboFight features',
      'projects.rfChip1': '2 players',
      'projects.rfChip2': 'Strength · Speed · Durability',
      'projects.rfChip3': 'Type system',
      'projects.rfChip4': 'Combat formula',
      'projects.rfCta': 'View RoboFight',
      'projects.rfCtaAria': 'View RoboFight (new tab)',
      'projects.rfVisualAria': 'RoboFight mechanics',
      'projects.rfStatsTitle': 'Robot stats',
      'projects.rfStatStrength': 'Strength',
      'projects.rfStatSpeed': 'Speed',
      'projects.rfStatDurability': 'Durability',
      'projects.rfDiagramAria': 'RoboFight type system: Strength beats Speed, Speed beats Durability, Durability beats Strength.',
      'projects.rfDiagramCaption': 'Type system: counters in a cycle',
      'projects.rfFormulaCaption': 'Combat formula (simplified)',
      'projects.rfFormula': 'Damage = Strength × Type factor − Durability',
      'projects.csTag': 'Concept · Blueprint',
      'projects.csTitle': 'Cyberskills',
      'projects.csDesc': 'The concept for a learning platform that makes cybersecurity easy to understand: a clearly defined target audience, measurable learning outcomes, and a unique skill-tree system that makes progress visible.',
      'projects.csChipsAria': 'Cyberskills features',
      'projects.csChip1': 'Defined target audience',
      'projects.csChip2': 'Measurable outcomes',
      'projects.csChip3': 'Skill tree',
      'projects.csChip4': 'Concept stage',
      'projects.csAudienceLabel': 'Target audience',
      'projects.csAudience': 'Young people and beginners who want to understand how attacks work and how to protect themselves.',
      'projects.csOutcomesLabel': 'Learning outcomes',
      'projects.csOutcomes': 'Understand and apply networks, attack methods, and everyday defence.',
      'projects.csTreeLabel': 'Skill-tree system',
      'projects.csTree': 'A dedicated skill tree that makes progress visible and keeps learners motivated.',
      'projects.csCta': 'View Cyberskills',
      'projects.csCtaAria': 'View Cyberskills (new tab)',
      'projects.csVisualAria': 'Cyberskills skill tree',
      'projects.csTreeTitle': 'Skill-tree system',
      'projects.csTreeRoot': 'Start',
      'projects.csTreeN1': 'Fundamentals',
      'projects.csTreeN2': 'Networks',
      'projects.csTreeN3': 'Attacks',
      'projects.csTreeN4': 'Defence',
      'projects.csDiagramAria': 'Cyberskills skill tree: from the start module through fundamentals, networks, attacks, and defence.',
      'projects.csTreeCaption': 'Skill tree — making progress visible',

      'contact.eyebrow': '05 · Contact',
      'contact.title': 'Write to me.',
      'contact.lead': 'Open to internship enquiries, project ideas, and feedback.',
      'contact.note': 'It\u2019s faster via <a class="text-link" href="https://www.linkedin.com/in/burim-maliki-932824349/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.',
      'contact.formAria': 'Contact form',
      'contact.emailLabel': 'Email address',
      'contact.emailPlaceholder': 'name@example.com',
      'contact.messageLabel': 'Message',
      'contact.messagePlaceholder': 'What is it about?',
      'contact.submit': 'Send message',
      'contact.sending': 'Sending …',
      'contact.dismissAria': 'Dismiss notification',
      'contact.errEmailRequired': 'Please enter your email address.',
      'contact.errEmailInvalid': 'Please enter a valid email address.',
      'contact.errMsgRequired': 'Please write a message.',
      'contact.errMsgMin': 'The message should be at least 10 characters long.',
      'contact.errCheckFields': 'Please check the highlighted fields.',
      'contact.errorTitle': 'Sending failed.',
      'contact.successTitle': 'Message sent.',
      'contact.successBody': 'Thanks for your message — I will get back to you as soon as possible.',

      'footer.tagline': 'Aspiring application developer · Informatikmittelschule (IMS)',
      'footer.githubAria': 'Open GitHub (new tab)',
      'footer.linkedinAria': 'Open LinkedIn (new tab)',
      'footer.rights': '© 2026 Burim Maliki',
      'footer.built': 'HTML · CSS · Vanilla JS'
    }
  };

  var currentLang = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'de';

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key] !== undefined)
      ? I18N[currentLang][key]
      : (I18N.de[key] !== undefined ? I18N.de[key] : key);
  }

  /* ---------- language ---------- */
  function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'de';
    document.documentElement.lang = currentLang;
    document.documentElement.setAttribute('data-lang', currentLang);

    $$('[data-i18n]').forEach(function (el) {
      var v = I18N[currentLang][el.getAttribute('data-i18n')];
      if (v !== undefined) el.textContent = v;
    });
    $$('[data-i18n-html]').forEach(function (el) {
      var v = I18N[currentLang][el.getAttribute('data-i18n-html')];
      if (v !== undefined) el.innerHTML = v;
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = I18N[currentLang][el.getAttribute('data-i18n-aria')];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });
    $$('[data-i18n-placeholder]').forEach(function (el) {
      var v = I18N[currentLang][el.getAttribute('data-i18n-placeholder')];
      if (v !== undefined) el.setAttribute('placeholder', v);
    });

    document.title = t('meta.title');
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.desc'));

    $$('.lang-btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === currentLang));
    });

    syncDynamicLabels();
    store.set('bm-lang', currentLang);
  }

  $$('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { applyLanguage(btn.getAttribute('data-lang')); });
  });

  /* ---------- theme ---------- */
  var themeBtn = $('#theme-toggle');
  var htmlEl = document.documentElement;

  function themeLabel() {
    return t(htmlEl.getAttribute('data-theme') === 'dark' ? 'a11y.themeToLight' : 'a11y.themeToDark');
  }
  function setTheme(mode) {
    htmlEl.setAttribute('data-theme', mode);
    store.set('bm-theme', mode);
    themeBtn.setAttribute('aria-label', themeLabel());
  }
  themeBtn.addEventListener('click', function () {
    setTheme(htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- mobile menu ---------- */
  var menuBtn = $('#menu-toggle');
  var siteNav = $('#site-nav');

  function closeMenu(focusBtn) {
    siteNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', t('a11y.menuOpen'));
    if (focusBtn) menuBtn.focus();
  }
  function openMenu() {
    siteNav.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', t('a11y.menuClose'));
  }
  menuBtn.addEventListener('click', function () {
    if (siteNav.classList.contains('open')) closeMenu(); else openMenu();
  });
  $$('#site-nav a').forEach(function (link) {
    link.addEventListener('click', function () { closeMenu(); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) closeMenu(true);
  });

  /* ---------- tabs (keyboard accessible) ---------- */
  $$('.tabs').forEach(function (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var panels = tabs.map(function (tab) {
      return document.getElementById(tab.getAttribute('aria-controls'));
    });
    function activate(tab, focus) {
      tabs.forEach(function (t, i) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        if (panels[i]) {
          panels[i].hidden = !selected;
          panels[i].classList.toggle('is-visible', selected);
        }
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () { activate(tab, false); });
    });
    tablist.addEventListener('keydown', function (e) {
      var idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(idx + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      else return;
      e.preventDefault();
      activate(next, true);
    });
  });

  /* ---------- sticky header state, back-to-top, active nav ---------- */
  var header = $('#site-header');
  var toTopBtn = $('#to-top');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    header.classList.toggle('is-scrolled', y > 4);
    toTopBtn.classList.toggle('is-visible', y > 560);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  toTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  var navLinks = $$('#site-nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    $$('main section[id]').forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ---------- reveal on scroll ---------- */
  var revealEls = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- contact form ---------- */
  var form = $('#contact-form');
  var emailInput = $('#contact-email');
  var msgInput = $('#contact-message');
  var emailError = $('#contact-email-error');
  var msgError = $('#contact-message-error');
  var submitBtn = $('#contact-submit');
  var submitLabel = $('#contact-submit-label');
  var spinner = $('#contact-spinner');
  var banner = $('#form-banner');
  var bannerTitle = $('#form-banner-title');
  var bannerBody = $('#form-banner-body');
  var bannerClose = $('#banner-close');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var bannerTimer = null;

  function setFieldError(input, errEl, message) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errEl.id);
    errEl.querySelector('span').textContent = message;
    errEl.hidden = false;
    input.classList.add('is-invalid');
  }
  function clearFieldError(input, errEl) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    errEl.hidden = true;
    input.classList.remove('is-invalid');
  }
  function hideBanner() {
    clearTimeout(bannerTimer);
    banner.hidden = true;
  }
  function showBanner(type, title, body) {
    clearTimeout(bannerTimer);
    banner.className = 'form-banner is-' + type;
    bannerTitle.textContent = title;
    bannerBody.textContent = body;
    banner.hidden = false;
    if (type === 'success') {
      bannerTimer = setTimeout(hideBanner, 8000);
    }
  }
  function setSubmitting(on) {
    submitBtn.disabled = on;
    submitBtn.setAttribute('aria-busy', String(on));
    spinner.hidden = !on;
    submitLabel.textContent = t(on ? 'contact.sending' : 'contact.submit');
  }

  bannerClose.addEventListener('click', hideBanner);
  emailInput.addEventListener('input', function () {
    clearFieldError(emailInput, emailError);
    if (banner.classList.contains('is-error')) hideBanner();
  });
  msgInput.addEventListener('input', function () {
    clearFieldError(msgInput, msgError);
    if (banner.classList.contains('is-error')) hideBanner();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearFieldError(emailInput, emailError);
    clearFieldError(msgInput, msgError);
    hideBanner();

    var email = emailInput.value.trim();
    var message = msgInput.value.trim();
    var firstInvalid = null;

    if (!email) {
      setFieldError(emailInput, emailError, t('contact.errEmailRequired'));
      firstInvalid = emailInput;
    } else if (!EMAIL_RE.test(email)) {
      setFieldError(emailInput, emailError, t('contact.errEmailInvalid'));
      firstInvalid = emailInput;
    }

    if (!message) {
      setFieldError(msgInput, msgError, t('contact.errMsgRequired'));
      if (!firstInvalid) firstInvalid = msgInput;
    } else if (message.length < 10) {
      setFieldError(msgInput, msgError, t('contact.errMsgMin'));
      if (!firstInvalid) firstInvalid = msgInput;
    }

    if (firstInvalid) {
      showBanner('error', t('contact.errorTitle'), t('contact.errCheckFields'));
      firstInvalid.focus();
      return;
    }

    setSubmitting(true);
    /* Simulated async send — swap this block for a real endpoint later. */
    window.setTimeout(function () {
      setSubmitting(false);
      showBanner('success', t('contact.successTitle'), t('contact.successBody'));
      form.reset();
    }, 900);
  });

  /* ---------- dynamic labels after language switch ---------- */
  function syncDynamicLabels() {
    themeBtn.setAttribute('aria-label', themeLabel());
    toTopBtn.setAttribute('aria-label', t('a11y.toTop'));
    menuBtn.setAttribute('aria-label', t(siteNav.classList.contains('open') ? 'a11y.menuClose' : 'a11y.menuOpen'));
    if (!submitBtn.disabled) submitLabel.textContent = t('contact.submit');
  }

  /* ---------- init ---------- */
  applyLanguage(currentLang);
  syncDynamicLabels();
})();