import React, { useState } from 'react'
import moment from 'moment'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';

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

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
    const [validTitle, setValidTitle] = useState(true)

    const [fomrValues, setFomrValues] = useState({
        title: '',
        desc: '',
        start: now.toDate(),
        end: nowPlus1.toDate()
    });

    const { title, desc } = fomrValues;

    const handleInputChange = ({ target }) => {

        setFomrValues({
            ...fomrValues,
            [target.name]: target.value
        })

    }

    const closeModal = () => {
        //TODO 
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

        setValidTitle(true);
        closeModal();

    }

    return (
        <Modal
            isOpen={true}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h4> New Event </h4>
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

                <button type="submit" className="btn btn-outline-success btn-block">
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
