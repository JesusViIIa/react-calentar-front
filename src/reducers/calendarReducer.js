import { types } from "../types/types"
/* {
    id: 32665656320,
    title: "Evento",
    start: moment().toDate(),
    end: moment().add(2, "h").toDate(),
    notes: ' Esto es una nota de evento',
    user: {
        id: 123,
        name: "Pedro",
    },
} */
const initialState = {
    events: [],
    activeEvent: null,
    selectedSlot: {
        start: null,
        end: null
    }

}
export const calendarReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload

            }
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null

            }
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(event => event.id === action.payload.id ? action.payload : event)
            }
        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter(event => event.id !== state.activeEvent.id),
                activeEvent: null
            }
        case types.eventSetSelectedSlot:
            return {
                ...state,
                selectedSlot: {...action.payload }
            }
        case types.eventRemoveSelectedSlot:
            return {
                ...state,
                selectedSlot: {
                    start: null,
                    end: null
                }
            }
        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload]
            }
        case types.eventLogout:
            return initialState



        default:
            return state
    }

}