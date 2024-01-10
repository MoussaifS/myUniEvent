import Nav from "../../../components/Nav";
import CardContainer from "../components/CardContainer";
import "@material/web/tabs/tabs.js";
import "@material/web/tabs/primary-tab.js";
import { useState } from "react";
import { Box, Tabs, Tab} from "@mui/material";




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
          <div>
            <h2>Tab 2 Content</h2>
            <p>Content for Tab 2 goes here...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
    <Nav login/>
      <div>
        <span onClick={() => handleTabClick(0)}>Explore</span>
        <span onClick={() => handleTabClick(1)}>Attending</span>
        {/* Add more buttons for additional tabs */}
      </div>
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Events;