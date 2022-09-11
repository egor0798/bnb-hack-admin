import React, { useContext, useEffect, useState } from 'react';
import { ISubscriptionPlan } from '../../model/Plan';
import './SubscriptionsList.scss';
import { Button } from 'antd';
import { AddPlanModal } from '../AddPlanModal/AddPlanModal';
import { coreContract } from '../../utils/contracts';
import { AccountContext } from '../../store/AccountProvider';

const subs: ISubscriptionPlan[] = [
  {
    price: 10,
    reccuring: true,
    reccuringInterval: 30,
    title: 'Netflix 4k'
  },
  {
    price: 110,
    reccuring: true,
    reccuringInterval: 60,
    title: 'Spotify premium'
  }
]

export const SubscriptionsList: React.FC = () => {
  const { account } = useContext(AccountContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = (data: ISubscriptionPlan | undefined) => {
    if (data) {
      coreContract.createPlan(data);
    }
    setIsModalOpen(false);
  }

  useEffect(() => {
    account && coreContract.getPlanIds(account).then((res: any) => console.log(res));
  }, [account])

  return (
    <div className="subs-list">
      <div className="subs-list-header">
        <h2>Subscriptions list</h2>
        <Button type='primary' onClick={() => setIsModalOpen(true)}>Add +</Button>
      </div>
      {subs.map((item, i) => (
        <div className="subs-list-item" key={i}>
          <h3>{item.title}</h3>
          <div className="item-data">
            <div>Price: </div>
            <div>{item.price}</div>
          </div>
          {item.reccuring && (
            <div className="item-data">
              <div>Interval: </div>
              <div>{item.reccuringInterval} days</div>
            </div>
          )}
          <Button type='primary' danger className="delete-button">Delete</Button>
        </div>
      ))}
      <AddPlanModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  )
}