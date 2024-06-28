import '../App.css'
import Cards from '../components/Cards/Cards'
import Footer from '../core/Footer'
import UserInformation from '../components/User/UserInformation'

export default function UserPage() {  
  return (
    <>
      <UserInformation />
      <Cards loadUserPosts={true}  />
      <Footer />
    </>
  );
}