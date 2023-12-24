import DesktopSidebar from "@/components/admins/desktopSidebar/DesktopSidebar";
import MobileFooter from "@/components/admins/mobileFooter/MobileFooter";
// import MobileFooter from "@/components/admins/mobileFooter/MobileFooter";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="max-w-[1100px] mx-auto">
        <DesktopSidebar />
        <MobileFooter />
        <div className="lg:ml-[200px] p-5">{children}</div>
      </div>
    </div>
  );
};

export default layout;
