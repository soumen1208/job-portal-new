import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs/Jobs';
import Browse from './components/Browse/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/admin/Companies';
import CreateCompany from './components/admin/CreateCompany';
import CompanySetup from './components/admin/CompanySetup';
import AdminJobs from './components/admin/AdminJobs';
import CreateJobs from './components/admin/CreateJobs';
import Applicants from './components/admin/Applicants';
import ProtectedRoutes from './components/admin/ProtectedRoutes';


const appRouter = createBrowserRouter([
  // CLIENT SIDE ROUTING

  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: < Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/description/:id', element: <JobDescription /> },
  { path: '/browse', element: <Browse /> },
  { path: '/profile', element: <Profile /> },
  { path: '', element: <Home /> },

  // ADMIN SIDE ROUTING----------------------------------------------------------

  //ADMIN SIDE COMPANIES-->
  { path: '/admin/companies', element: <ProtectedRoutes><Companies /> </ProtectedRoutes> },
  { path: '/admin/companies/create', element: <ProtectedRoutes><CreateCompany /></ProtectedRoutes> },
  { path: '/admin/companies/:id', element: <ProtectedRoutes><CompanySetup /></ProtectedRoutes> },
  // ADMIN SIDE JOBS-->
  { path: '/admin/jobs', element: <ProtectedRoutes><AdminJobs /> </ProtectedRoutes> },
  { path: '/admin/jobs/create', element: <ProtectedRoutes><CreateJobs /> </ProtectedRoutes> },
  { path: '/admin/jobs/:id/applicants', element: <ProtectedRoutes><Applicants /></ProtectedRoutes> },

]);

function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
