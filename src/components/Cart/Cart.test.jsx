import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router";
import Cart from './Cart';
import { MemoryRouter } from "react-router";


vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

describe("totalPrice", () => {
    it("adds total price based on quantity of items as well", () => {

        const cart = [

            {
                id: 1,
                price: 10,
                quantity: 2
            },
            {
                id: 2,
                price: 5,
                quantity: 3
            }
        ];

        useOutletContext.mockReturnValue({
            cart
        });

        render(<Cart />);

        expect(screen.getByText("Total: $35")).toBeInTheDocument();
    });

    it("If nothing in cart will render a div with 'Your cart is empty.' and a link to /shop", () => {

        const cart = [];

        useOutletContext.mockReturnValue({
            cart
        });

        render(
            <MemoryRouter>
                <Cart />
            </MemoryRouter>
        );

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();

        const shopLink = screen.getByRole("link", { name: "Browse Shop" });
        expect(shopLink).toBeInTheDocument()
        expect(shopLink).toHaveAttribute("href", "/shop");
    });

    it("If 2 items are in the cart it will render two cards", () => {

        const cart = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        useOutletContext.mockReturnValue({
            cart
        });

        render(<Cart />);

        expect(screen.getAllByRole("article")).toHaveLength(2)
    });

    it("expect cartCard to contain a title, price, total price, remove button, increment and decrement buttons plus a quantity", () => {

        const cart = [
            {
                id: 1,
                title: "Shirt",
                price: 10,
                quantity: 2
            }
        ];

        useOutletContext.mockReturnValue({
            cart
        });

        render(<Cart />);

        const header = screen.getByRole("heading", {name: "Shirt"});

        const price = screen.getByText("$10");

        const decrement = screen.getByRole("button", {name: "-"});
        
        const increment = screen.getByRole("button", {name: "+"});

        const button = screen.getByRole("button", {name: "Remove"});

        const quantity = screen.getByText("2");
        
        const totalPrice = screen.getByText("$20.00")

        expect(header).toBeInTheDocument();

        expect(price).toBeInTheDocument();

        expect(decrement).toBeInTheDocument();

        expect(increment).toBeInTheDocument();

        expect(button).toBeInTheDocument();

        expect(quantity).toBeInTheDocument();

        expect(totalPrice).toBeInTheDocument();
    });
})