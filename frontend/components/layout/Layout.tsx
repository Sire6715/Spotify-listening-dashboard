import Header from "./Header";
import Footer from "./Footer";
import{ ReactNodeProps} from "@/interfaces/index";



const Layout: React.FC<ReactNodeProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
