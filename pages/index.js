import React from "react";
import { withRouter } from "next/router";

import { fetchData } from "../api";
import CustomHead from "../components/Head";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Footer from "../components/Footer";

/*
 * Home page component:
 * Its contains: Head, Header, Filter, ListItems, Footer
 *
 * For ListItems: Render items for first time through props
 * which is available throgh getServerSideProps method in nextjs
 *
 * On Filter change get latest data from api
 * And store in state to re-render component with latest data
 */

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programs: [],
      filterApplied: false,
      loading: false,
    };
  }

  // On each filter change this method gets called with respective
  // applied filter value
  handleFilterChange = async (filterValue) => {
    const { year, launch_success, land_success } = filterValue;

    // Compose query based on applied filter
    let query = "?limit=50";
    if (year !== null) query = `${query}&launch_year=${year}`;
    if (launch_success !== null)
      query = `${query}&launch_success=${launch_success}`;
    if (land_success !== null) query = `${query}&land_success=${land_success}`;
    this.setState({ loading: true });

    // Get data using this query
    let result = await fetchData(query);

    // Set latest data into state to re-render this component
    this.setState(
      {
        programs: result,
        filterApplied: true,
        loading: false,
      },
      () => {
        // Change the URL with latest query
        this.props.router.push(query, query, { shallow: true });
      }
    );
  };

  // To clear filter
  handleClearFilter = () => {
    this.setState(
      {
        programs: [],
        filterApplied: false,
      },
      () => {
        // after filter is cleared
        // clear the URL
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
        {/* Cutomized Head for SEO coverage */}
        <CustomHead />

        {/* Header component with Logo */}
        <Header />

        {/* Main Container */}
        <main className="main">
          <div className="home-container">
            {/* Filter View  */}
            <Filter
              className="filter-view"
              handleFilterChange={this.handleFilterChange}
              handleClearFilter={this.handleClearFilter}
            />

            {/* List View  */}
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

        {/* Footer Component  */}
        <Footer />
      </div>
    );
  }
}

// This is methods gets called on server on each browser refresh, only once.
export async function getServerSideProps() {
  // Does first rendering cycle through server
  // Get data from api and return it

  const limit = "?limit=50";
  let result = await fetchData(limit);

  return { props: { programs: result } };
}

export default withRouter(Home);
