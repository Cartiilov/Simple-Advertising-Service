import '../App.css'
import Hello from '../components/Hello/Hello'
import Cards from '../components/Cards/Cards'
import Footer from '../core/Footer'
import CreateAPostForm from '../components/Posts/CreateAPostForm'

export default function Home() {  
  return (
    <>
      <Hello />
      <CreateAPostForm />
      <Cards />
      <Footer />
    </>
  );
}