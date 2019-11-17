import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Station from "@/components/Station.vue";

describe("Station.vue", () => {
  it("It renders the page", () => {
    const wrapper = shallowMount(Station);
    expect(wrapper.text()).to.include("Station Outbound Trips");
  });
  it("Page has a button", () => {
    const wrapper = shallowMount(Station);
    expect(wrapper.html("button")).to.include("Get me trips!");
  });
  it("Page has a text input", () => {
    const wrapper = shallowMount(Station);
    expect(wrapper.html("input"));
  });
  it("Can take text and have a button clicked", () => {
    const wrapper = shallowMount(Station);
    wrapper.find("input").setValue("GLC");
    wrapper.find("button").trigger("click");
    expect(wrapper.find("div").text()).to.include("Getting departures...");
  });
});