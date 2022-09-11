import React, { useState } from 'react';
import { ISubscriptionPlan } from '../../model/Plan';
import { Input, InputNumber, Modal, Switch } from 'antd';
import './AddPlanModal.scss';

export interface AddPlanModalProps {
  isOpen: boolean;
  onClose: (data?: ISubscriptionPlan) => void;
}

export const AddPlanModal: React.FC<AddPlanModalProps> = ({ isOpen, onClose }) => {
  const [isReccuring, setIsReccuring] = useState(false);
  const [paymentInterval, setPaymentInterval] = useState(0)
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  const handleOk = () => {
    onClose({
      title: name,
      reccuring: isReccuring,
      price: price,
      reccuringInterval: paymentInterval || undefined,
    })
  }

  return (
    <Modal title="Create Subscription plan" open={isOpen} onOk={handleOk} onCancel={() => onClose}>
      <div className='form-wrapper'>
        <label>Subscription plan name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter subscription name' />
        <label>Reccuring</label>
        <Switch checked={isReccuring} onChange={(checked) => setIsReccuring(checked)} title="Reccuring" />
        {isReccuring && <label>Subscription interval</label>}
        {isReccuring && <InputNumber value={paymentInterval} onChange={(value) => setPaymentInterval(value)} placeholder="Interval" />}
        <label>Subscription price</label>
        <InputNumber value={price} onChange={(value) => setPrice(value)} placeholder="Subscription price" />
      </div>
    </Modal>
  )
}