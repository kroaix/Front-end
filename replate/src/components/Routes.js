import React from 'react';
import { Route } from 'react-router-dom';
import SignUp from './SignUp';
import { BusinessSignUp1, BusinessSignUp2 } from './BusinessSignUp';
import VolunteerSignUp from './VolunteerSignUp';
import BusinessDashboard from "./BusinessDashboard";

const Routes = () => {
  return (
    <div>
      <Route path="/signup" component={SignUp} />
      <Route path="/business_part1" component={BusinessSignUp1} />
      <Route path="/business_part2" component={BusinessSignUp2} />
      <Route path="/business_dashboard" component={BusinessDashboard} />
      <Route path="/volunteer" component={VolunteerSignUp} />
      <Route path="/dashboard" component={BusinessDashboard} />
    </div>
  )
}

export default Routes;