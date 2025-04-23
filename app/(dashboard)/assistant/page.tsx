import DailyActivities from "@/components/dashboard/DailyActivities";


const CareAssistantDashboard = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">👩‍⚕️ Care Assistant Dashboard</h2>
      <DailyActivities />
    </div>
  );
};

export default CareAssistantDashboard;
