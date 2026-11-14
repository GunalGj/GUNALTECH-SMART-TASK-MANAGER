const initialTasks = [
  { id: 1, title: "Finalize homepage wireframes", assignee: "A. Raj", status: "progress" },
  { id: 2, title: "Review customer feedback", assignee: "S. Kumar", status: "todo" },
  { id: 3, title: "Prepare sprint planning", assignee: "Gunal GJ", status: "progress" },
  { id: 4, title: "Set up project workspace", assignee: "M. Joseph", status: "done" },
  { id: 5, title: "Create initial design system", assignee: "A. Raj", status: "done" }
];

let tasks = [...initialTasks];
const taskList = document.querySelector("#taskList");
const searchInput = document.querySelector("#taskSearch");
const statusFilter = document.querySelector("#statusFilter");
const dialog = document.querySelector("#taskDialog");
const taskForm = document.querySelector("#taskForm");

const statusLabels = { todo: "To do", progress: "In progress", done: "Completed" };

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const filter = statusFilter.value;
  const visibleTasks = tasks.filter(task =>
    (filter === "all" || task.status === filter) &&
    (task.title.toLowerCase().includes(query) || task.assignee.toLowerCase().includes(query))
  );

  taskList.innerHTML = "";
  if (!visibleTasks.length) {
    taskList.innerHTML = '<div class="empty-state">No matching tasks. Try another search or create a task.</div>';
  } else {
    visibleTasks.forEach(task => {
      const row = document.createElement("div");
      row.className = "task-row";
      const main = document.createElement("div");
      main.className = "task-main";
      const check = document.createElement("button");
      check.className = "task-check" + (task.status === "done" ? " checked" : "");
      check.type = "button";
      check.setAttribute("aria-label", task.status === "done" ? "Mark as not completed" : "Mark as completed");
      check.textContent = task.status === "done" ? "✓" : "";
      check.addEventListener("click", () => {
        task.status = task.status === "done" ? "todo" : "done";
        renderTasks();
      });
      const info = document.createElement("div");
      const name = document.createElement("div");
      name.className = "task-name";
      name.textContent = task.title;
      const meta = document.createElement("div");
      meta.className = "task-meta";
      meta.textContent = "Task #" + task.id;
      info.append(name, meta);
      main.append(check, info);
      const right = document.createElement("div");
      right.className = "task-right";
      const status = document.createElement("span");
      status.className = "status " + task.status;
      status.textContent = statusLabels[task.status];
      const assignee = document.createElement("span");
      assignee.className = "assignee";
      assignee.textContent = task.assignee;
      right.append(status, assignee);
      row.append(main, right);
      taskList.append(row);
    });
  }

  document.querySelector("#totalTasks").textContent = tasks.length;
  document.querySelector("#progressTasks").textContent = tasks.filter(t => t.status === "progress").length;
  document.querySelector("#completedTasks").textContent = tasks.filter(t => t.status === "done").length;
  document.querySelector("#overdueTasks").textContent = "—";
  document.querySelector("#navTaskCount").textContent = tasks.filter(t => t.status !== "done").length;
}

searchInput.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
document.querySelector("#newTaskButton").addEventListener("click", () => dialog.showModal());
document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
document.querySelector("#cancelDialog").addEventListener("click", () => dialog.close());

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const title = String(formData.get("title")).trim();
  if (!title) return;
  tasks.unshift({
    id: Math.max(0, ...tasks.map(task => task.id)) + 1,
    title,
    assignee: String(formData.get("assignee")).trim() || "Unassigned",
    status: String(formData.get("status"))
  });
  taskForm.reset();
  dialog.close();
  statusFilter.value = "all";
  searchInput.value = "";
  renderTasks();
});

document.querySelector("#menuButton").addEventListener("click", () => {
  document.querySelector("#sidebar").classList.toggle("open");
});
document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("en-IN", {
  weekday: "short", day: "numeric", month: "short", year: "numeric"
}).format(new Date());
document.querySelector("#year").textContent = new Date().getFullYear();

renderTasks();
