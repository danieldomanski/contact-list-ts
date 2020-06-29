import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";
import apiData from "../api";

jest.mock("../api");

afterEach(() => {
  jest.clearAllMocks();
});

describe("App batch either hydrates the DOM with contacts or gives an error", () => {
  test("correctly processing DOM updates with successfull batch", async () => {
    const contacts = [
      {
        id: "997",
        jobTitle: "Staffing Consultant",
        emailAddress: "Juliette_Holmes5612@zorer.org",
        firstNameLastName: "Juliette Holmes",
      },
    ];

    let apiDataMock = apiData as jest.mock;
    apiDataMock.mockImplementation(() => Promise.resolve(contacts));

    const { getByText, getByRole } = render(<App />);

    expect(getByText("Loading...")).toBeDefined();

    await waitFor(() => expect(apiData).toReturnTimes(1));

    expect(getByRole("listitem")).toBeInTheDocument();

    expect(getByText("Staffing Consultant")).toBeInTheDocument();
  });

  test("correctly processing DOM updates with failed batch", async () => {
    let apiDataMock = apiData as jest.mock;
    apiDataMock.mockImplementation(() => Promise.reject());

    const { getByText } = render(<App />);

    expect(getByText("Loading...")).toBeDefined();

    await waitFor(() =>
      expect(
        getByText("There was an issue with loading resource.")
      ).toBeInTheDocument()
    );
  });
});

describe("Load more button", () => {
  test("Load more button exists and triggers API call", async () => {
    let apiDataMock = apiData as jest.mock;
    apiDataMock.mockImplementation(() => Promise.reject());

    const { findByText, getByText } = render(<App />);

    expect(getByText("Loading...")).toBeDefined();

    const loadMoreBtn = await findByText("Load more");

    await waitFor(() => expect(loadMoreBtn).toBeInTheDocument());

    fireEvent.click(loadMoreBtn);

    await waitFor(() => expect(apiData).toBeCalledTimes(2));
  });
});

describe("Selecting/deselecting feature", () => {
  test("Clicking on contact moves it to selected list & clicking again moves it back to 'data' list", async () => {
    const contacts = [
      {
        id: "997",
        jobTitle: "Staffing Consultant",
        emailAddress: "Juliette_Holmes5612@zorer.org",
        firstNameLastName: "Juliette Holmes",
      },
    ];

    let apiDataMock = apiData as jest.mock;
    apiDataMock.mockImplementation(() => Promise.resolve(contacts));

    const { getByText, getByTestId } = render(<App />);

    expect(getByText("Loading...")).toBeDefined();

    await waitFor(() => expect(apiData).toReturnTimes(1));

    const contactsList = getByTestId("contact-list");
    const selectedList = getByTestId("selected-list");

    expect(contactsList).toBeInTheDocument();
    expect(selectedList).toBeInTheDocument();

    expect(selectedList.childElementCount).toEqual(0);
    expect(contactsList.childElementCount).toEqual(1);

    fireEvent.click(contactsList.childNodes[0]);

    expect(selectedList.childElementCount).toEqual(1);
    expect(contactsList.childElementCount).toEqual(0);

    fireEvent.click(selectedList.childNodes[0]);

    expect(selectedList.childElementCount).toEqual(0);
    expect(contactsList.childElementCount).toEqual(1);
  });
});
