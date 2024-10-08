import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Event } from "./models/Event";
import { weightClasses } from "./models/WeightClasses";

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
    return <div>Loading event information...</div>;
  }

  return (
    <main className="flex flex-col gap-8 mx-auto bg-zinc-300">
      <div className="flex flex-col gap-2 py-8 items-center bg-zinc-100">
        <h1 className="text-5xl">Combat Calendar</h1>
        <p className="text-xl text-center">
          A one stop list of upcoming MMA events from all the major promotions.
        </p>
        <p className="text-lg">More features coming soon.</p>
        <a
          className="text-blue-600 text-lg font-medium hover:text-blue-400"
          href="https://github.com/JBlaney93/combat-calendar"
        >
          Check out the code on GitHub
        </a>
      </div>
      <div className="max-w-7xl mx-auto">
        <ul className="flex flex-col gap-8">
          {events.map((event) => (
            <Accordion
              type="single"
              collapsible
              className="bg-zinc-50 rounded-lg"
            >
              <AccordionItem value={event.title}>
                <AccordionTrigger className="bg-zinc-50 rounded-lg hover:no-underline">
                  <div className="flex flex-col items-center w-full pl-4">
                    <p>{event.date}</p>
                    <h2 className="text-4xl border-slate-300 border-b-2 py-2">
                      {event.title}
                    </h2>
                    <h3 className="text-3xl">
                      {event.fights[0].fighterA.name} vs{" "}
                      {event.fights[0].fighterB.name}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <ol className="flex flex-col">
                    {event.fights.map((fight, index) => (
                      <div>
                        {index === 0 && (
                          <div className="flex gap-2 justify-center py-1 bg-red-600 text-white">
                            MAIN EVENT
                          </div>
                        )}
                        <div className="flex gap-2 justify-center py-1 bg-zinc-700 text-white">
                          <span>
                            {weightClasses[fight.weight]
                              ? weightClasses[fight.weight]
                              : "Catchweight"}
                          </span>
                          <span>{fight.weight}lbs</span>
                        </div>
                        <li key={index} className="p-5">
                          <div className="flex gap-2 items-center justify-between ">
                            <div className="flex flex-col max-w-[50%]">
                              <span className="text-3xl">
                                {fight.fighterA.name}
                              </span>
                              <strong> ({fight.fighterA.record})</strong>
                            </div>
                            <div className="flex flex-col max-w-[50%] text-right">
                              <span className="text-3xl">
                                {fight.fighterB.name}
                              </span>
                              <strong> ({fight.fighterB.record})</strong>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
