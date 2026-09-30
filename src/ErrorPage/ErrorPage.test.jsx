import { describe, expect, it } from "vitest";
import ErrorPage from "./ErrorPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("ErrorPage", () => {
    it("ErrorPage renders a link and heading", () => {
        render(
            <MemoryRouter>
                <ErrorPage />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Oh no, This route does not exist!" })).toBeInTheDocument();

        expect(screen.getByRole("link", { name: "You can go back to home page by clicking here, though!" })).toBeInTheDocument();
    });
});