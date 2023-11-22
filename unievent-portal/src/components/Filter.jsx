import "@material/web/chips/chip-set.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/assist-chip.js";
import "@material/web/chips/suggestion-chip.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/switch/switch.js";

const Filter = (props) => {
  return (
    <div>
      <div id="filter-byDate">
        <md-filter-chip elevated class="filter-chip" label="This Week"></md-filter-chip>
        <md-filter-chip elevated class="filter-chip" label="This Month"></md-filter-chip>
        <md-filter-chip elevated class="filter-chip" label="All Events"></md-filter-chip>
      </div>
    </div>
  );
};

export default Filter;
