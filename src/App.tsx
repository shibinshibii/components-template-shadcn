
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import InputsDemo from './pages/showcase/forms/InputsDemo';
import SelectsDemo from './pages/showcase/forms/SelectsDemo';
import DatesDemo from './pages/showcase/forms/DatesDemo';
import ControlsDemo from './pages/showcase/forms/ControlsDemo';
import ButtonsDemo from './pages/showcase/ui/ButtonsDemo';
import CardsDemo from './pages/showcase/ui/CardsDemo';
import DialogsDemo from './pages/showcase/ui/DialogsDemo';
import TablesDemo from './pages/showcase/data/TablesDemo';
import FeedbackDemo from './pages/showcase/data/FeedbackDemo';
import { AppToaster } from './components/feedback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/showcase/inputs" element={<InputsDemo />} />
        <Route path="/showcase/selects" element={<SelectsDemo />} />
        <Route path="/showcase/dates" element={<DatesDemo />} />
        <Route path="/showcase/controls" element={<ControlsDemo />} />
        <Route path="/showcase/buttons" element={<ButtonsDemo />} />
        <Route path="/showcase/cards" element={<CardsDemo />} />
        <Route path="/showcase/dialogs" element={<DialogsDemo />} />
        <Route path="/showcase/tables" element={<TablesDemo />} />
        <Route path="/showcase/feedback" element={<FeedbackDemo />} />
      </Routes>
      <AppToaster position="top-right" richColors />
    </Router>
  );
}

export default App;
