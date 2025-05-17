import React from 'react';
import usePet from '../hooks/usePet';
import AchievementList from '/workspaces/project08-react-virtual-pet-Ndmounts/src/components/AchievmentList.jsx';

export default function AchievementsPage() {
  const { achievements } = usePet();
  return (
    <div>
      <h2 >Achievements</h2>
      <AchievementList achievements={achievements} />
    </div>
  );
}
