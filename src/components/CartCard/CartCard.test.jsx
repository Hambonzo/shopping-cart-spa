import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router";
import userEvent from "@testing-library/user-event";
import CartCard from './CartCard';

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

describe("incrementButton", () => {
    it("Increases quantity of item by one when pressed", async () => {
        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        const mockItem =
        {
            id: 1,
            quantity: 2
        }
            ;

        const user = userEvent.setup();

        render(<CartCard item={mockItem} />);

        const increment = screen.getByRole("button", { name: "+" });

        await user.click(increment);

        expect(setCart).toHaveBeenCalled();

        const updateCart = setCart.mock.calls[0][0];

        const result = updateCart([mockItem]);

        expect(result).toEqual([
            {
                ...mockItem,
                quantity: 3
            }
        ]);
    });

    it("Quantity wont increment past 99", async () => {
        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        const mockItem =
        {
            id: 1,
            quantity: 99
        };

        const user = userEvent.setup();

        render(<CartCard item={mockItem} />);

        const increment = screen.getByRole("button", { name: "+" });

        await user.click(increment);

        expect(setCart).not.toHaveBeenCalled();
    });
});


describe("decrementButton", () => {
    it("Decreases quantity of item by one when pressed", async () => {
        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        const mockItem =
        {
            id: 1,
            quantity: 4
        };

        const user = userEvent.setup();

        render(<CartCard item={mockItem} />);

        const decrement = screen.getByRole("button", { name: "-" });

        await user.click(decrement);

        expect(setCart).toHaveBeenCalled();

        const updateCart = setCart.mock.calls[0][0];

        const result = updateCart([mockItem]);

        expect(result).toEqual([
            {
                ...mockItem,
                quantity: 3
            }
        ]);
    });

    it("Quantity wont decrement below 1", async () => {
        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        const mockItem =
        {
            id: 1,
            quantity: 1
        };

        const user = userEvent.setup();

        render(<CartCard item={mockItem} />);

        const decrement = screen.getByRole("button", { name: "-" });

        await user.click(decrement);

        expect(setCart).not.toHaveBeenCalled();
    });
});

describe("removeItem", () => {
    it("Upon pressing button it should remove the item with the matching id from the cart", async () => {
        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        const mockItem = {
                id: 1,
                quantity: 2
            }

        const cart = [
            mockItem,
            {
                id: 2,
                quantity: 2
            }
        ];

        const user = userEvent.setup();

        render(<CartCard item={mockItem}/>)

        const removeButton = screen.getByRole("button", {name: "Remove"});

        expect(removeButton).toBeInTheDocument();

        await user.click(removeButton);

        expect(setCart).toHaveBeenCalled();

        const updateCart = setCart.mock.calls[0][0];

        const result = updateCart(cart);

         expect(result).toEqual([
            {
                id: 2,
                quantity: 2
            }
        ]);
    });

    describe("pricePerAmount", () => {
        it("price will equal 30 as it multiplies the amoutn by price", () => {
            
            const mockItem = 
                {
                    id: 1,
                    price: 10,
                    quantity: 3
                };

            render(<CartCard item={mockItem}/>);

            const pricePerAmount = screen.getByText("$30.00");

            expect(pricePerAmount).toBeInTheDocument();
        })
    });
})