import React, { useState } from 'react';

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

export default EventForm;
