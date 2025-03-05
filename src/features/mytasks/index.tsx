import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { columns } from "./components/mytasks-column";
import { DataTable } from "./components/mytasks-table";
import { MyTasksDialogs } from "./components/mytasks-dialogs";
import { MyTasksPrimaryButtons } from "./components/mytasks-primary-button";
import MyTasksProvider from "./context/mytasks-context";


export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
 const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);


  const API_URL = "https://amogademo-postgrest.morr.biz/task";
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYXBpX3VzZXIifQ.Ks_9ISeorCCS73q1WKEjZHu9kRx107eOx5VcImPh9U8";
  const API_KEY = `Bearer ${AUTH_TOKEN}`;

  // Fetch tasks from the API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch tasks: ${err.message}`);
      } else {
        setError("Failed to fetch tasks due to an unknown error.");
      }
    } finally {
      setLoading(false);
    }
  };

 

    
  const deleteTask = async (taskId: number) => {
    try {
      // Hide any existing message immediately
      setFeedbackMessage(null);
  
      const response = await fetch(`${API_URL}?task_id=eq.${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          Prefer: "return=representation",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete task. Status: ${response.status}`);
      }
  
      setFeedbackMessage("Task deleted successfully!");
  
      // Fetch updated tasks after deletion
      fetchTasks();
  
      // Automatically hide feedback after 3 seconds
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    } catch (error) {
      setFeedbackMessage(
        error instanceof Error ? `Failed to delete task: ${error.message}` : "Failed to delete task due to an unknown error."
      );
  
      // Hide error message after 5 seconds
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 5000);
    }
  };
 useEffect(() => {
    fetchTasks();
  }, []);
  // useEffect(() => {
  //   console.log("Feedback Message Changed:", feedbackMessage);
  // }, [feedbackMessage]);
  

  return (
    <MyTasksProvider>
      <Header fixed>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <MyTasksPrimaryButtons />
        </div>

        <div className="overflow-auto px-4 py-1">
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">Error: {error}</p>
  ) : (
    <DataTable data={tasks} columns={columns} />
  )}
    {feedbackMessage && (
            <div className="mt-2 p-2 bg-green-100 text-green-800 border border-green-400 rounded">
              {feedbackMessage}
            </div>
          )}
  {/* {feedbackMessage && <p className="text-green-500 mt-2">{feedbackMessage}</p>} */}
</div>

      </Main>

     

      <MyTasksDialogs fetchTasks={fetchTasks} onDelete={deleteTask} authToken={API_KEY} />
    </MyTasksProvider>
  );
}

