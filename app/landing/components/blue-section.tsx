import React from "react";
import { FaSearch, FaRegCalendarAlt, FaUsers, FaChartLine, FaClock, FaLayerGroup } from "react-icons/fa";

// Step 1: Define Types
type Card = {
  title: string;
  description: string;
  
  icon: JSX.Element;
};

type Section = {
  sectionTitle: string;
  ss:string;
  cards: Card[];
};

// Step 2: Card Data
const cardData: Section[] = [
  {
    sectionTitle: "Designed For",
    ss:"Teams",
    cards: [
      {
        title: "Plan tasks with clarity",
        description:
          "With smart task grouping and flexible scheduling, organizing your to-dos becomes faster and simpler for everyone on your team.",
        icon: <FaRegCalendarAlt />,
      },
      {
        title: "Track progress effortlessly",
        description:
          "Real-time status, reminders, and easy updates keep you informed and focused—no more confusion or missed deadlines.",
        icon: <FaChartLine />,
      },
      {
        title: "Collaborate across roles",
        description:
          "From design to marketing, anyone can jump in, create tasks, and align work without switching tools or needing onboarding.",
        icon: <FaUsers />,
      },
    ],
  },
  {
    sectionTitle: "Built For",
    ss:"Productivity",
    cards: [
      {
        title: "Stay organized, stay ahead",
        description:
          "With clean visuals and priority-based planning, it's easier than ever to focus on what matters most.",
        icon: <FaLayerGroup />,
      },
      {
        title: "Make your day simpler",
        description:
          "Automated reminders, smart labels, and recurring tasks reduce effort so you can move fast and stay in control.",
        icon: <FaClock />,
      },
      {
        title: "All-in-one workspace",
        description:
          "One place for all your tasks, goals, and collaboration—so your entire team works in sync, always.",
        icon: <FaSearch />,
      },
    ],
  },
];

// Step 3: Reusable Card Component
const InfoCard: React.FC<Card> = ({ title, description, icon }) => (
  <div className="w-[10cm] h-[12cm] bg-white rounded-3xl overflow-hidden">
    <div className="p-4">
      <div className="w-14 h-14 bg-[#DEFF96] rounded-4xl flex justify-center items-center text-3xl text-[#360060]">
        {icon}
      </div>
    </div>
    <div className="flex-col flex gap-4 justify-center items-center p-1">
      <h1 className="text-3xl font-medium w-full pl-3 text-[#360060]">{title}</h1>
      <h1>                                                    </h1>
      <h2 className="text-lg font-medium pl-5 text-gray-400">{description}</h2>
    </div>
    <div className="pl-[1cm] pt-[1cm] bg-[#DEFF96] flex justify-end items-center">
      <div className="w-[9cm] bg-[#FFF7FF] h-[5cm] rounded-l-4xl"></div>
    </div>
  </div>
);

// Step 4: Final Component
const BlueSection: React.FC = () => {
  return (
    <section className="bg-[#360060] w-full pt-[4cm] rounded-t-4xl  h-[400vh]">
      <div className="pl-14">
        <h1 className="text-9xl w-[28cm] font-bold text-white">
          <div className="text-[#C583FF] font-headline">Let Me Recall Is</div>
          <div className="text-white font-headline">A Better Way</div>
        </h1>
        <h2 className="w-[13cm]  pt-[2cm]  text-3xl font-light text-[#C583FF]">
          Organize, track, and align your tasks with a modern, intuitive experience built for everyone on your team.
        </h2>
      </div>

      <div className="pl-[7cm]">
        {cardData.map((section, index) => (
          <div key={index}>
            <h1 className="text-9xl font-bold text-[#C583FF] mt-10 w-[22cm] flex flex-col  justify-start items-start text-start font-headline">
              <div>
                {section.sectionTitle}
              </div>
              <div className="text-white">
                {section.ss}
              </div>
            </h1>
            <div className="flex gap-4 pt-[2cm] pb-[2cm] flex-wrap">
              {section.cards.map((card, cardIndex) => (
                <InfoCard
                  key={`${index}-${cardIndex}`}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Final Static Section */}
        <div>
          <h1 className="text-9xl font-bold text-[#C583FF] mt-10 w-[22cm] flex justify-start items-center text-start font-headline">
            Made For Humans
          </h1>
          <h2 className="w-[25cm]  pt-[1cm]   text-3xl font-light text-white ">
            Let Me Recall is designed to make your workflow smooth and stress-free. Whether you're a manager or a maker, our thoughtful, human-first design helps you stay on top of what matters.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default BlueSection;
