import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../Register"; // Adjust this import based on your folder structure
import { sendData } from "../../../hooks/sendData";
import { validateRegister } from "../../../utils/validation";
import toast from "react-hot-toast";

// Mock dependencies
vi.mock("../../../hooks/sendData");
vi.mock("../../../utils/validation");
vi.mock("react-hot-toast");

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Register Component", () => {
  // Mocking the toast methods
  beforeEach(() => {
    toast.success = vi.fn();
    toast.error = vi.fn();
  });

  test("renders the register form correctly", () => {
    renderWithRouter(<Register />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});
