# EcoSpend

EcoSpend is your ultimate budget tracking app designed to help you take control of your finances. Track expenses, set budgets, and achieve your financial goals effortlessly.

## Features

- Expense Tracking
- Budget Management
- Financial Goal Setting
- Detailed Reports and Charts
- Dark and Light Mode
- Date Range Picker
- Graphical Representation of Expenses

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI, Aceternity UI, TypeScript
- **Backend**: Prisma, PostgreSQL
- **Authentication**: NextAuth
- **State Management**: React Query
- **Deployment**: Vercel

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/DevKrishnasai/EcoSpend.git
   ```
   
2. Navigate to the project directory:
   ```sh
   cd EcoSpend
   ```
   
3. Install dependencies:
   ```sh
   npm install
   ```
   
4. Set up the environment variables by creating a `.env` file and adding the necessary configuration:
   ```env
   DATABASE_URL=
   AUTH_SECRET=
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=
   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=
   ```
   
5. Sync the database schema to your local database using Prisma:
   ```sh
   npx prisma migrate dev --name initial_db
   ```
   
6. Run the development server:
   ```sh
   npm run dev
   ```

## Deployment

EcoSpend is deployed on Vercel. For deployment, you can connect your GitHub repository to Vercel and follow the instructions to deploy.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## Acknowledgements

- Thanks to the creators of Next.js, Prisma, PostgreSQL, Shadcn UI, NextAuth, Tailwind CSS, React Query, and Vercel for their amazing tools.
- Special thanks to Aceternity UI for the UI components.

## Contact

For any inquiries or feedback, please contact [ambatikrishnasai1301@gmail.com](mailto:ambatikrishnasai1301@gmail.com).

