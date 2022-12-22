import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard.jsx/ProfileCard'
import "./ProfileSide.css"

import TrendCard from '../TrendCard/TrendCard';
const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
<LogoSearch/>
<ProfileCard location= "homepage"/>
<TrendCard/>
    </div>
  )
}

export default ProfileSide