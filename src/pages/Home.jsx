import React from 'react';
import Header from '../components/Header';
import UserLevel from '../components/UserLevel';
import PointsDisplay from '../components/PointsDisplay';
import StoreSection from '../components/StoreSection';

function Home() {
  const currentUser = {
    id: "12345678",
    name: "أحمد محمد",
    bio: "مطور تطبيقات ومهتم بالتكنولوجيا",
    points: 15000
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-6">
        <UserLevel user={currentUser} />
        <PointsDisplay points={currentUser.points} />
        <StoreSection />
      </div>
    </>
  );
}

export default Home;