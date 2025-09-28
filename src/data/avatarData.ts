export interface AvatarData {
  name: string;
  image: string;
  type: "mentor" | "builder";
  batch: string;
  project: string;
}

export const ALL_AVATAR_DATA: AvatarData[] = [
  // Mentors
  {
    name: "Abid",
    image: "/mentors/abid.png",
    type: "mentor",
    batch: "Batch 1",
    project: "AI Platform",
  },
  {
    name: "Ajnas",
    image: "/mentors/ajnas.png",
    type: "mentor",
    batch: "Batch 1",
    project: "Blockchain Solutions",
  },
  {
    name: "Ashwin",
    image: "/mentors/ashwin.png",
    type: "mentor",
    batch: "Batch 2",
    project: "Web3 Infrastructure",
  },
  {
    name: "Jofin",
    image: "/mentors/jofin.png",
    type: "mentor",
    batch: "Batch 2",
    project: "Mobile Development",
  },
  {
    name: "John",
    image: "/mentors/john.png",
    type: "mentor",
    batch: "Batch 3",
    project: "Data Analytics",
  },
  {
    name: "Rahul",
    image: "/mentors/rahul.png",
    type: "mentor",
    batch: "Batch 3",
    project: "Cloud Computing",
  },
  {
    name: "Shahin",
    image: "/mentors/shahin.png",
    type: "mentor",
    batch: "Batch 4",
    project: "Machine Learning",
  },
  {
    name: "Shibin",
    image: "/mentors/shibin.png",
    type: "mentor",
    batch: "Batch 4",
    project: "DevOps",
  },

  // Builders
  {
    name: "Abi",
    image: "/mentee/abi.jpg",
    type: "builder",
    batch: "Batch 5",
    project: "E-commerce Platform",
  },
  {
    name: "Adhil",
    image: "/mentee/adhil.png",
    type: "builder",
    batch: "Batch 5",
    project: "Social Media App",
  },
  {
    name: "Akash",
    image: "/mentee/akash.jpg",
    type: "builder",
    batch: "Batch 6",
    project: "Fintech Solution",
  },
  {
    name: "Aleena",
    image: "/mentee/aleena.jpg",
    type: "builder",
    batch: "Batch 6",
    project: "Health Tech",
  },
  {
    name: "Azif",
    image: "/mentee/azif.jpeg",
    type: "builder",
    batch: "Batch 7",
    project: "EdTech Platform",
  },
  {
    name: "Favas",
    image: "/mentee/favas.jpeg",
    type: "builder",
    batch: "Batch 7",
    project: "Gaming Platform",
  },
  {
    name: "Fazil",
    image: "/mentee/fazil.jpg",
    type: "builder",
    batch: "Batch 8",
    project: "IoT Solution",
  },
  {
    name: "Gautham",
    image: "/mentee/gautham.jpg",
    type: "builder",
    batch: "Batch 8",
    project: "AR/VR App",
  },
  {
    name: "Jacob",
    image: "/mentee/jacob.jpeg",
    type: "builder",
    batch: "Batch 9",
    project: "SaaS Platform",
  },
  {
    name: "Johan",
    image: "/mentee/johan.jpg",
    type: "builder",
    batch: "Batch 9",
    project: "Cybersecurity Tool",
  },
  {
    name: "Shahil",
    image: "/mentee/shahil.jpeg",
    type: "builder",
    batch: "Batch 10",
    project: "Green Tech",
  },
  {
    name: "Unaiz",
    image: "/mentee/unaiz.jpeg",
    type: "builder",
    batch: "Batch 10",
    project: "AgriTech Platform",
  },
];
