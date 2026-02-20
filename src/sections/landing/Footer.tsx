import Logo from "@/assets/images/logo.png";

const Footer = () => {
  return (
    // 1️⃣ Removed fixed 1920px. Used w-full with responsive horizontal padding.
    <footer className="w-full bg-[#F5F3F0] pt-[60px] md:pt-[100px] pb-[40px] px-6">
      
      {/* 2️⃣ Standard Max Width Container (1440px) replacing fixed width */}
      <div className="max-w-[1440px] mx-auto">
        
        {/* 3️⃣ Grid System: Stacks on Mobile, 2-cols on Tablet, 3-cols on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-between gap-12 lg:gap-0">

          {/* ───── Left Column (Brand) ───── */}
          {/* Width is fluid on mobile, fixed at 480px on large screens per UI */}
          <div className="w-full lg:w-[480px]">
            <img 
              src={Logo} 
              alt="Reyu Jewels" 
              className="w-[280px] md:w-[400px] h-auto mb-[30px] md:mb-[39px]" 
            />
            <p className="font-old-standard text-[16px] text-[#5A5A5A] leading-[150%] mb-[30px] md:mb-[40px]">
              Crafting timeless diamond elegance since 1999. Every piece tells a story of love,
              celebration, and the pursuit of perfection.
            </p>
            <p className="font-playfair text-[18px] text-[#CEA574] tracking-wide">
              Certified Excellence
            </p>
          </div>

          {/* ───── Quick Links ───── */}
          <div className="w-full md:w-[220px]">
            <h4 className="font-playfair text-[20px] text-[#2A2A2A] mb-[20px] md:mb-[24px]">
              Quick Links
            </h4>
            <ul className="space-y-[12px] md:space-y-[16px] font-old-standard text-[16px] text-[#CEA574]">
              {["About us", "Diamonds", "Collection", "Services", "Contact Us"].map((item) => (
                <li key={item} className="hover:text-[#2A2A2A] transition-colors cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ───── Contact Info ───── */}
          <div className="w-full md:w-[320px]">
            <h4 className="font-playfair text-[20px] text-[#2A2A2A] mb-[20px] md:mb-[24px]">
              Contact Info.
            </h4>
            <ul className="space-y-[12px] md:space-y-[16px] font-old-standard text-[16px] text-[#CEA574] leading-[150%]">
              <li><a href="tel:+919898976568" className="hover:text-[#2A2A2A] transition-colors">+91 98989 76568</a></li>
              <li><a href="mailto:info@reyujewels.com" className="hover:text-[#2A2A2A] transition-colors">info@reyujewels.com</a></li>
              <li className="text-[#CEA574]">
                301, Silver Stone Arcade, Causeway Rd,
                Katargam, Surat, Gujarat 395004
              </li>
            </ul>
          </div>
        </div>

        {/* ───── Divider ───── */}
        {/* Adjusted top margin for mobile responsiveness */}
        <div className="w-full mt-[60px] md:mt-[80px] mb-[40px] border-t border-[#D6D6D6]" />

        {/* ───── Bottom Section ───── */}
        {/* Flex-col on mobile to prevent overlap, flex-row on desktop */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          <p className="font-old-standard text-[14px] text-[#7A7A7A] text-center md:text-left">
            © 2026 Reyu Jewels. All rights reserved.
          </p>

          <div className="flex gap-[30px] md:gap-[40px] font-old-standard text-[14px] text-[#7A7A7A]">
            <span className="hover:text-[#CEA574] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#CEA574] cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;