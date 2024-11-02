import "../App.css";
import Cards from "../components/Cards/Cards";
import Footer from "../core/Footer";
import PostInformation from "../components/Posts/PostInformation";

export default function PostPage() {
  return (
    <>
      <PostInformation />
      <Cards />
      <Footer />
    </>
  );
}
