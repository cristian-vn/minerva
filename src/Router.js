import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
import ReactDOM from "react-dom/client";

import Layout from "./pages/Layout";
import Schools from "./pages/schools/Schools";
import Users from "./pages/users/Users";
import Students from "./pages/students/Students";
import Teachers from "./pages/teachers/Teachers";
import Employees from "./pages/employees/Employees";
import Programs from "./pages/programs/Programs";
import Plans from "./pages/plans/Plans";
import Payments from "./pages/payments/Payments";

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Schools />} />
            <Route path="schools" element={<Schools />} />
            <Route path="users" element={<Users />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="employees" element={<Employees />} />
            <Route path="programs" element={<Programs />} />
            <Route path="plans" element={<Plans />} />
            <Route path="payments" element={<Payments />} />
            {/*<Route path="*" element={<NoPage />} />*/}
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);