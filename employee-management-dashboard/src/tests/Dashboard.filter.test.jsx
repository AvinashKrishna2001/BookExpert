describe("Employee filtering logic", () => {
  const employees = [
    { fullName: "John", gender: "Male", isActive: true },
    { fullName: "Jane", gender: "Female", isActive: false },
  ];

  it("filters by gender and status", () => {
    const result = employees.filter(
      (emp) =>
        emp.gender === "Female" && emp.isActive === false
    );

    expect(result.length).toBe(1);
    expect(result[0].fullName).toBe("Jane");
  });
});
