import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from "./App";
import Login from "./components/LoginPage";
import Signup from "./components/SignUpPage";
import ServicesPage from "./components/ServicesPage";
import SolutionsPage from "./components/SolutionsPage";
import AboutPage from "./components/AboutPage";
import CareerPage from "./components/CareerPage";
import ApplyNowPage from "./components/ApplyNowPage";
import PartnerPage from "./components/PartnerPage";
import AgentPage from "./components/AgentPage";
import ServiceProviderPage from "./components/ServiceProviderPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/applynow" element={<ApplyNowPage />} />
      <Route path="/become-partner" element={<PartnerPage />} />
      <Route path="/become-agent" element={<AgentPage />} />
      <Route path="/become-service-provider" element={<ServiceProviderPage />} />
      <Route path="/" element={<App />} />
    </Routes>
  );
};

export default Routing;