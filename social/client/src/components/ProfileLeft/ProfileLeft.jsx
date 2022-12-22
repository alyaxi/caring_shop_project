import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import InfoCard from '../InfoCard/InfoCard'
import TrendCard from '../TrendCard/TrendCard';

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
       <LogoSearch/>
       <InfoCard/>
       <TrendCard/>
    </div>
  )
}

export default ProfileLeft