import Header from "../Header";

describe("Header component", () => {
  const wrapper = shallow(<Header />);

  it("Should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a logo", () => {
    const logo = wrapper.find('[data-test-id="logo"]');
    expect(logo.length).toBe(1);
  });
});
