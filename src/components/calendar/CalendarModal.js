import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

const now = moment().seconds(0);
const nowPlus1 = now.clone().add(1, 'hour');

const initEvent = {
    title: '',
    desc: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui);
    const { activeEvent } = useSelector(state => state.calendar);

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [validTitle, setValidTitle] = useState(true)

    const [fomrValues, setFomrValues] = useState(initEvent);
    const { title, desc } = fomrValues;

    useEffect(() => {

        if (activeEvent) {
            setFomrValues(activeEvent);
        } else {
            setFomrValues(initEvent);
        }

    }, [activeEvent, setFomrValues])

    const handleInputChange = ({ target }) => {

        setFomrValues({
            ...fomrValues,
            [target.name]: target.value
        })

    }

    const closeModal = () => {
        dispatch(uiCloseModal());
        setFomrValues(initEvent);
        dispatch(eventClearActiveEvent());
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFomrValues({
            ...fomrValues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e);
        setFomrValues({
            ...fomrValues,
            end: e
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title.trim().length < 2)
            return setValidTitle(false);

        //TODO save in DB

        if (activeEvent) {//Updating
            dispatch(eventUpdated(fomrValues));
        } else {//New
            dispatch(eventAddNew({
                ...fomrValues,
                id: new Date().getTime(),
                user: {
                    _id: 12345,
                    name: 'Raul Xiloj'
                }
            }));
        }

        setValidTitle(true);
        closeModal();

    }

    return (
        <Modal
            isOpen={modalOpen}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h4> {(activeEvent) ? 'Editar evento' : 'Nuevo evento'} </h4>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div>
                    <label>Date start</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div>
                    <label>Date end</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart}
                        className="form-control"
                    />
                </div>
                <hr />

                <div className="form-group">
                    <label>Title and description</label>
                    <input
                        type="text"
                        className={`form-control ${!validTitle && 'is-invalid'}`}
                        placeholder="Event title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />

                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="A short description"
                        rows="4"
                        name="desc"
                        value={desc}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-block btnSave">
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
