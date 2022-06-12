import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es-mx";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar } from "../ui/Navbar";
import { esMessages } from "../../helpers/esMessages";
import { CalendarEvent } from "./CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { OpenModal } from "../../actions/ui";
import {
  eventClearActive,
  eventSetActive,
  eventStartLoading,
  setSelectedSlot,
} from "../../actions/calendar";
import { NewFab } from "../ui/NewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer
moment.locale("es");

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { modalOpen } = useSelector((state) => state.ui);
  const {uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  //const {modalOpen} = useSelector(state=> state.ui)
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: `${(event.user._id ===uid) ? "#367CF7":"#262626" }`,
      borderRadius: "0",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };
  const onDoubleClick = (e) => {
    dispatch(OpenModal());
  };
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };
  const handleSelectedSlot = (e) => {
    if (e.action === "click") {
      return dispatch(eventClearActive());
    }

    dispatch(
      setSelectedSlot({
        start: e.start,
        end: e.end,
      })
    );
    dispatch(OpenModal());
  };

  return (
    <div className="calendarscreen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={esMessages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        selectable
        onSelectSlot={handleSelectedSlot}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
      <NewFab />
      {activeEvent && !modalOpen && <DeleteEventFab />}
    </div>
  );
};
