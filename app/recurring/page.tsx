"use client"

import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'
import { Calendar, DatePicker, Input, Modal, Form } from 'antd';
import { Button } from '@/components/ui/button';

const RecurringPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    }

    const handleAddEvent = (values) => {
        const newEvent = {...values, date: values.date.format('YYYY-MM-DD')};
        setEvents([...events, newEvent]);
        setIsModalOpen(false);

    }

    const dateCellRender = () => {
        const formattedDate = date.format('YYYY-MM-DD');
        const dayEvents = events.filter(event => event.date === formattedDate);

        return(
            <ul className='events'>
                {dayEvents.map((event, idx) => {
                    return(
                        <li key={idx}>
                            {event.title}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
      <div className='bg-white min-h-screen'>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

        <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
            <div className="flex items-center justify-between">
                <h1 className='text-black text-5xl ml-4 p-6'>Recurring</h1>

                <div className="text-right text-2xl">
                    <Button onClick={showModal}>
                        Add
                    </Button>
                </div>
            </div>

            <div className="">
                <Calendar/>
            </div>

            <Modal title="Add Event" visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
                <Form onFinish={handleAddEvent}>
                    <Form.Item name="Title" label="title" rules={[{required: true, message: 'Please enter an event title'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item name="Date" label="date" rules={[{required: true, message: 'Please select a date'}]}>
                        <DatePicker/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
      </div>
    )
}

export default RecurringPage;
