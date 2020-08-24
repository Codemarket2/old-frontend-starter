import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import DateTimePicker from "react-datetime-picker";
import { getAppointmentsQuery } from "../graphql/query";
import {
  createAppointmentMutation,
  updateAppointmentMutation,
  deleteAppointmentMutation,
} from "../graphql/mutation";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Appointment = () => {
  const [createAppointment] = useMutation(createAppointmentMutation);
  const [updateAppointment] = useMutation(updateAppointmentMutation);
  const [deleteAppointment] = useMutation(deleteAppointmentMutation);
  const { loading, error, data, refetch } = useQuery(getAppointmentsQuery);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [appointment, setAppointment] = useState({
    id: null,
    title: "",
    message: "",
    start: null,
    end: null,
  });

  const [events, setEvents] = useState([]);

  const toggle = () => {
    setModal(!modal);
    setUpdate(false);
  };

  const handleSelectSlot = (slotInfo) => {
    toggle();
    setAppointment({
      ...appointment,
      start: slotInfo.start,
      end: slotInfo.start,
    });
  };

  const handleDelete = () => {
    deleteAppointment({
      variables: {
        id: appointment.id,
      },
    }).then(() => {
      refetch();
      toggle();
      setAppointment({
        title: "",
        message: "",
        start: null,
        end: null,
      });
    });
  };

  const handleSelectEvent = (event) => {
    setAppointment({
      id: event._id,
      title: event.title,
      message: event.message,
      start: event.start,
      end: event.start,
    });
    toggle();
    setUpdate(true);
  };

  const onChange = (date) =>
    setAppointment({
      ...appointment,
      start: new Date(date),
      end: new Date(date),
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableSubmit(true);
    if (update) {
      updateAppointment({
        variables: {
          id: appointment.id,
          title: appointment.title,
          message: appointment.message,
          start: appointment.start,
          end: appointment.end,
        },
      })
        .then(() => {
          refetch();
          toggle();
          setAppointment({
            title: "",
            message: "",
            start: null,
            end: null,
          });
          setDisableSubmit(false);
        })
        .catch((err) => {
          alert("Something went wrong please try again");
          setDisableSubmit(false);
        });
    } else {
      createAppointment({
        variables: {
          title: appointment.title,
          message: appointment.message,
          start: new Date(appointment.start),
          end: new Date(appointment.start),
        },
      })
        .then(() => {
          refetch();
          toggle();
          setAppointment({
            title: "",
            message: "",
            start: null,
            end: null,
          });
          setDisableSubmit(false);
        })
        .catch((err) => {
          alert("Something went wrong please try again");
          setDisableSubmit(false);
        });
    }
  };

  useEffect(() => {
    if (loading === false && data) {
      setEvents(
        data.getAppointments.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.start),
        }))
      );
    }
  }, [loading, data]);

  if (loading) return null;
  if (error) return `Error! ${error.message} Please try again`;

  return (
    <div style={{ padding: "10px" }}>
      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>
            {update ? "Update" : "Create New"} Appointment
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={appointment.title}
                onChange={(e) =>
                  setAppointment({ ...appointment, title: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="text"
                name="message"
                id="message"
                placeholder="message"
                value={appointment.message}
                onChange={(e) =>
                  setAppointment({ ...appointment, message: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Date and Time</Label>
              <div>
                <DateTimePicker onChange={onChange} value={appointment.start} />
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            {update ? (
              <>
                <Button color="warning" disabled={disableSubmit} type="submit">
                  {disableSubmit ? "Updating..." : "Update"}
                </Button>
                <Button color="danger" onClick={handleDelete} type="button">
                  Delete
                </Button>
              </>
            ) : (
              <Button color="primary" disabled={disableSubmit} type="submit">
                {disableSubmit ? "Creating..." : "Create"}
              </Button>
            )}

            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Calendar
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ minHeight: "500px", height: "calc(100vh - 80px)" }}
        selectable={true}
      />
    </div>
  );
};

export default Appointment;
