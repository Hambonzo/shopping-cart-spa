import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import Home from './Home';
import { MemoryRouter } from "react-router";

describe("Home", () => {
    it("Home displays a Title, information and a link to Shop", () => {

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
            );

        expect(screen.getByRole("heading", { name: "A store for sourcing your tech needs" })).toBeInTheDocument();

        expect(screen.getByText("Please look at our catalogue of clothing, hardrives, jewlery and monitors!")).toBeInTheDocument();
        
        const shopLink = screen.getByRole("link", {name: /shop now/i});
        expect(shopLink).toBeInTheDocument();
        expect(shopLink).toHaveAttribute("href", "/shop").toBeInTheDocument();
    });
});