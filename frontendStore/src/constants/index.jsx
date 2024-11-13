import { facebook, instagram } from "../assets/icons";

export const navItems = [
  { label: "الصفحة الرئيسية", href: "/" },
  { label: "اتصل بنا", href: "/contact us" },
  { label: "من نحن", href: "/aboutpage" },
];
export const footerLinks = [
  {
    title: "تواصل معنا", 
    links: [
        { name: "ArtOfIbra.ma", link: "mailto:eladarissiabdelaziz2001@gmail.com" },
        { name: "+212 6 16 88 56 80", link: "" },
    ],
  },
  {
    title: "المساعدة",
    links: [
        { name: "من نحن", link: "/aboutpage" },  
        { name: "الأسئلة المتكررة", link: "/FAQPage" },
        { name: "سياسة الخصوصية", link: "/privacy" }, 
        { name: "سياسة الدفع", link: "/payment" }, 
    ],
  },
  {
      title: "المنتجات", 
      links: [
          { name: " Hoodies", link: "/" },
          { name: " T-shirts", link: "/" },
          { name: "Caps", link: "/" },  
      ],
  },
];


export const socialMedia = [
  { src: facebook, alt: "facebook logo" ,link:'#'},
  { src: instagram, alt: "instagram logo",link:'#'},
];


export default navItems;
