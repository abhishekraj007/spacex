import Filter from "../Filter";

describe("Filter component", () => {
  const props = {
    handleFilterChange: jest.fn(),
    handleClearFilter: jest.fn(),
  };

  const wrapper = shallow(<Filter {...props} />);

  it("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("clearFilter method shold change state to default", () => {
    const instance = wrapper.instance();
    const events = {
      preventDefault: () => {},
    };
    instance.clearFilter(events);

    expect(instance.state.year).toBe(null);
    expect(instance.state.filterApplied).toBe(false);
    expect(instance.state.land_success).toBe(null);
    expect(instance.state.launch_success).toBe(null);
  });
});
