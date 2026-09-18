// ─────────────────────────────────────────────────────────────
//  แก้ข้อมูลส่วนตัวของคุณได้ที่ไฟล์นี้ไฟล์เดียว
//  (ค่าที่ใส่ไว้ตอนนี้เป็นตัวอย่าง — กรุณาแทนที่ด้วยข้อมูลจริง)
// ─────────────────────────────────────────────────────────────

const profile = {
  // ── ข้อมูลหลัก ─────────────────────────────────────────────
  name:    "Lakkana Worasinchai",   // ชื่อหลัก แสดงตัวใหญ่
  nameAlt: "ลักคณา วรศิลป์ชัย",       // บรรทัดรอง (เว้นว่าง "" ได้ถ้าไม่ต้องการ)
  role: "Web Developer",
  tagline: "I build digital work that is practical, well-crafted, and accessible to everyone.",
  location: "Bangkok, Thailand",

  // รูปโปรไฟล์: วางไฟล์รูปไว้ในโฟลเดอร์ assets/ แล้วใส่ชื่อไฟล์ เช่น "assets/profile.jpg"
  // ถ้าเว้นว่างไว้ จะแสดงเป็นตัวอักษรย่อแทน
  photo: "assets/professor.svg",

  // ── เกี่ยวกับฉัน ───────────────────────────────────────────
  about: [
    "Hello, and nice to meet you. I'm someone who cares deeply about technology and design, enjoys picking up new things, and believes good work comes from paying attention to the small details.",
    "These days I work in web development, where I get to turn ideas into things people actually use. Outside of work you'll find me taking photos, reading, and hunting down new cafés to work from.",
  ],

  // ── สถิติย่อ (แสดงใต้ About) ────────────────────────────────
  stats: [
    { value: "5+",  label: "Years of experience" },
    { value: "30+", label: "Projects delivered" },
    { value: "12",  label: "Clients worked with" },
  ],

  // ── ประสบการณ์ / การศึกษา ──────────────────────────────────
  timeline: [
    {
      period: "2023 – Present",
      title: "Web Developer",
      org: "Company Name",
      desc: "Own and develop the company's websites end to end, from interface design through to production release.",
    },
    {
      period: "2021 – 2023",
      title: "Junior Developer",
      org: "Previous Company",
      desc: "Built new features alongside the team and improved the performance of existing systems.",
    },
    {
      period: "2017 – 2021",
      title: "B.Sc. in Information Technology",
      org: "University Name",
      desc: "Graduated with honours. Active in the computer club and software development competitions.",
    },
  ],

  // ── ทักษะ ─────────────────────────────────────────────────
  skills: [
    { group: "Development", items: ["HTML / CSS", "JavaScript", "React", "Node.js", "Git"] },
    { group: "Design",      items: ["Figma", "Adobe Photoshop", "UI/UX Design", "Photography"] },
    { group: "Other",       items: ["English", "Presenting", "Teamwork", "Time management"] },
  ],

  // ── ผลงาน ─────────────────────────────────────────────────
  projects: [
    {
      title: "Project One",
      desc: "A short description of what this project does, the problem it solves, and what your role was.",
      tags: ["React", "Node.js"],
      link: "",
    },
    {
      title: "Project Two",
      desc: "A short description of what this project does, the problem it solves, and what your role was.",
      tags: ["Figma", "UI/UX"],
      link: "",
    },
    {
      title: "Project Three",
      desc: "A short description of what this project does, the problem it solves, and what your role was.",
      tags: ["WordPress"],
      link: "",
    },
  ],

  // ── ติดต่อ ────────────────────────────────────────────────
  //  เว้นว่าง ("") ช่องไหน ช่องนั้นจะไม่แสดงบนเว็บ
  contact: {
    email: "",
    phone: "",
    facebook: "https://www.facebook.com/",
    instagram: "",
    line: "",
    github: "",
    linkedin: "",
  },
};
