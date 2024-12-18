import React, { useEffect, useRef, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonModal,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonIcon,
} from "@ionic/react";
import "./Schedule.css";
import { chevronBack, chevronForward } from "ionicons/icons";
import { createGesture } from "@ionic/core";

interface Event {
  date: string; // Fecha en formato "YYYY-MM-DD"
  title: string;
  type: string; // Tipo de evento (meeting, holiday, etc.)
  time: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      date: "2024-12-05",
      title: "Team Meeting",
      type: "meeting",
      time: "12:00",
    },
    {
      date: "2024-12-05",
      title: "Lunch with Client",
      type: "lunch",
      time: "13:00",
    },
    {
      date: "2024-12-12",
      title: "Project Deadline",
      type: "deadline",
      time: "14:00",
    },
    {
      date: "2024-12-25",
      title: "Christmas Day",
      type: "holiday",
      time: "15:00",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("meeting"); // Tipo de evento
  const calendarRef = useRef<HTMLDivElement>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right" | ""
  >("");

  // Generar los días del calendario
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Días del siguiente mes
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setAnimationDirection("right");
    setTimeout(() => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
      );
      setAnimationDirection("");
    }, 300); // Duración de la animación
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setAnimationDirection("left");
    setTimeout(() => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
      );
      setAnimationDirection("");
    }, 300); // Duración de la animación
  };

  const [eventTime, setEventTime] = useState("12:00"); // Estado para la hora del evento

  const addEvent = () => {
    if (selectedDate && eventTitle.trim()) {
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          date: selectedDate,
          title: eventTitle,
          type: eventType,
          time: eventTime,
        },
      ]);
      setEventTitle("");
      setEventType("meeting");
      setEventTime("12:00"); // Reinicia la hora predeterminada
      setShowModal(false);
    }
  };

  const getEventsForDate = (date: string) =>
    events.filter((event) => event.date === date);

  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const handleDayClick = (date: Date) => {
    const formattedDate = formatDate(date);
    // setShowModal(true);
    setSelectedDate(formattedDate);
    setSelectedEvents(getEventsForDate(formattedDate));
  };

  const days = generateCalendarDays();

  useEffect(() => {
    const gesture = createGesture({
      el: calendarRef.current!, // Elemento objetivo del gesto
      gestureName: "calendar-swipe",
      onMove: (ev) => {
        if (ev.deltaX > 50) {
          goToPreviousMonth(); // Deslizar a la derecha
        } else if (ev.deltaX < -50) {
          goToNextMonth(); // Deslizar a la izquierda
        }
      },
    });
    gesture.enable();

    return () => gesture.destroy(); // Limpia el gesto al desmontar
  }, [currentDate]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cronograma</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="calendar-controls">
          <IonIcon icon={chevronBack} onClick={goToPreviousMonth} />
          {currentDate.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
          <IonIcon icon={chevronForward} onClick={goToNextMonth} />
        </div>
        <div
          ref={calendarRef}
          className={`calendar-container ${animationDirection}`}
        >
          <IonGrid>
            {/* Encabezados de días de la semana */}
            <IonRow>
              {["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"].map((day) => (
                <IonCol key={day} className="calendar-header">
                  {day}
                </IonCol>
              ))}
            </IonRow>

            {/* Generación de días */}
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <IonRow key={rowIndex} className="calendar-row">
                {days
                  .slice(rowIndex * 7, rowIndex * 7 + 7)
                  .map((dayObj, index) => (
                    <IonCol key={index}>
                      <div
                        className={`calendar-day ${
                          dayObj.isCurrentMonth ? "" : "calendar-day-outside"
                        }`}
                        onClick={() => handleDayClick(dayObj.date)}
                      >
                        <div
                          className={`${
                            selectedDate === formatDate(dayObj.date)
                              ? "selected-day"
                              : ""
                          }`}
                        >
                          {dayObj.date.getDate()}
                        </div>{" "}
                      </div>
                      {/* Mostrar las barras de eventos */}
                      <div className="event-bars">
                        {getEventsForDate(formatDate(dayObj.date)).map(
                          (event, idx) => (
                            <div
                              key={idx}
                              className={`event-bar ${event.type}`}
                            ></div>
                          )
                        )}
                      </div>
                    </IonCol>
                  ))}
              </IonRow>
            ))}
          </IonGrid>
        </div>
        {/* Lista de eventos debajo del calendario */}
        {selectedEvents.length > 0 && (
          <IonList>
            <IonListHeader>
              <h2>Eventos del {selectedDate}</h2>
            </IonListHeader>
            {selectedEvents.map((event, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h3>{event.title}</h3>
                  <p>Tipo: {event.type}</p>
                  <p>Hora: {event.time}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {/* Modal para agregar eventos */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent className="ion-padding">
            <h2>Agregar Evento</h2>
            <IonItem>
              <IonLabel position="floating">Título del Evento</IonLabel>
              <IonInput
                value={eventTitle}
                onIonChange={(e) => setEventTitle(e.detail.value!)}
                placeholder="Ingrese el título del evento"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Tipo de Evento</IonLabel>
              <IonInput
                value={eventType}
                onIonChange={(e) => setEventType(e.detail.value!)}
                placeholder="Ingrese el tipo de evento"
              />
            </IonItem>
            <IonLabel position="floating">Hora del Evento</IonLabel>
            <IonInput
              type="time"
              value={eventTime}
              onIonChange={(e) => setEventTime(e.detail.value!)}
            />
            <IonButton expand="block" onClick={addEvent}>
              Guardar
            </IonButton>
            <IonButton
              expand="block"
              color="medium"
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Schedule;
