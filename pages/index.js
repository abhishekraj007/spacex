import React from "react";
import { withRouter } from "next/router";

import { fetchData } from "../api";
import CustomHead from "../components/Head";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Footer from "../components/Footer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      filterApplied: false,
      loading: false,
    };
  }

  handleFilterChange = async (filterValue) => {
    const { year, launch_success, land_success } = filterValue;
    let query = "?limit=50";
    if (year !== null) query = `${query}&launch_year=${year}`;
    if (launch_success !== null)
      query = `${query}&launch_success=${launch_success}`;
    if (land_success !== null) query = `${query}&land_success=${land_success}`;
    this.setState({ loading: true });

    let result = await fetchData(query);

    this.setState(
      {
        programs: result,
        filterApplied: true,
        loading: false,
      },
      () => {
        this.props.router.push(query, query, { shallow: true });
      }
    );
  };

  handleClearFilter = () => {
    this.setState(
      {
        programs: [],
        filterApplied: false,
      },
      () => {
        this.props.router.push("/", "/", { shallow: true });
      }
    );
  };

  render() {
    // IF data in state is empty take it from props
    // as we are using server side rendering
    // propgrams data will come from props for the first time
    // as state will be empty on Initial load
    // this will happen for the first time
    const { programs = [], loading } = this.state.filterApplied
      ? this.state
      : this.props;

    const renderListItems = () => {
      if (programs.length < 1) {
        return <div className="no-result-found">No program found</div>;
      }
      return programs.map((program) => {
        return <ListItem key={program.flight_number} {...program} />;
      });
    };

    return (
      <div className="page-wrapper">
        <CustomHead />
        <Header />
        <main className="main">
          <div className="home-container">
            <Filter
              className="filter-view"
              handleFilterChange={this.handleFilterChange}
              handleClearFilter={this.handleClearFilter}
            />

            <div className="list-view programs-list">
              {loading ? (
                <div className="loader">
                  <img src="/spinner.gif" alt="loader"></img>
                </div>
              ) : null}
              {renderListItems()}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}

// This is metod is get called once on server
export async function getServerSideProps() {
  // Do first render by server side
  // Get data from api and return it

  const limit = "?limit=50";
  let result = await fetchData(limit);

  return { props: { programs: result } };
}

export default withRouter(Home);
