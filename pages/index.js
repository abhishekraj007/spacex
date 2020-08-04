import React from "react";
import axios from "axios";
import Head from "next/head";
import { withRouter } from "next/router";

import Program from "../components/Program";
import Filter from "../components/Filter";

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
    console.log("apply filter", filterValue);

    const { year, launch_success, land_success } = filterValue;
    let query = "?limit=50";
    if (year) query = `${query}&year=${year}`;
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
    this.setState({
      programs: [],
      filterApplied: false,
    });
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

    const renderPrograms = () => {
      if (programs.length < 1) {
        return <div className="no-result-found">No result found</div>;
      }
      return programs.map((program) => {
        return <Program key={program.flight_number} {...program} />;
      });
    };

    return (
      <div className="page-wrapper">
        <Head>
          <title>Spacex Programs</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="header">SpaceX Lanuch Programs</header>
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
              {renderPrograms()}
            </div>
          </div>
        </main>

        <footer className="footer">
          <strong>Developed By:</strong> Abhishek Raj
        </footer>
      </div>
    );
  }
}

const fetchData = async (query) => {
  const BASE_URL = "https://api.spacexdata.com/v3/launches";
  const url = query ? `${BASE_URL}${query}` : BASE_URL;

  try {
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log("An error occured: ", error);
  }
};

export async function getServerSideProps() {
  // Do first render by server side
  // Get data from api and return it

  const limit = "?limit=50";
  let result = await fetchData(limit);

  return { props: { programs: result } };
}

export default withRouter(Home);
