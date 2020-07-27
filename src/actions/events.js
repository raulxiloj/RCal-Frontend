import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";
import { mapEvents } from "../helpers/mapEvents";
import Swal from "sweetalert2";

export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const res = await fetchWithToken('events/create', event, 'POST');
            const body = await res.json();

            if (body.ok) {
                event._id = body.event._id;
                event.user = {
                    _id: uid,
                    name
                }
                dispatch(eventAddNew(event));
            }

        } catch (e) {
            console.log(e);
        }

    }
}

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {

        try {

            const res = await fetchWithToken(`events/update/${event._id}`, event, 'PUT');
            const body = await res.json();

            if (body.ok) {
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (e) {
            console.log(e);
        }

    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        try {

            const { _id } = getState().calendar.activeEvent;

            const res = await fetchWithToken(`events/delete/${_id}`, {}, 'DELETE');
            const body = await res.json();

            if (body.ok) {
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (e) {
            console.log(e);
        }
    }
}

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventStartLoading = () => {
    return async (dispatch) => {

        try {

            const res = await fetchWithToken('events');
            const body = await res.json();
            const events = mapEvents(body.events);

            dispatch(eventLoaded(events));

        } catch (e) {
            console.log(e);
        }

    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogout = () => ({
    type: types.eventLogout
})