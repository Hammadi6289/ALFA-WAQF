const specialitiesData = [
  {
    id: "eyes",
    name: "Eyes",
    slug: "eyes",
    image: "/assets/images/specialities/Ophthalmo_c1c666cf1c.webp",
    heroTitle: "Expert Eye Care Services",
    heroDescription:
      "Comprehensive eye care with advanced diagnostic technology and experienced ophthalmologists",
    description:
      "Our ophthalmology department offers complete eye care services from routine checkups to complex surgeries.",
    about:
      "Led by experienced ophthalmologists, our eye care center is equipped with the latest diagnostic equipment including OCT, Fundus Camera, and advanced surgical microscopes.",
    treatments: [
      "Cataract Surgery (Phacoemulsification)",
      "Glaucoma Management",
      "LASIK & Refractive Surgery",
      "Diabetic Retinopathy Treatment",
      "Pediatric Ophthalmology",
      "Corneal Transplantation",
      "Retina Surgery",
      "Vision Therapy",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Eyes",
  },
  {
    id: "peads",
    name: "Pediatrics",
    slug: "peads",
    image: "/assets/images/specialities/Pediatric_Hero_da66bfd9e5.webp",
    heroTitle: "Comprehensive Pediatric Care",
    heroDescription:
      "Specialized healthcare for children from newborns to adolescents in a child-friendly environment",
    description:
      "Our pediatrics department provides complete medical care for children, focusing on preventive care and treatment of childhood illnesses.",
    about:
      "Our team of board-certified pediatricians provides compassionate care for children of all ages, from newborns to adolescents. We focus on preventive care, early diagnosis, and treatment of childhood illnesses.",
    treatments: [
      "Well-Child Checkups",
      "Vaccinations & Immunizations",
      "Newborn Care",
      "Childhood Asthma Management",
      "Pediatric Infections",
      "Growth & Development Monitoring",
      "Pediatric Nutrition Counseling",
      "Adolescent Medicine",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Peads",
  },
  {
    id: "general-physician",
    name: "General Physician",
    slug: "general-physician",
    image: "/assets/images/specialities/generalsurgery_Hero.webp",
    heroTitle: "General Medicine & Primary Care",
    heroDescription:
      "Your first point of contact for all health concerns with comprehensive primary care services",
    description:
      "Our general physicians provide comprehensive primary care for patients of all ages, focusing on prevention, diagnosis, and treatment of common illnesses.",
    about:
      "General physicians at Alfalah are trained to diagnose and treat a wide range of medical conditions. They serve as your primary healthcare provider, coordinating all aspects of your care.",
    treatments: [
      "Annual Physical Examinations",
      "Chronic Disease Management (Diabetes, Hypertension)",
      "Acute Illness Treatment",
      "Preventive Health Screenings",
      "Fever & Infection Management",
      "Headache & Migraine Care",
      "Respiratory Infections",
      "Lifestyle & Nutrition Counseling",
    ],
    clinicHours: "Monday - Saturday: 8:00 AM - 8:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=General Physician",
  },
  {
    id: "cardiology",
    name: "Cardiology",
    slug: "cardiology",
    image: "/assets/images/specialities/Cardiology_Hero_77bc173207.webp",
    heroTitle: "Advanced Cardiac Care",
    heroDescription:
      "State-of-the-art heart care with experienced cardiologists and modern diagnostic facilities",
    description:
      "Our cardiology department provides comprehensive cardiovascular care including prevention, diagnosis, and treatment of heart conditions.",
    about:
      "Our team of expert cardiologists uses advanced technology including ECG, echocardiography, and stress testing to provide world-class cardiac care.",
    treatments: [
      "Coronary Angiography",
      "Echocardiography",
      "Stress Testing",
      "Heart Failure Management",
      "Arrhythmia Treatment",
      "Hypertension Management",
      "Preventive Cardiology",
      "Cardiac Rehabilitation",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Cardiologist",
  },
  {
    id: "dentistry",
    name: "Dentistry",
    slug: "dentistry",
    image: "/assets/images/specialities/dental_761417fb10.webp",
    heroTitle: "Complete Dental Care",
    heroDescription:
      "Modern dental services for the whole family with advanced technology and painless procedures",
    description:
      "Our dental clinic offers comprehensive oral healthcare including preventive, restorative, and cosmetic dentistry.",
    about:
      "Our experienced dentists provide quality dental care using the latest technology and techniques to ensure healthy smiles for all ages.",
    treatments: [
      "Routine Dental Checkups",
      "Teeth Cleaning & Scaling",
      "Fillings & Root Canal Treatment",
      "Tooth Extraction",
      "Dental Implants",
      "Teeth Whitening",
      "Orthodontics (Braces)",
      "Pediatric Dentistry",
    ],
    clinicHours: "Monday - Saturday: 10:00 AM - 6:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Dentist",
  },
  {
    id: "gynecology",
    name: "Gynecology",
    slug: "gynecology",
    image: "/assets/images/specialities/ObstetricsGyne.webp",
    heroTitle: "Women's Health & Wellness",
    heroDescription:
      "Comprehensive gynecological care with experienced specialists in a comfortable environment",
    description:
      "Our gynecology department provides complete healthcare for women including preventive care, pregnancy management, and gynecological treatments.",
    about:
      "Our team of gynecologists and obstetricians provides compassionate care for women at all stages of life, from adolescence through menopause.",
    treatments: [
      "Prenatal & Antenatal Care",
      "Normal & Cesarean Deliveries",
      "High-Risk Pregnancy Management",
      "Gynecological Surgeries",
      "Infertility Treatment",
      "Menstrual Disorder Management",
      "Menopause Management",
      "Family Planning Services",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Gynecologist",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    slug: "orthopedics",
    image: "/assets/images/specialities/Orthopedic_Surgery.webp",
    heroTitle: "Expert Bone & Joint Care",
    heroDescription:
      "Advanced orthopedic care for all musculoskeletal conditions with modern surgical facilities",
    description:
      "Our orthopedic department specializes in diagnosis and treatment of bone, joint, and musculoskeletal disorders.",
    about:
      "Led by experienced orthopedic surgeons, our department handles everything from sports injuries to complex joint replacements using advanced surgical techniques.",
    treatments: [
      "Joint Replacement Surgery",
      "Fracture Management",
      "Sports Injury Treatment",
      "Arthroscopic Surgery",
      "Spine Surgery",
      "Trauma Care",
      "Bone Infection Treatment",
      "Pediatric Orthopedics",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Orthopedist",
  },
  {
    id: "psychiatry",
    name: "Psychiatry",
    slug: "psychiatry",
    image: "/assets/images/specialities/Psychiatry_hero.webp",
    heroTitle: "Mental Health & Wellness",
    heroDescription:
      "Compassionate psychiatric care in a safe and confidential environment",
    description:
      "Our psychiatry department offers comprehensive mental health services for children, adolescents, and adults.",
    about:
      "Our team of psychiatrists and psychologists provides evidence-based treatment for various mental health conditions in a supportive, non-judgmental setting.",
    treatments: [
      "Depression & Anxiety Treatment",
      "Bipolar Disorder Management",
      "Schizophrenia Treatment",
      "ADHD Evaluation & Treatment",
      "Addiction & Substance Abuse",
      "OCD Treatment",
      "Psychotherapy & Counseling",
      "Child & Adolescent Psychiatry",
    ],
    clinicHours: "Monday - Saturday: 10:00 AM - 6:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Psychiatrist",
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    slug: "general-surgery",
    image: "/assets/images/specialities/generalsurgery_Hero.webp",
    heroTitle: "Expert Surgical Care",
    heroDescription:
      "Advanced surgical procedures with experienced surgeons and modern operation theaters",
    description:
      "Our general surgery department handles a wide range of surgical procedures with focus on patient safety and optimal outcomes.",
    about:
      "Our team of skilled surgeons performs both elective and emergency surgeries using minimally invasive techniques whenever possible.",
    treatments: [
      "Appendectomy",
      "Hernia Repair",
      "Gallbladder Surgery",
      "Thyroid Surgery",
      "Breast Surgery",
      "Colorectal Surgery",
      "Trauma Surgery",
      "Emergency Surgical Care",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Surgeon",
  },
  {
    id: "neurology",
    name: "Neurology",
    slug: "neurology",
    image: "/assets/images/specialities/Neurology_Hero.webp",
    heroTitle: "Advanced Neurological Care",
    heroDescription:
      "Comprehensive treatment for brain, spine, and nervous system disorders",
    description:
      "Our neurology department provides diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system.",
    about:
      "Our neurologists use advanced diagnostic tools including EEG, EMG, and neuroimaging to provide accurate diagnosis and effective treatment plans.",
    treatments: [
      "Stroke Management",
      "Epilepsy Treatment",
      "Migraine & Headache Care",
      "Parkinson's Disease Management",
      "Multiple Sclerosis Treatment",
      "Neuropathy Management",
      "Memory Disorders",
      "Movement Disorders",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Neurologist",
  },
  {
    id: "urology",
    name: "Urology",
    slug: "urology",
    image: "/assets/images/specialities/Urology_Hero.webp",
    heroTitle: "Expert Urological Care",
    heroDescription:
      "Comprehensive treatment for urinary tract and male reproductive system disorders",
    description:
      "Our urology department specializes in diagnosis and treatment of conditions affecting the urinary system and male reproductive organs.",
    about:
      "Our urologists provide both medical and surgical management of urological conditions using the latest minimally invasive techniques.",
    treatments: [
      "Kidney Stone Treatment",
      "Prostate Disorders",
      "Urinary Tract Infections",
      "Male Infertility",
      "Urinary Incontinence",
      "Bladder Disorders",
      "Erectile Dysfunction",
      "Urological Cancer Treatment",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Urologist",
  },
  {
    id: "laparoscopic-surgery",
    name: "Laparoscopic Surgery",
    slug: "laparoscopic-surgery",
    image: "/assets/images/specialities/laparoscopicsurgery_Hero_.webp",
    heroTitle: "Minimally Invasive Surgery",
    heroDescription:
      "Advanced laparoscopic procedures with faster recovery and minimal scarring",
    description:
      "Our laparoscopic surgery department offers minimally invasive surgical solutions for various conditions.",
    about:
      "Using state-of-the-art laparoscopic equipment, our surgeons perform complex procedures through small incisions, resulting in less pain and faster recovery.",
    treatments: [
      "Laparoscopic Cholecystectomy",
      "Laparoscopic Appendectomy",
      "Laparoscopic Hernia Repair",
      "Laparoscopic Gynecological Surgery",
      "Laparoscopic Colorectal Surgery",
      "Diagnostic Laparoscopy",
      "Laparoscopic Bariatric Surgery",
      "Laparoscopic Urological Procedures",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Laparoscopic Surgeon",
  },
  {
    id: "ent",
    name: "ENT (Otolaryngology)",
    slug: "ent",
    image: "/assets/images/specialities/ENT_Hero.webp",
    heroTitle: "Ear, Nose & Throat Care",
    heroDescription:
      "Specialized care for ear, nose, throat, head, and neck conditions",
    description:
      "Our ENT department provides comprehensive diagnosis and treatment of disorders affecting the ear, nose, throat, and related structures.",
    about:
      "Our ENT specialists use advanced diagnostic and surgical techniques to treat a wide range of conditions from common infections to complex head and neck surgeries.",
    treatments: [
      "Tonsillectomy & Adenoidectomy",
      "Sinus Surgery",
      "Ear Infection Treatment",
      "Hearing Loss Evaluation",
      "Nasal Polyp Removal",
      "Thyroid Surgery",
      "Voice Disorder Treatment",
      "Sleep Apnea Management",
    ],
    clinicHours: "Monday - Saturday: 9:00 AM - 5:00 PM",
    location: "B-17 Main Block, Alfalah General Hospital, Islamabad",
    mapUrl:
      "https://maps.google.com/?q=Alfalah+General+Hospital+B-17+Islamabad",
    appointmentUrl: "/doctors?specialty=Otolaryngologist",
  },
];

export default specialitiesData;
