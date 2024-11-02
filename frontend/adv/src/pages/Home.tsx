import "../App.css";
import Hello from "../components/Hello/Hello";
import Cards from "../components/Cards/Cards";
import Footer from "../core/Footer";
import CreateAPostForm from "../components/Posts/CreateAPostForm";
import useAuth from "../context/AuthContext";

export default function Home() {
  const { isLogged } = useAuth();
  return (
    <>
      <Hello />
      {isLogged ? <CreateAPostForm /> : <></>}
      <Cards />
      <Footer />
    </>
  );
}
