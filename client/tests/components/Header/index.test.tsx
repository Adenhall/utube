import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Header from "../../../src/components/Header"; // Adjust the import path
import { Mock, vi } from "vitest";
import { useAuth } from "../../../src/contexts/auth/hooks";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../../src/contexts/auth/hooks", () => ({
  useAuth: vi.fn(),
}));

describe("Header Component", () => {
  it("renders logo and title", () => {
    (useAuth as Mock).mockReturnValue({ user: null });
    const screen = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByText("Utube")).toBeInTheDocument();
    expect(screen.getByAltText("")).toBeInTheDocument();
  });

  it("displays login form when user is not authenticated", () => {
    (useAuth as Mock).mockReturnValue({ user: null });
    const screen = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Log in / Register")).toBeInTheDocument();
  });

  it("displays user info and share/logout buttons when user is authenticated", () => {
    const mockLogout = vi.fn();
    (useAuth as Mock).mockReturnValue({
      user: { email: "test@example.com" },
      logout: mockLogout,
    });
    const screen = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Share a video")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Log out"));
    expect(mockLogout).toHaveBeenCalled();
  });

  it("opens mobile menu when button is clicked", async () => {
    (useAuth as Mock).mockReturnValue({ user: null });
    const screen = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    fireEvent.click(screen.getByText("Open main menu"));
    expect(screen.getByTestId("mobile-dialog")).toBeInTheDocument();
  });
});
