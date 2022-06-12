import React, { useEffect, useState } from "react";
import moment from "moment";
import Modal from "react-modal";
import "../../styles/modal.css";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { CloseModal } from "../../actions/ui";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
  RemoveSelectedSlot,
} from "../../actions/calendar";

//******************** time pivker */
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");
Modal.setAppElement("#root");

const InitialEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlusOne.toDate(),
};

export const CalendarModal = () => {
  //const [, setDateStart] = useState(now.toDate());
  //const [, setDateEnd] = useState(nowPlusOne.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent, selectedSlot } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState(InitialEvent);
  const { title, notes, start, end } = formValues;
  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else if (selectedSlot.start) {
      setFormValues({
        ...InitialEvent,
        start: selectedSlot.start,
        end:selectedSlot.end
      })


    } else {
      setFormValues(InitialEvent);
    }
  }, [activeEvent, setFormValues, selectedSlot.start, selectedSlot.end]);

  const closeModal = () => {
    dispatch(CloseModal());
    setFormValues(InitialEvent);
    dispatch(eventClearActive());
    dispatch(RemoveSelectedSlot());
  };
  const onDateStart = (e) => {
    // setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const onDateEnd = (e) => {
    //setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };
  const handleFormChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire({
        title: "Error!",
        text: "La hora de inicio debe ser menor a la hora final",
        icon: "error",
      });
      return;
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    if (!activeEvent) {
      dispatch(eventStartAddNew(formValues));
    } else {
      dispatch(eventStartUpdate(formValues));
    }

    closeModal();
    setTitleValid(true);
  };
  return (
    <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      className="modal"
      closeTimeoutMS={200}
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? activeEvent.title : "Nuevo evento"} </h1>
      <hr />
      <form onSubmit={handleSubmit} className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            className="form-control"
            onChange={onDateStart}
            value={start}
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            minDate={start}
            amPmAriaLabel="Select AM/PM"
            className="form-control"
            onChange={onDateEnd}
            value={end}
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"} `}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleFormChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleFormChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
