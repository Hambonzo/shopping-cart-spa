import { vi, describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "./Card";
import { useOutletContext } from "react-router";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

describe("IncrementButton", () => {

    const mockItem = {
        id: 1,
        price: 10,
        title: "T-shirt",
        quantity: 0,
        image: "test-Image.jpg",
        category: "clothing",
    }

    it("should contain a button with text '+' ", () => {

        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        render(<Card product={mockItem} />);

        const incrementButton = screen.getByRole("button", { name: "+" });

        expect(incrementButton).toBeInTheDocument();
    });

    it("should increase quantity of the item from 1 to 2", async () => {

        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        const user = userEvent.setup();

        render(<Card product={mockItem} />);

        const incrementButton = screen.getByRole("button", { name: "+" });

        expect(screen.getByDisplayValue("1")).toBeInTheDocument();

        await user.click(incrementButton);

        expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    });

    it("should not increase quantity of item from 99 to 100 and remain at 99", async () => {

        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        const user = userEvent.setup();

        render(<Card product={mockItem} />)

        const incrementButton = screen.getByRole("button", { name: "+" });

        for (let i = 0; i < 98; i++) {
            await user.click(incrementButton);
        }

        expect(screen.getByDisplayValue("99")).toBeInTheDocument();

        await user.click(incrementButton);

        expect(screen.getByDisplayValue("99")).toBeInTheDocument();
    })


});

describe("DecrementButton", () => {
    const mockItem = {
        id: 1,
        price: 10,
        title: "T-shirt",
        quantity: 0,
        image: "test-Image.jpg",
        category: "clothing",
    }

    it("should contain a button with text '-' ", () => {

        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        render(<Card product={mockItem} />);

        const decrementButton = screen.getByRole("button", { name: "-" });

        expect(decrementButton).toBeInTheDocument();
    });

    it("should decrease quantity of the item from 2 to 1", async () => {

        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        const user = userEvent.setup();

        render(<Card product={mockItem} />);

        const decrementButton = screen.getByRole("button", { name: "-" });
        const incrementButton = screen.getByRole("button", { name: "+" });

        await user.click(incrementButton);

        expect(screen.getByDisplayValue("2")).toBeInTheDocument();

        await user.click(decrementButton);

        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });

    it("should not decrease quantity of item from 1 to 0 and value should remain at 1", async () => {

        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        const user = userEvent.setup();

        render(<Card product={mockItem} />)

        const decrementButton = screen.getByRole("button", { name: "-" });
        const incrementButton = screen.getByRole("button", { name: "+" });

        await user.click(incrementButton);

        expect(screen.getByDisplayValue("2")).toBeInTheDocument();

        await user.click(decrementButton);

        expect(screen.getByDisplayValue("1")).toBeInTheDocument();

        await user.click(decrementButton);

        expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    });
});

describe("ManualChangeInput", () => {
    const mockItem = {
        id: 1,
        price: 10,
        title: "T-shirt",
        quantity: 0,
        image: "test-Image.jpg",
        category: "clothing",
    }

    it("should contain a quantity input", () => {
        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        render(<Card product={mockItem} />);

        const input = screen.getByRole("spinbutton");

        expect(input).toBeInTheDocument();
    });

    it("upon changing input from 1 to 6 quantity should equal 6", async () => {
        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        render(<Card product={mockItem} />);

        const input = screen.getByRole("spinbutton");

        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, "6");

        expect(input).toHaveValue(6);
    });

    it("If value is set below 1 it will go to 1", async () => {
        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        render(<Card product={mockItem} />);

        const input = screen.getByRole("spinbutton");

        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, "-1");

        expect(input).toHaveValue(1);
    });


    it("If value is set above 99 it will go to 99", async () => {
        useOutletContext.mockReturnValue({
            setCart: vi.fn()
        });

        render(<Card product={mockItem} />);

        const input = screen.getByRole("spinbutton");

        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, "221");

        expect(input).toHaveValue(99);
    });
});

describe("HandleAddToCart", () => {
    const mockItem = {
        id: 1,
        price: 10,
        title: "T-shirt",
        quantity: 0,
        image: "test-Image.jpg",
        category: "clothing",
    };

    it("should contain a button that says 'Add to Cart'", () => {
        render(<Card product={mockItem} />);

        const button = screen.getByRole("button", { name: "Add to Cart" });

        expect(button).toBeInTheDocument();
    });

    it("should add an item to cart list if it is not already in the list", async () => {
        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        render(<Card product={mockItem} />);

        const button = screen.getByRole("button", { name: "Add to Cart" });

        const user = userEvent.setup();

        await user.click(button);

        expect(setCart).toHaveBeenCalledTimes(1);

        const updateCart = setCart.mock.calls[0][0];

        const result = updateCart([]);

        expect(result).toEqual([
            {
                ...mockItem,
                quantity: 1
            }
        ]);

        if("If item is already in the array when we add to cart we just increase the quantity of the item", async () => {
            const setCart = vi.fn();

            useOutletContext.mockReturnValue({
                setCart
            });

            render(<Card product={mockItem} />);

            const button = screen.getByRole("button", { name: "Add to Cart" });

            const user = userEvent.setup();

            await user.click(button);

            const mockItemTwo = {
                ...mockItem,
                quantity: 2
            };

            expect(setCart).toHaveBeenCalledTimes(1);

            const updateCart = setCart.mock.calls[0][0];

            const result = updateCart([mockItemTwo]);

            expect(result).toEqual([
                {
                    ...mockItemTwo,
                    quantity: 3
                }
            ]);

        });
});

});
