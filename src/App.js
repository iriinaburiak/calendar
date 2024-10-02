import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function App() {
  const [events, setEvents] = useState([]);

  // Додавання нової події
  const handleAddEvent = (newEvent) => {
    setEvents([...events, { id: events.length, ...newEvent }]);
  };

  // Редагування події
  const handleEditEvent = (editedEvent) => {
    setEvents(events.map(event => event.id === editedEvent.id ? editedEvent : event));
  };

  // Видалення події
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div>
      <h1>Календар</h1>
      <EventForm onAddEvent={handleAddEvent} />
      <MyCalendar 
        events={events}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
}

function MyCalendar({ events, onEditEvent, onDeleteEvent }) {
  // Вибір події для редагування
  const handleSelectEvent = (event) => {
    const newTitle = prompt('Редагувати назву події:', event.title);
    if (newTitle) {
      onEditEvent({ ...event, title: newTitle });
    }
  };

  // Подвійний клік для видалення події
  const handleDoubleClickEvent = (event) => {
    const confirmDelete = window.confirm('Ви впевнені, що хочете видалити цю подію?');
    if (confirmDelete) {
      onDeleteEvent(event.id);
    }
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      onSelectEvent={handleSelectEvent} // Редагування події
      onDoubleClickEvent={handleDoubleClickEvent} // Видалення події
      views={['month', 'week', 'day']} // Додає підтримку місяць/тиждень/день
      defaultView="month" // Початковий вигляд - місяць
    />
  );
}

function EventForm({ onAddEvent }) {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      title,
      start: new Date(start),
      end: new Date(end),
      color,
    });
    setTitle('');
    setStart('');
    setEnd('');
    setColor('#000000');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Назва події"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength="30"
        required
      />
      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit">Додати подію</button>
    </form>
  );
}

export default App;
