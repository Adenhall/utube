import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Mock, vi } from "vitest";

import MobileDialog from "../../../src/components/Header/MobileDialog";
import { useAuth } from "../../../src/contexts/auth/hooks";

vi.mock("../../../src/contexts/auth/hooks", () => ({
  useAuth: vi.fn(),
}));

describe("MobileDialog Component", () => {
  const mockSetOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly when user is not authenticated", () => {
    (useAuth as Mock).mockReturnValue({ user: null, signIn: vi.fn() });

    const screen = render(
      <BrowserRouter>
        <MobileDialog open={true} setOpen={mockSetOpen} />
      </BrowserRouter>,
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Log in / Register")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    (useAuth as Mock).mockReturnValue({
      user: { email: "test@example.com" },
      logout: vi.fn(),
    });

    const screen = render(
      <BrowserRouter>
        <MobileDialog open={true} setOpen={mockSetOpen} />
      </BrowserRouter>,
    );

    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Share a video")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  it("calls setOpen with false when close button is clicked", () => {
    (useAuth as Mock).mockReturnValue({ user: null });

    const screen = render(
      <BrowserRouter>
        <MobileDialog open={true} setOpen={mockSetOpen} />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText("Close menu"));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it("calls signIn on form submit", () => {
    const mockSignIn = vi.fn();
    (useAuth as Mock).mockReturnValue({ user: null, signIn: mockSignIn });

    const screen = render(
      <BrowserRouter>
        <MobileDialog open={true} setOpen={mockSetOpen} />
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
    fireEvent.submit(screen.getByRole("button", { name: "Log in / Register"}))

    expect(mockSignIn).toHaveBeenCalledWith("test@example.com", "password");
  });

  it("calls logout when Log out button is clicked", () => {
    const mockLogout = vi.fn();
    (useAuth as Mock).mockReturnValue({
      user: { email: "test@example.com" },
      logout: mockLogout,
    });

    const screen = render(
      <BrowserRouter>
        <MobileDialog open={true} setOpen={mockSetOpen} />
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByText("Log out"));
    expect(mockLogout).toHaveBeenCalled();
  });
});
