import { useDocumentTitle, useScrollTop } from "hooks";
import React from "react";
import { useState } from "react";
import "./Dashboard.scss";

const Dashboard = () => {
  useDocumentTitle("Welcome | Admin Dashboard");
  useScrollTop();

  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState("Öffnen");

  return (
    <div className="loader-new">
      {/* <h2 style={{ textAlign: "center" }}>Welcome to admin dashboard</h2> */}
      <div className="admin-dashboard-card">
      <h2 style={{textAlign:"center"}}>Welcome to [Your App Name] Admin Dashboard</h2>
      <p className="dashboard-description">
        Our intuitive dashboard provides a centralized hub for managing key aspects of our application, empowering you to make informed decisions and maintain control over various functionalities.
      </p>
    </div>
      <div className="admin-dashboard-card">
      <div className="dashboard-features">
        <h3>Key Features:</h3>
        <ol>
          <li>User Management: Easily manage user accounts, roles, and permissions.</li>
          <li>Order Management: Easily manage orders.</li>
          <li>Print out Orders: (will be marked as printed , sort your oders by printed and unprinted or by date).</li>
          <li>Analytics and Reporting: Access comprehensive analytics and generate insightful reports.</li>
          <li>Content Management: Effortlessly update and organize content.</li>
          <li>Settings and Configuration: Customize application settings for flexibility.</li>
          <li>Activate yout own Blog: (Share your Thoughts with the world)</li>
        </ol>
      </div>
    </div>
      <div className="admin-dashboard-card" style={{marginBottom:"100px"}}>
      <div className="dashboard-get-started">
        <h3>How to Get Started:</h3>
        <ol>
          <li>Explore: Familiarize yourself with the dashboard layout and navigate through the various sections.</li>
          <li>Support and Documentation: For any questions, refer to the provided documentation or reach out to our support team at [Support Email/Contact].</li>
        </ol>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
