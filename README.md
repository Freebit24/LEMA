
# LEMA - Generalized Lead Management Agent

  

This project is **currently under development** and aims to provide a versatile and efficient platform for managing lead sources and integrations.

  

----------

  

## 🚀 Features (Under Development)

  

-  **Source Configuration**: Connect, manage, and sync with various lead sources (e.g., Gmail, Slack, and more).

-  **Gmail Integration**: Seamlessly fetch leads from Gmail using [Composio.dev](https://composio.dev).

-  **Lead Management**:

- Add, update, and delete leads.

- Categorize and tag leads for better organization.

- Status tracking (New, In Progress, Completed).

-  **Role-Based Access Control**:

- Admin and user roles to secure sensitive data.

-  **Interactive Dashboard**:

- Visualize lead progress and source metrics.

- Real-time updates for better decision-making.

  

----------

  

## 🛠️ Technologies Used

  

-  **Frontend**:

- React.js

- Vite

- TypeScript

- Tailwind CSS

-  **Backend**:

- Firebase Firestore (Database)

- Firebase Authentication (User Management)

-  **API Integration**:

- Composio.dev for Gmail and other lead source integrations.

-  **UI Components**:

- Lucide React (Icons)

-  **Utilities**:

- Axios (HTTP Requests)

  

----------

  

## 📂 Folder Structure

  

```

src/

├── components/ # Reusable UI components

├── pages/ # Main application pages

├── services/ # API calls and external integrations

├── config/ # Firebase and Composio.dev configurations

├── types/ # TypeScript type definitions

├── hooks/ # Custom React hooks

└── context/ # Context API providers

```

  

----------

  

## 🔧 Setup Instructions

  

### Prerequisites

  

- Node.js (v14+)

- npm or yarn

  

### Installation

  

1. Clone the repository:

```bash

git clone https://github.com/your-username/repo-name.git

cd repo-name

```

2. Install dependencies:

```bash

npm install

```

3. Set up environment variables:

- Create a `.env` file in the root directory.

- Add the following variables:

```env

REACT_APP_COMPOSIO_API_KEY=your-api-key

REACT_APP_FIREBASE_API_KEY=your-firebase-api-key

REACT_APP_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain

REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id

```

4. Start the development server:

```bash

npm run dev

```

  

----------

  

## 🚨 Known Issues

  

1.  **CORS Issues**:

- Ensure your API keys are correctly configured in the `.env` file.

2.  **Firebase Rules**:

- Update Firestore security rules to ensure data security.

  

----------

  

## 📚 Future Roadmap

  

-  **Lead Automation**:

- Auto-fetch leads from various integrations.

-  **Advanced Analytics**:

- Charts and visualizations for performance insights.

-  **Multi-User Support**:

- Manage leads collaboratively.

-  **Mobile Compatibility**:

- Fully responsive design for mobile users.

-  **Custom Workflows**:

- User-defined workflows for lead progress.

  

----------

  

## 🤝 Contribution Guidelines

  

We welcome contributions! Here's how you can get involved:

  

1. Fork the repository.

2. Create a new branch:

```bash

git checkout -b feature-name

```

3. Commit your changes:

```bash

git commit -m "Add feature-name"

```

4. Push to the branch:

```bash

git push origin feature-name

```

5. Open a pull request.

  

----------

  

## 📝 License

  

This project is licensed under the MIT License. See the `LICENSE` file for more details.
