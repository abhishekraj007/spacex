import React, { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { YEARS, SUCCESS_PARAMS } from "./constant";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2006,
      launch_success: null,
      land_success: null,
    };
  }

  handleFilterChange = (type, val) => {
    switch (type) {
      case "YEAR":
        this.setState({ year: val }, () => {
          this.props.handleFilterChange(this.state);
        });
        break;
      case "LAUNCH":
        this.setState({ launch_success: val }, () => {
          this.props.handleFilterChange(this.state);
        });
        break;
      case "LAND":
        this.setState({ land_success: val }, () => {
          this.props.handleFilterChange(this.state);
        });
        break;

      default:
        break;
    }
  };

  render() {
    const { year, launch_success, land_success } = this.state;

    return (
      <div className={this.props.className}>
        <h4>Filters</h4>

        <div>Launch Year</div>
        <ToggleButtonGroup
          type="radio"
          name="year"
          value={year}
          onChange={(val) => this.handleFilterChange("YEAR", val)}
        >
          {YEARS.map((value, idx) => (
            <ToggleButton key={idx} value={value}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <div>Successful Launch</div>
        <ToggleButtonGroup
          type="radio"
          name="launch-sucsess"
          value={launch_success}
          onChange={(val) => this.handleFilterChange("LAUNCH", val)}
        >
          {SUCCESS_PARAMS.map((item, idx) => (
            <ToggleButton key={idx} value={item.value}>
              {item.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <div>Successful Landing</div>
        <ToggleButtonGroup
          type="radio"
          name="land-success"
          value={land_success}
          onChange={(val) => this.handleFilterChange("LAND", val)}
        >
          {SUCCESS_PARAMS.map((item, idx) => (
            <ToggleButton key={idx} value={item.value}>
              {item.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    );
  }
}

export default Filter;
