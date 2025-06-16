import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './samyak/components/navbar/navbar';
import Homepage from './pages/Homepage';
import Startups from './prashant/Startup/DiscoverStartups' 
import StartupDetail from './prashant/Details/StartupDetail'
import Register from './samyak/pages/Register';
import About from './samyak/pages/About';
import InvestmentDashboard from './pages/investment-dashboard';
import FundraisingDashboard from './pages/fundraiser-dashboard';
import Investorsregistration from './samyak/pages/Investorsregistration';

import Login from './samyak/pages/Login';

import Startupregistration from './samyak/pages/Startupregistration';
import Footer from '../src/samyak/components/footer/footer'
import DiscoverStartups from './prashant/Startup/DiscoverStartups';
import InvestorDiscovery from './prashant/Investor/FeaturedInvestors';
import InvestorProfile from './prashant/Investor/Details/InvestorDetail';
import ChatBox from './prashant/Investor/Chatbox';



function App() {
  return (
    <div className="App">
    <BrowserRouter>     
      <Navbar />
        <Routes>
                <Route path = "/" element={<Homepage />}/>
          <Route path = "/register" element={<Register />}/>
          <Route path = "/about" element={<About />}/>
          <Route path = '/register/investor' element={<Investorsregistration />}/>
            <Route path='/invest-dashboard' element = {<InvestmentDashboard />}/>
            <Route path='/fundraise-dashboard' element = {<FundraisingDashboard />}/>
            <Route path='/signin' element = {<Login />} />
            <Route path="/startups" element= {<DiscoverStartups/>}/>
            <Route path="/startups/:slug" element= {<StartupDetail/>}/>
            <Route path="/investor" element= {<InvestorDiscovery/>}/>
            <Route path="/investor/:slug" element= {<InvestorProfile/>}/>
            <Route path="/fundraise-dashboard" element= {<FundraisingDashboard/>}/>
            <Route path='/register/startup' element = {<Startupregistration />}/>
            <Route path='/chatbox/:slug' element = {<ChatBox />} />
            <Route path='/chatbox' element = {<ChatBox />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    </div>
    );
}

export default App;
