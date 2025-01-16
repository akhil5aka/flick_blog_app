// import Styles from "./main_style.module.css";
import Link from "next/link";


const Header: React.FC = () => {
  return (
    
    <div className="flex">
     
      <div className="w-6/12">
        <h1 className="text-blue-800 text-6xl font-bold md-8">Flick.</h1>
      </div>

    
      <div className="flex w-6/12 justify-center items-center">
        <div>
          <Link href="/" className="mr-4 hover:underline">
            Home
          </Link>
        </div>

      
        <div>
          <Link href="/blog" className="text-blue-500">
            Go to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
