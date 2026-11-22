# Leaf & Living

A responsive plant catalogue with an administrator portal, built as a React single page application. Visitors browse, search and filter plants; the administrator adds, edits and deletes products. Data is stored in a simulated backend (JSON Server), so saved changes survive a browser refresh.

> A little green. A better space.

## Features

- Home page, Shop with live search (name or category), care-level filter, reset and result count
- Product details page for each plant
- Admin portal: product list, add, edit (including price) and delete with confirmation
- Validated product form with clear messages, progress, success and error feedback
- Loading, empty-result, missing-product and request-error states
- Client-side routing with an unknown-route page, responsive on mobile and desktop

## Tech stack

React with Vite, React Router, plain CSS, JSON Server, Fetch API, Vitest and React Testing Library.

## Team

| Member | Responsibility |
|---|---|
| Ryan Otieno (team leader) | Repository, routing, layout, shared styles, integration, README |
| Abshiro | Home, Shop, product details, product cards, search and filtering |
| Shalom | Admin list, product form, add and edit pages, validation, delete confirmation |
| Ajhok | JSON Server, API functions, `useProducts`, seed data, backend documentation |

## Screenshots

_Add screenshots of Home, Shop, Product details, Admin and the form here._

## Known limitations

- No login or access control: the admin portal is a demonstration workspace.
- No shopping cart, checkout, payments or image uploads (outside the project scope).
- Product images are chosen from a fixed bundled list.
- The JSON Server backend must be running for products to load.

## Image credits

Photographs from [Unsplash](https://unsplash.com), used under the [Unsplash License](https://unsplash.com/license).

- Snake Plant: Sayan Majhi
- Aloe Vera: David Docil
- Peace Lily: Marta Pawlik
- Fiddle Leaf Fig: Nick Morrison
- Jade Plant: _photographer name_
- Lavender: _photographer name_
- Home hero image: _photographer name_

The `placeholder.svg` fallback graphic was created for this project.