import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import Header from './Header';
import { MemoryRouter } from "react-router";

describe("Header", () => {
    it("Cart will display 8 if we have 3 items with a combined total quantity of 8", () => {

        const cart = [
            {
                quantity: 1
            },
            {
                quantity: 4
            },
            {
                quantity: 3
            }
        ];

        render(
            <MemoryRouter>
                <Header cart={cart} />
            </MemoryRouter>
        );

        const cartNumber = screen.getByText("8");

        expect(cartNumber).toBeInTheDocument();
    });

    it("render the header with the site title and links", () => {
        
          const cart = [];

        render(
            <MemoryRouter>
                <Header cart={cart} />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", {name: "Bonzo's Boutique"})).toBeInTheDocument();

        expect(screen.getByRole("link", {name: "Home"})).toBeInTheDocument();

        expect(screen.getByRole("link", {name: "Shop"})).toBeInTheDocument();

        expect(screen.getByRole("link", {name: /Cart/})).toBeInTheDocument();
    });
});
