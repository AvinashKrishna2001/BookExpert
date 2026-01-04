import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeForm from "../components/employee/EmployeeForm";

describe("EmployeeForm", () => {
  it("shows validation error when submitting empty form", async () => {
    render(
      <EmployeeForm
        open={true}
        onClose={() => {}}
        onSubmit={() => {}}
        initialData={null}
      />
    );

    // Click Save button (MUI-safe way)
    fireEvent.click(
      screen.getByRole("button", { name: /save/i })
    );

    // Validation message should appear
    expect(
      await screen.findByText("Full name is required")
    ).toBeInTheDocument();
  });
});
