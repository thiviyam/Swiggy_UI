import './App.css';
import HomePage from './HomePage';
import FullLogin from './FullLogin';
import Welcome from './Welcome';
import { BrowserRouter as Switch, Routes, Route, Link } from "react-router-dom";
import WelcomeSearch from './WelcomeSearch';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import AddHotel from './AddHotel';
import Orders from './Orders';
import DisplayMenu from './DisplayMenu';
import Checkout from './Checkout';
import ClearCart from './ClearCart';
import UserAddress from './UserAddress';
import Addresses from './Addresses';
import Favorites from './Favorites';
import HomeBanner from './HomeBanner';

function App() {
  const currentLocation = window.location.pathname;
//   const addNav2 = () => {
//   let navBar = document.getElementById("hotelSecondNavBar");
//   let sticky = navBar.offsetTop;

//   console.log("scrolled");

//   if (window.pageYOffset >= sticky) {
//     navBar.classList.add("stickyNav2");
//   } else {
//     navBar.classList.remove("stickyNav2");
//   }
// };
  return (
    <div className="App">
      <Switch>        
       <Routes>
                <Route exact path='/' element={<HomePage/>}></Route>
                <Route path='/user' element={
                                             <>
                                              <Welcome id='0'/>
                                              <HomeBanner/>
                                              <AddHotel/>
                                             </>}></Route>
                <Route exact path='/login/signup' element={<>
                                                              <HomePage/>
                                                              <FullLogin type="signup" area = "home" createAcc = "/login/signup" loginAcc="/login/loginn" crossLoc="/"/>
                                                           </>}></Route>
                <Route exact path='/login/loginn' element={<>
                                                              <HomePage/>
                                                              <FullLogin type="LOGIN" area = "home" createAcc = "/login/signup" loginAcc="/login/loginn" crossLoc="/"/>
                                                           </>}></Route>
                <Route exact path='/welcome/search' element={<>
                                                              <Welcome/>
                                                              <WelcomeSearch/>
                                                             </>}></Route>
                <Route exact path='/welcome/signin' element={<>
                                                              <Welcome/>
                                                              <HomeBanner/>
                                                              <AddHotel/>
                                                              <FullLogin type="signup" area = "welcome" createAcc = "/welcome/signin" loginAcc="/welcome/login" crossLoc="/user"/>
                                                             </>}></Route>
                <Route exact path='/welcome/login' element={<>
                                                              <Welcome/>
                                                              <HomeBanner/>
                                                              <AddHotel/>
                                                              <FullLogin type="LOGIN" area = "welcome" createAcc = "/welcome/signin" loginAcc="/welcome/login" crossLoc="/user"/>
                                                             </>}></Route>
                <Route exact path='/welcome/addAddress' element={<>
                                                              <Welcome/>
                                                              <HomeBanner/>
                                                              <AddHotel/>
                                                              <UserAddress crossloc= "/user"/>
                                                             </>}></Route>
                <Route exact path='/welcome/profile' element={<>
                                                              <Welcome/>
                                                              <UserProfile/>
                                                              <Orders/>
                                                            </>}></Route>
                <Route exact path='/welcome/profile/edit' element={<>
                                                              <Welcome/>
                                                              <UserProfile/>
                                                              <Orders/>
                                                              <EditProfile/>
                                                            </>}></Route>
                <Route exact path='/welcome/profile/orders' element={<>
                                                              <Welcome/>
                                                              <UserProfile/>
                                                              <Orders/>
                                                            </>}></Route>
                <Route exact path='/welcome/profile/favorites' element={<>
                                                              <Welcome/>
                                                              <UserProfile/>
                                                              <Favorites/>
                                                            </>}></Route>
                <Route exact path='/welcome/profile/addresses' element={<>
                                                              <Welcome/>
                                                              <UserProfile/>
                                                              <Addresses/>
                                                            </>}></Route>
                <Route exact path='/welcome/profile/displayMenu/:id' element={<>                
                                                                               <DisplayMenu/>
                                                                             </>}></Route>
                <Route exact path='/checkout/:id' element={<>
                                                        <Welcome render="no"/>
                                                        <Checkout/>
                                                      </>}></Route>
                <Route exact path='/checkout' element={<>
                                                        <Welcome render="no"/>
                                                        <Checkout/>
                                                      </>}></Route>
                <Route exact path={'/checkout/addAddress'} element={<>
                                                        <Welcome render="no"/>
                                                        <Checkout/>
                                                        <UserAddress crossloc= "/checkout"/>
                                                      </>}></Route>
                <Route exact path='/cart/clear/:id' element={
                                                          <>
                                                           <DisplayMenu/>
                                                           <ClearCart/>
                                                          </>
                                                        }></Route>
          
       </Routes>  
       </Switch> 
    </div>
  );
}

export default App;
