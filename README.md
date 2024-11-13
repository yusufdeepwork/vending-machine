
# Vending Machine

Vending machine simulation built with React, Redux, Tailwind CSS, TypeScript, and Vite. This project simulates a vending machine that handles money, product selection, temperature control, and energy consumption, featuring both user and administrative functionalities.

## Preview
### Desktop
<img width="1512" alt="image" src="https://github.com/user-attachments/assets/21aa8a81-ba53-499f-b142-737ee6d4d4ee">

### Mobile
<img width="367" alt="image" src="https://github.com/user-attachments/assets/32e75826-5d96-4e63-b715-faa6b300e096">


## Technologies Used

- **React**: A JavaScript library for building user interfaces, providing component-based architecture.
- **Redux**: A state management library to handle global state for the vending machine.
- **Tailwind CSS**: A utility-first CSS framework used to style the components and ensure responsive design.
- **Vite**: A fast, next-generation bundler that speeds up development and build processes.
- **TypeScript**: A statically typed superset of JavaScript to ensure type safety and improved code quality.
- **Vitest**: A testing framework used to run unit and integration tests for the application.
- **ESLint**: A static code analysis tool used to maintain code quality by identifying and fixing problematic patterns.
- **Node Version Manager**:  A tool to manage multiple Node.js versions, ensuring consistency and compatibility across different environments and projects.


## Folder Structure

```
/src
  /components
  /containers
  /hooks
  /shared
    /constants
  /redux
    /slices
  /styles
  /tests
  /types
/public
  /assets
```

## Setup

To get started with the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/vending-machine.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

This will start the development server, and you can view the project in your browser at `http://localhost:3000`.

## Features

- **Product Selection**: Select from a list of available products.
- **Money Handling**: Add money to the machine and see if there’s enough to buy a product.
- **Refund Mechanism**: Refund the money if the user decides not to make a purchase.
- **Temperature Control**: Adjust the temperature level of the machine which affects energy consumption.
- **Timer**: A timer for the machine to complete the operations, with visual feedback.
- **Admin Control**: Administrative functions to collect money and reset the machine.

## Usage

- Add money to the machine by selecting valid money values.
- Select a product to see if you have enough money.
- Refund the money if you don’t wish to purchase.
- Adjust the temperature using the temperature control, which impacts energy usage.
- Start the timer for product preparation, with an alert when time runs out.
- Admin can collect the total money by entering the password.

## Testing

Run unit tests with Vitest:

```bash
npm run test
```

## Linting

To ensure the code follows the style guide and best practices:

```bash
npm run lint
```

## Deployment

To build and preview the project for production:

```bash
npm run build
npm run preview
```

This will generate the production-ready build and serve it locally for testing.

## Conclusion

This vending machine simulates all key operations including money handling, product selection, and administrative controls. It is designed to demonstrate advanced state management with Redux, responsive UI with Tailwind CSS, and strict type safety with TypeScript.
