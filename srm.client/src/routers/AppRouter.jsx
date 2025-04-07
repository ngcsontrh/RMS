import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import main pages
import Home from './Home';
import SchoolTopics from './SchoolTopics';
import SchoolPublications from './SchoolPublications';
import SchoolOtherActivities from './SchoolOtherActivities';
import PersonalTopics from './PersonalTopics';
import PersonalPublications from './PersonalPublications';
import PersonalOtherActivities from './PersonalOtherActivities';
import Regulations from './Regulations';
import Contact from './Contact';
import Login from './Login';

// Import detail components
import TopicDetail from '../components/TopicDetail';
import PublicationDetail from '../components/PublicationDetail';
import ActivityDetail from '../components/ActivityDetail';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      
      {/* School data routes */}
      <Route path="/school/topics" element={<SchoolTopics />} />
      <Route path="/school/topics/new" element={<TopicDetail />} />
      <Route path="/school/topics/:id" element={<TopicDetail />} />
      <Route path="/school/topics/:id/edit" element={<TopicDetail />} />
      
      <Route path="/school/publications" element={<SchoolPublications />} />
      <Route path="/school/publications/new" element={<PublicationDetail />} />
      <Route path="/school/publications/:id" element={<PublicationDetail />} />
      <Route path="/school/publications/:id/edit" element={<PublicationDetail />} />
      
      <Route path="/school/other-activities" element={<SchoolOtherActivities />} />
      <Route path="/school/other-activities/new" element={<ActivityDetail />} />
      <Route path="/school/other-activities/:id" element={<ActivityDetail />} />
      <Route path="/school/other-activities/:id/edit" element={<ActivityDetail />} />
      
      {/* Personal data routes */}
      <Route path="/personal/topics" element={<PersonalTopics />} />
      <Route path="/personal/topics/new" element={<TopicDetail />} />
      <Route path="/personal/topics/:id" element={<TopicDetail />} />
      <Route path="/personal/topics/:id/edit" element={<TopicDetail />} />
      
      <Route path="/personal/publications" element={<PersonalPublications />} />
      <Route path="/personal/publications/new" element={<PublicationDetail />} />
      <Route path="/personal/publications/:id" element={<PublicationDetail />} />
      <Route path="/personal/publications/:id/edit" element={<PublicationDetail />} />
      
      <Route path="/personal/other-activities" element={<PersonalOtherActivities />} />
      <Route path="/personal/other-activities/new" element={<ActivityDetail />} />
      <Route path="/personal/other-activities/:id" element={<ActivityDetail />} />
      <Route path="/personal/other-activities/:id/edit" element={<ActivityDetail />} />
      
      <Route path="/regulations" element={<Regulations />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRouter;