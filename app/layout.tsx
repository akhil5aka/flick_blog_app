// import Footer from "./components/footer";
// import Header from "./components/header";
// import Styles from "./components/main_style.module.css";

// import Bloglist from "../app/../app/blog/page";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white">
       
        <div id="headerdiv">
        
        </div>

        {/* Main Content */}
       
        <div className="pb-2" id="content div">
          
          <main className="p-8">{children}</main>

         
        </div>

        {/* Shared Footer */}
        <div id="footerdiv">
        
        </div>
      </body>
    </html>
  );
}
