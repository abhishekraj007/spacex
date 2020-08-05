import React from "react";
import { YEARS, SUCCESS_PARAMS, INITIAL_FILTER_STATE } from "./constant";
import { RadioGroup, Radio } from "../RadioButton";

/*
 * Filter component's data for year, launch/land success is kept
 * in constant.js file
 */
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_FILTER_STATE,
    };
  }

  // Method to handle filter change and call fetch method from main component
  handleFilterChange = (type, val) => {
    switch (type) {
      case "YEAR":
        this.setState({ year: val, filterApplied: true }, () => {
          this.props.handleFilterChange(this.state);
        });
        break;
      case "LAUNCH":
        this.setState({ launch_success: val, filterApplied: true }, () => {
          this.props.handleFilterChange(this.state);
        });
        break;
      case "LAND":
        this.setState({ land_success: val, filterApplied: true }, () => {
          this.props.handleFilterChange(this.state);
        });
        break;

      default:
        break;
    }
  };

  // Method to clear filter and make to default state
  clearFilter = (e) => {
    e.preventDefault();

    this.setState({
      ...INITIAL_FILTER_STATE,
    });
    this.props.handleClearFilter();
  };

  render() {
    const { year, launch_success, land_success, filterApplied } = this.state;

    return (
      <div className={this.props.className}>
        <div className="filter-header">
          <h4>Filters</h4>

          {filterApplied ? (
            <a href="#" onClick={this.clearFilter}>
              Clear
            </a>
          ) : null}
        </div>

        <div className="filter-group-header">Launch Year</div>
        <RadioGroup
          name="year"
          selectedValue={year}
          onChange={(val) => this.handleFilterChange("YEAR", val)}
        >
          {YEARS.map((value, idx) => (
            <label className="radio" key={idx}>
              <Radio value={value} />
              <span className="label">{value}</span>
            </label>
          ))}
        </RadioGroup>

        <div className="filter-group-header">Successful Launch</div>
        <RadioGroup
          name="launch-success"
          selectedValue={launch_success}
          onChange={(val) => this.handleFilterChange("LAUNCH", val)}
        >
          {SUCCESS_PARAMS.map((item, idx) => (
            <label className="radio" key={idx}>
              <Radio value={item.value} />
              <span className="label">{item.name}</span>
            </label>
          ))}
        </RadioGroup>

        <div className="filter-group-header">Successful Landing</div>

        <div>
          <RadioGroup
            name="land-success"
            selectedValue={land_success}
            onChange={(val) => this.handleFilterChange("LAND", val)}
          >
            {SUCCESS_PARAMS.map((item, idx) => (
              <label className="radio" key={idx}>
                <Radio value={item.value} />
                <span className="label">{item.name}</span>
              </label>
            ))}
          </RadioGroup>
        </div>
      </div>
    );
  }
}

export default Filter;
