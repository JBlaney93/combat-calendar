import React, { useEffect, useState } from "react";
import "./App.css";

interface Fighter {
  name: string;
  record: string;
  country: string;
  picture: string;
  link: string;
}

interface Fight {
  main: boolean;
  weight: string;
  fighterA: Fighter;
  fighterB: Fighter;
}

interface Event {
  id: string;
  title: string;
  date: string;
  link: string;
  fights: Fight[];
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://mmafightcardsapi.adaptable.app");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        if (Array.isArray(result.data)) {
          setEvents(result.data);
        } else {
          console.error("Expected an array but got:", result.data);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Upcoming MMA Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              Event Link
            </a>
            <ul>
              {event.fights.map((fight, index) => (
                <li key={index}>
                  <h3>
                    {fight.weight} lbs -{" "}
                    {fight.main ? "Main Event" : "Undercard"}
                  </h3>
                  <div>
                    <strong>
                      {fight.fighterA.name} ({fight.fighterA.record})
                    </strong>
                    <span> vs </span>
                    <strong>
                      {fight.fighterB.name} ({fight.fighterB.record})
                    </strong>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
