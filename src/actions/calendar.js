import Swal from "sweetalert2";
import { fetchToken } from "../helpers/fetch";
import { stringToDate } from "../helpers/stringToDate";
import { types } from "../types/types";


export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {
        try {
            const res = await fetchToken('events', event, 'POST')
            const data = await res.json()
            if (data.ok) {
                const { uid: _id, name } = getState().auth
                event.id = data.event.id
                event.user = { _id, name }
                dispatch(eventAddNew(event))
                console.log(event);
            }
        } catch (error) {
            console.log(error);
        }

    }
}

export const eventStartLoading = () => {
    return async(dispatch) => {
        try {
            const res = await fetchToken('events')
            const data = await res.json()
            if (!data.ok) throw data.msg
            const events = stringToDate(data.events)
            dispatch(eventsLoaded(events))
        } catch (error) {
            console.log(error);

        }

    }
}

const eventsLoaded = (events) => ({ type: types.eventLoaded, payload: events })



export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});
export const eventClearActive = () => ({
    type: types.eventClearActive,
});


export const eventStartUpdate = (event) => {
    return async dispatch => {
        try {
            const res = await fetchToken(`events/${event.id}`, event, 'PUT')
            const data = await res.json()
            if (!data.ok) return Swal.fire('Error', data.msg, 'error')
            dispatch(eventUpdate(event))

        } catch (error) {
            console.log(error);
        }

    }
}



export const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const eventStartDelete = () => {
    return async(dispatch, getState) => {
        const { activeEvent } = getState().calendar
        try {
            const res = await fetchToken(`events/${activeEvent.id}`, {}, 'DELETE')
            const data = await res.json()
            if (!data.ok) return Swal.fire('Error', data.msg, 'error')
            dispatch(eventDelete())

        } catch (error) {
            console.log(error);
        }

    }
}



export const eventDelete = () => ({
    type: types.eventDelete
});

export const setSelectedSlot = (slot) => ({
    type: types.eventSetSelectedSlot,
    payload: slot
})
export const RemoveSelectedSlot = () => ({
    type: types.eventRemoveSelectedSlot
})

export const eventLogout = () => ({ type: types.eventLogout })