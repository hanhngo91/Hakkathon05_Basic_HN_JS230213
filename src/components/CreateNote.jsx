import React, { useEffect, useState } from "react";
import axios from "axios";

function NoteContent() {
  const [note, setNote] = useState([]);
  const [content, setContent] = useState("");

  //Get all notes from database:
  const loadNotes = async () => {
    await axios.get("http://localhost:3001/notes").then((response) => {
      setNote(response.data.data);
      console.log(response.data.data);
    });
  };

  useEffect(() => {
    loadNotes();
  }, []);

  //Add new note to database:
  const handleAdd = async () => {
    await axios
      .post("http://localhost:3001/notes", {
        Content: content,
      })
      .then((response) => {
        console.log(response);
        setContent("");
        loadNotes();
      });
  };

  //Delete a note from database:
  const handleDelete = (id) => async () => {
    await axios.delete(`http://localhost:3001/notes/${id}`).then((response) => {
      console.log(response);
      loadNotes();
    });
  };
  return (
    <div className="note-content">
      <div className="bg-gray-300 min-h-screen">
        <div className="w-1/3 mx-auto relative  pt-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 absolute top-6 left-2 dark:text-gray-400"
          >
            Title
          </label>
          <textarea
            id="message"
            rows="4"
            maxLength={100}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block px-2.5 pt-7 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
          ></textarea>
          <div className="absolute -bottom-3 right-4">
            <button
              onClick={handleAdd}
              className="py-1 hover:bg-yellow-400 active:bg-yellow-600 px-3 rounded-full bg-yellow-300"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-[94%] mx-auto mt-10 overflow-auto flex gap-4 flex-wrap">
          {note?.map((el, index) => (
            <div
              key={index}
              className="relative w-[23%] h-40 rounded-lg bg-white"
            >
              <div className="p-4 w-full h-full overflow-hidden">
                <span
                  style={{ wordWrap: "break-word" }}
                  className="whitespace-normal "
                >
                  {el.Content}
                </span>
              </div>
              <div className="absolute text-xl cursor-pointer bottom-2 right-2">
                <i
                  onClick={handleDelete(el.Note_id)}
                  className="fa-solid fa-trash-can hover:text-red-500"
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NoteContent;
