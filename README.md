# TalentLink

## Project Introduction
**TalentLink** is an app that streamlines collaboration between brand managers and influencers. It provides a platform for brands to connect with influencers, manage campaigns, and track performance. The app leverages state-of-the-art Natural Language Processing (NLP) capabilities to automate tasks, provide actionable insights, and enhance the overall user experience.

## Key Features
- **Influencer Matching**: TalentLink uses advanced NLP algorithms to match brands with the most relevant influencers, based on their brand voice, audience demographics, and content relevance.
- **Campaign Management**: Brand managers can create, manage, and track campaigns across multiple influencers, with features such as campaign budgets, deadlines, and performance metrics.
- **Performance Tracking**: The platform provides real-time analytics and insights on campaign performance, including engagement rates, reach, and conversions.
- **Automated Tasks**: TalentLink automates tasks like content moderation, invoicing, and payment processing, allowing brand managers to focus on strategic initiatives.
- **Customizable Workflows**: TalentLink offers customizable workflows that accommodate the unique needs of brands and influencers, ensuring a seamless collaboration experience.

## Summary
By leveraging the latest advancements in NLP, TalentLink simplifies the influencer marketing process, enabling brands to connect with the right influencers, streamline campaigns, and maximize ROI.


## Installation

### 1. Clone the Repository
First, clone the project repository from GitHub:
```bash
git clone https://github.com/hemant-i7/talentlink.git
```

### 2. Navigate to the Project Directory
Move into the project directory:
```bash
cd talentlink
```

### 3. Install Dependencies
Install the required dependencies using `npm` or `yarn`:
```bash
npm install
```
or
```bash
yarn install
```

### 4. Set Up Environment Variables
Create an `.env` file in the root directory of the project and add the following environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/?retryWrites=true&w=majority&appName=your_app_name
```

Replace `your_publishable_key`, `your_secret_key`, `your_username`, `your_password`, `your_cluster`, and `your_app_name` with your actual values.

### 5. Run the Development Server
Start the development server:
```bash
npm run dev
```
or
```bash
yarn dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).
