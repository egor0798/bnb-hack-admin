import React from 'react';
import { ISubscriptionPlan } from '../../model/Plan';
import { Button } from '@mui/material';
import './SubscriptionsList.scss';

const subs: ISubscriptionPlan[] = [
  {
    price: 10,
    reccuring: true,
    reccuringInterval: 30,
  },
  {
    price: 110,
    reccuring: true,
    reccuringInterval: 60,
  }
]

export const SubscriptionsList: React.FC = () => {
  return (
    <div className="subs-list">
      <div className="subs-list-header">
        <h2>Subscriptions list</h2>
        <Button>Add +</Button>
      </div>
      {subs.map(item => (
        <div className="subs-list-item">
          <h3>Subcription name</h3>
          <div className="item-data">
            <div>Price: </div>
            <div>{item.price}</div>
          </div>
          <div className="item-data">
            <div>Interval: </div>
            <div>{item.reccuringInterval} days</div>
          </div>
          <Button color="error" className="delete-button">Delete</Button>
        </div>
      ))}
    </div>
  )
}