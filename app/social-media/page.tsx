import React from "react";

// Sample data for public todos
const todos = [
  {
    id: 1,
    username: "ajeet",
    handle: "opensox.in",
    content: "I want to go deep in one backend language",
    avatar:
      "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/66f66eb49e1847a2a872abf3_Anthony.png",
    likes: 12,
    shares: 3,
    comments: 5,
    saves: 2,
    views: 101,
  },
  {
    id: 2,
    username: "riya",
    handle: "riya.dev",
    content: "Learning React is so fun and powerful!",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 25,
    shares: 8,
    comments: 4,
    saves: 5,
    views: 200,
  },
  // Add more todos as needed
];

export default function SocialMediaTodos() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontWeight: "bold" }}>Public Todos</h1>
      </header>

      {todos.map((todo) => (
        <article
          key={todo.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 20,
            boxShadow: "0 2px 5px rgb(0 0 0 / 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
            <img
              src={todo.avatar}
              alt={`${todo.username} avatar`}
              style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 12 }}
            />
            <div>
              <strong style={{ fontSize: 16 }}>{todo.username}</strong>{" "}
              <span style={{ color: "#555" }}>@{todo.handle}</span>
            </div>
          </div>

          <p style={{ fontSize: 18, marginBottom: 15 }}>{todo.content}</p>

          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 400 }}>
            <button>👍 Like {todo.likes}</button>
            <button>🔁 Share {todo.shares}</button>
            <button>💬 Comment {todo.comments}</button>
            <button>💾 Save {todo.saves}</button>
            <button>👀 Views {todo.views}</button>
          </div>
        </article>
      ))}
    </div>
  );
}
