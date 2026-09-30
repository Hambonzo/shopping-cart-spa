import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../../routes";
import { describe, it, expect, vi } from 'vitest'

describe("App Navigation & Layout", () => {
    it("Navigates between Home, Shop and Cart links via Header links", async () => {
        const user = userEvent.setup();

        globalThis.fetch = vi.fn().mockResolvedValue({
            status: 200,
            json: async () => []
        });

        const router = createMemoryRouter(routes, { initialEntries: ["/"] });
        render(<RouterProvider router={router} />);

        expect(screen.getByRole("heading", { name: /a store for sourcing your tech needs/i })).toBeInTheDocument();

        const shopLink = screen.getByRole("link", { name: /^shop$/i });
        await user.click(shopLink);
        expect(await screen.findByRole("heading", { name: /shop/i })).toBeInTheDocument();

        const cartLink = screen.getByRole("link", { name: /cart/i });
        await user.click(cartLink);
        expect(await screen.findByRole("heading", { name: /cart/i })).toBeInTheDocument();
    });

    it("Renders errorPage upon a route error", () => {
        const router = createMemoryRouter(routes, { initialEntries: ["/banana"] });
        render(<RouterProvider router={router} />);

        expect(screen.getByRole("heading", { name: "Oh no, This route does not exist!" })).toBeInTheDocument();
    });

    it("Render a error for API error", async () => {
        
        globalThis.fetch = vi.fn().mockResolvedValue({
            status: 400,
        });

        const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
        
        render(<RouterProvider router={router} />);

        expect(await screen.findByText("Error loading catalog.")).toBeInTheDocument();
    });
});