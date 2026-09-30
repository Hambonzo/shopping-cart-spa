import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Shop from "./Shop";
import { useOutletContext } from "react-router";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

describe("Shop", () => {

    it("renders the products returned from the fetch", async () => {

        globalThis.fetch = vi.fn();

        fetch.mockResolvedValue({
            status: 200,
            json: async () => [
                {
                    id: 1,
                    title: "T-Shirt",
                    price: 10,
                    image: "test.jpg",
                    category: "clothing"
                },
                {
                    id: 2,
                    title: "Shoes",
                    price: 20,
                    image: "shoes.jpg",
                    category: "footwear"
                }
            ]
        });

        const setCart = vi.fn();

        useOutletContext.mockReturnValue({
            setCart
        });

        render(<Shop />);

        expect(await screen.findByText("T-Shirt")).toBeInTheDocument();
    });

    it("Shop also renders multiple card elements with all product details and controls", async () => {

        globalThis.fetch = vi.fn();

        fetch.mockResolvedValue({
            status: 200,
            json: async () => [
                {
                    id: 1,
                    title: "T-Shirt",
                    price: 10,
                    image: "test.jpg",
                    category: "clothing",
                },
                {
                    id: 2,
                    title: "Shoes",
                    price: 20,
                    image: "shoes.jpg",
                    category: "footwear"
                }
            ]
        });

        render(<Shop />);

        const cards = await screen.findAllByRole("article");

        expect(cards).toHaveLength(2);

        expect(screen.getByText("T-Shirt")).toBeInTheDocument();
        expect(screen.getByText("$10")).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "T-Shirt" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "CLOTHING" })).toBeInTheDocument();

        expect(screen.getByText("Shoes")).toBeInTheDocument();
        expect(screen.getByText("$20")).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Shoes" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "FOOTWEAR" })).toBeInTheDocument();

        expect(screen.getAllByRole("button", {name: "+"})).toHaveLength(2);
        expect(screen.getAllByRole("button", {name: "-"})).toHaveLength(2);
        expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
    });
});