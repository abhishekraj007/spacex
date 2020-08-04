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
    };
  }

  handleFilterChange = async (filterValue) => {
    console.log("apply filter", filterValue);

    const { year, launch_success, land_success } = filterValue;
    let query = "?limit=100";
    if (year) query = `${query}&year=${year}`;
    if (launch_success !== null)
      query = `${query}&launch_success=${launch_success}`;
    if (land_success !== null) query = `${query}&land_success=${land_success}`;

    console.log(query);

    let result = await fetchData(query);
    console.log(result);
    console.log(this.props);

    this.setState(
      {
        programs: result,
        filterApplied: true,
      },
      () => {
        this.props.router.push(query, query, { shallow: true });
      }
    );
  };

  // async componentDidUpdate() {
  //   console.log("compone did update");
  //   const { year, launch_success, land_success } = this.state.filters;
  //   let query = "";
  //   if (year) query = `${query}&year=${year}`;
  //   if (launch_success !== null)
  //     query = `${query}&launch_success=${launch_success}`;
  //   if (land_success !== null) query = `${query}&land_success=${land_success}`;

  //   console.log(query);

  //   let result = await fetchData(query);
  //   console.log(result);
  //   console.log(this.props);

  //   const href = `?${query}`;
  //   this.props.router.push(href, href, { shallow: true });
  // }

  render() {
    // IF data in state is empty take it from props
    // as we are using server side rendering
    // propgrams data will come from props for the first time
    // as state will be empty on Initial load
    // this will happen for the first time
    const { programs = [] } = this.state.filterApplied
      ? this.state
      : this.props;

    const renderPrograms = () => {
      if (programs.length < 1) {
        return <div className="text-center">No result found</div>;
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
            />
            <div className="list-view programs-list">{renderPrograms()}</div>
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
  const BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";
  const url = query ? `${BASE_URL}${query}` : BASE_URL;

  try {
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log("An error occured during fetch", error);
  }
};

export async function getServerSideProps() {
  // Get programs from api and return it
  let result = await fetchData();

  return { props: { programs: result } };
}

export default withRouter(Home);
