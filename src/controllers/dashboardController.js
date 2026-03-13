import {
  getReceptionistDashboard,
  getNurseDashboard,
  getDoctorDashboard,
  getAccountantDashboard,
} from "../services/dashboardService.js";


  //  Dashboard Controller

export const getDashboard = async (req, res) => {
  try {
    const { role, id } = req.user;
    let data;

    switch (role) {
      case "receptionist":
        data = await getReceptionistDashboard();
        break;

      case "nurse":
        data = await getNurseDashboard();
        break;

      case "doctor":
        data = await getDoctorDashboard(id);
        break;

      case "accountant":
        data = await getAccountantDashboard();
        break;

      default:
        return res.status(403).json({ message: "Invalid role" });
    }

    res.status(200).json({ role, data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};