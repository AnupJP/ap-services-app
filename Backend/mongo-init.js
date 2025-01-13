db = connect("localhost:27017/admin");

db.auth("admin", "password");

db = db.getSiblingDB("task-manager");

db.createUser({
  user: "task_user",
  pwd: "Admin@123",
  roles: [{ role: "readWrite", db: "task-manager" }]
});
