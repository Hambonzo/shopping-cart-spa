import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import Footer from './Footer';

describe("Footer", () => {
    it("Footer contains a header an 2 lines of text with contact details", () => {
        
        render(<Footer />);

        const contactUs = screen.getByText("Contact us");
        const number = screen.getByText("0123456789");
        const email = screen.getByText("bonzoService@gmail.com");

        expect(contactUs).toBeInTheDocument();
        expect(number).toBeInTheDocument();
        expect(email).toBeInTheDocument();
    });
})