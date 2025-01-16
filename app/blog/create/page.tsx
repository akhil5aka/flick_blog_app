"use client";

import Styles from "../../components/main_style.module.css";
import { useState } from "react";

interface FormData {
  title: string;
  date: string;
  excerpt: string;
  content: string;
  thumbnail: File | null;
}

export default function CreateBlogPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    date: "",
    excerpt: "",
    content: "",
    thumbnail: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type (e.g., only images)
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      setFormData({ ...formData, thumbnail: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a FormData object to submit the file and other data
    const form = new FormData();
    form.append("title", formData.title);
    form.append("date", formData.date);
    form.append("excerpt", formData.excerpt);
    form.append("content", formData.content);

    // Append thumbnail if it exists
    if (formData.thumbnail) {
      form.append("thumbnail", formData.thumbnail);
    }

    try {
      const response = await fetch("/api/savepost", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        alert("Post saved successfully!");
      } else {
        // Log error for debugging
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(`Failed to save post: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the post.");
    }
  };

  return (
    <div className={Styles.create_blogmain_container}>
      <h1 className="text-2xl font-bold">Create a New Blog Post</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className={Styles.create_formdiv}>
          <label className={Styles.create_labels}>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={Styles.createlable_text}
            required
          />
        </div>

        <div className={Styles.create_formdiv}>
          <label className={Styles.create_labels}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={Styles.createlable_text}
            required
          />
        </div>

        <div className={Styles.create_formdiv}>
          <label className={Styles.create_labels}>Excerpt</label>
          <input
            type="text"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className={Styles.createlable_text}
          />
        </div>

        <div className={Styles.create_formdiv}>
          <label className={Styles.create_labels}>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={Styles.createlable_text}
            rows={8}
            required
          />
        </div>

        <div className={Styles.create_formdiv}>
          <label htmlFor="thumbnail" className={Styles.formLabel}>
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleThumbnailChange}
            className={Styles.formFileInput}
          />
        </div>

        <div className={Styles.create_formdiv}>
          <button type="submit" className={Styles.save_btn}>
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
