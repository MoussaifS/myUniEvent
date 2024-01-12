import { useState } from "react";
import Nav from "../../../components/Nav";
import CardContainer from "../components/CardContainer";
import AttendingHistory from "./AttendingHistory";
const Events = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <CardContainer/>
        );
      case 1:
        return (
          <AttendingHistory/>
        );
      default:
        return null;
    }
  };

  return (
    <div>
    <Nav login/>
      <div id="tabs">
        <span id="tabs-btns" onClick={() => handleTabClick(0)}>Explore</span>
        <span id="tabs-btns" onClick={() => handleTabClick(1)}>Attending</span>
      </div>
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Events;