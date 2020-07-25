import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventClearActiveEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment) // or globalizeLocalizer

export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    //TODO read the events

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveEvent());
    }

    const eventStyleGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: '#0f2862',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <div className="container">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventStyleGetter}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    onSelectSlot={onSelectSlot}
                    selectable={true}
                    onView={onViewChange}
                    view={lastView}
                    components={{
                        event: CalendarEvent
                    }}
                />
            </div>

            <AddNewFab />

            {(activeEvent) && <DeleteEventFab />}

            <CalendarModal />

        </div>
    )
}
