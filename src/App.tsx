import React, { useEffect, useState } from "react";

type Fighter = {
  name: string;
  record: string;
  country: string;
  picture: string;
  link: string;
};

type Fight = {
  body: boolean;
  weight: string;
  fighterA: Fighter;
  fighterB: Fighter;
};

type Event = {
  id: string;
  title: string;
  date: string;
  link: string;
  fights: Fight[];
};

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOPen] = useState(false);

  const toggle = () => {
    setOPen(!open);
  };

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
    return <div>Loading event information...</div>;
  }

  const weightClasses: { [key: string]: string } = {
    "115": "Strawweight",
    "125": "Flyweight",
    "135": "Bantamweight",
    "145": "Featherweight",
    "155": "Lightweight",
    "170": "Welterweight",
    "185": "Middleweight",
    "205": "Light Heavyweight",
    "265": "Heavyweight",
    "106": "Women's Strawweight",
    "116": "Women's Flyweight",
    "126": "Women's Bantamweight",
    "146": "Women's Featherweight",
  };

  return (
    <>
      <nav className="w-full border-2">
        <p className="py-6 text-4xl">Combat Calendar</p>
      </nav>
      <main className="py-4 flex flex-col gap-8 border-2">
        <h1 className="text-5xl">Upcoming MMA Events</h1>
        <ul className="flex flex-col gap-8">
          {events.map((event) => (
            <li
              key={event.id}
              className="border-black border-2 rounded-lg p-4 bg-sky-50"
            >
              <h2 className="text-4xl">{event.title}</h2>
              <p>{event.date}</p>
              <button onClick={toggle}>See fights</button>
              {open && (
                <ul>
                  {event.fights.map((fight, index) => (
                    <li key={index} className="border">
                      <div className="flex gap-2 items-center justify-between ">
                        <div className="flex flex-col">
                          <span className="text-3xl">
                            {fight.fighterA.name}
                          </span>
                          <strong> ({fight.fighterA.record})</strong>
                        </div>

                        <span> vs </span>

                        <div className="flex flex-col items-end">
                          <span className="text-3xl">
                            {fight.fighterB.name}
                          </span>
                          <strong> ({fight.fighterB.record})</strong>
                        </div>
                      </div>

                      <div className="flex ">
                        <span>
                          {weightClasses[fight.weight]
                            ? weightClasses[fight.weight]
                            : "Catchweight"}
                        </span>
                        <span> {fight.weight} lbs </span>
                      </div>
                      {/* <p>{fight.body ? "body Event" : "Undercard"}</p> */}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default App;
