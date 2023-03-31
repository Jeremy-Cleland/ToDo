// import "@testing-library/jest-dom";
// import { render, screen, fireEvent } from "@testing-library/react";
// import ToDo from ".";

// describe("ToDo Component Tests", () => {
//   test("render a header element as expected", () => {
//     render(<ToDo />);

//     let header = screen.getByTestId("todo-header");
//     let h1 = screen.getByTestId("todo-h1");

//     expect(header).toBeTruthy();
//     expect(header).toBeInTheDocument();
//     expect(h1).toHaveTextContent("To Do List: 0 items pending");
//   });

//   it("test_add_item: adds a new item to the list", () => {
//     const dispatchMock = jest.fn();
//     const state = {
//       list: [],
//       incomplete: 0,
//       showCompleted: false,
//       numDisplayed: 5,
//       difficulty: 3,
//     };
//     const { getByLabelText, getByText } = render(
//       <SettingsProvider value={{ state, dispatch: dispatchMock }}>
//         <ToDo />
//       </SettingsProvider>
//     );
//     fireEvent.change(getByLabelText("To Do Item"), {
//       target: { value: "Test Item" },
//     });
//     fireEvent.change(getByLabelText("Assigned To"), {
//       target: { value: "Test Assignee" },
//     });
//     fireEvent.change(getByLabelText("Difficulty"), { target: { value: 2 } });

//     fireEvent.click(getByText("Add Item"));
//     expect(dispatchMock).toHaveBeenCalledWith({
//       type: "ADD_ITEM",
//       payload: {
//         text: "Test Item",
//         assignee: "Test Assignee",
//         difficulty: 2,
//         id: expect.any(String),
//         complete: false,
//       },
//     });
//   });
// });
